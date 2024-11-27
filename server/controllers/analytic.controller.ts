import { Request, Response } from "express";
import { generateLast12MothsData } from "../utils/analytics.generator";
import OrderModel from "../models/order.Model";
import { Course } from "../models/course.model";
import userModel from "../models/user.model";

// Helper function for fetching analytics
const fetchAnalytics = async (model: any, res: Response, entityName: string) => {
  try {
    const data = await generateLast12MothsData(model);
    res.status(200).json({
      success: true,
      [entityName]: data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Failed to fetch ${entityName} analytics`,
      error: error.message,
    });
  }
};

// Get Users Analytics
export const getUsersAnalytics = (req: Request, res: Response) =>
  fetchAnalytics(userModel, res, "users");

// Get Courses Analytics
export const getCoursesAnalytics = (req: Request, res: Response) =>
  fetchAnalytics(Course, res, "courses");

// Get Orders Analytics
export const getOrderAnalytics = (req: Request, res: Response) =>
  fetchAnalytics(OrderModel, res, "orders");
