import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/order.Model";
import userModel from "../models/user.model";
import { Course } from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.Model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create Order using Stripe Session
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, sessionId } = req.body as { courseId: string; sessionId: string };

      // Validate the Stripe session ID
      if (!sessionId) {
        return next(new ErrorHandler("Stripe session ID is required", 400));
      }

      // Check if the session ID is already used in an order
      const existingOrder = await OrderModel.findOne({ "payment_info.id": sessionId });

      if (existingOrder) {
        return res.status(400).json({
          success: false,
          message: "This payment session has already been used. Default or duplicate payment detected.",
        });
      }

      // Retrieve Stripe session
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      // Ensure the payment is completed
      if (session.payment_status !== "paid") {
        return next(new ErrorHandler("Payment not authorized!", 400));
      }

      const user = await userModel.findById(req.user?._id);

      // Check if the user already purchased the course
      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      // Fetch course details
      const course = await Course.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      // Prepare order data
      const orderData = {
        courseId: course._id,
        userId: user?._id,
        payment_info: {
          id: session.id,
          amount_total: session.amount_total,
          currency: session.currency,
        },
      };

      // Prepare email data for order confirmation
      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      // Send order confirmation email
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      // Add course to user's purchased courses
      user?.courses.push(course._id);
      await user?.save();

      // Cache updated user data in Redis
      await redis.set(req.user?._id, JSON.stringify(user));

      // Create a notification for the user
      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order for the course: ${course.name}`,
      });

      // Increment purchased count for the course
      course.purchased = course.purchased + 1;
      await course.save();

      // Create the new order
      await OrderModel.create(orderData);

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        customer_details:{
          email:user?.email
        },
        id:session.id,
        amount_total:course.price
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);





// Get all orders for admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Send Stripe publishable key
export const sendStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).json({
      publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);


export const Payment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courses } = req.body; // courses array should contain course details like name, price, etc.
    // Create line items from the courses array
    const lineItems = courses.map((course: any) => ({
      price_data: {
        currency: "usd", // Currency (you can change it to your required currency)
        product_data: {
          name: course.name, // Course name
          images: [course.imgUrl], // Course image URL
        },
        unit_amount:course.price, // Convert price to cents (Stripe expects cents)
      },
      quantity: 1, // Assuming one course per transaction, but you can update based on your use case
    }));

    try {
      // Create the Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:`http://localhost:5173/${courses[0].id}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:"http://localhost:5173/cancel",
      });

      // Send the session ID to the frontend
      res.json({ id: session.id });
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      next(error); // Call next middleware for error handling
    }
  }
);
