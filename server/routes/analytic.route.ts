import express from "express";
import {
  getUsersAnalytics,
  getCoursesAnalytics,
  getOrderAnalytics,
} from "../controllers/analytic.controller";

const Arouter = express.Router();

// Admin-only routes (ensure to add authentication middleware if needed)
Arouter.get("/usersAnalytics", getUsersAnalytics);
Arouter.get("/coursesAnalytics", getCoursesAnalytics);
Arouter.get("/ordersAnalytics", getOrderAnalytics);

export default Arouter;
