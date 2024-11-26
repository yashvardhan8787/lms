import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createOrder,
  getAllOrders,
  Payment,
  sendStripePublishableKey,
} from "../controllers/order.controller" ;
const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated,  createOrder);

orderRouter.get(
  "/get-orders",
  getAllOrders
);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/make-payment", Payment);
export default orderRouter;
