import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createOrder,
  getAllOrders,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/order.controller" ;
const orderRouter = express.Router();

orderRouter.post("/create-order",  createOrder);

orderRouter.get(
  "/get-orders",
  getAllOrders
);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", newPayment);

export default orderRouter;
