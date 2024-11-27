import express from "express";
import {
    getNotifications,
    updateNotification,
} from "../controllers/notification.controller";

const nrouter = express.Router();

nrouter.get("/getNotification", getNotifications); // Fetch all notifications
nrouter.put("/updateNotification/:id", updateNotification); // Update notification status


export default nrouter;
