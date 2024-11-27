import NotificationModel from "../models/notification.Model";
import { Request, Response, NextFunction } from "express";
import cron from "node-cron";

// 1. Get all notifications (Admin only)
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await NotificationModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

// 2. Update notification status (Admin only)
export const updateNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const notification = await NotificationModel.findById(id);
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    // Update status to "read" if it's currently "unread"
    notification.status = "read";
    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification updated successfully",
      notification,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update notification",
      error: error.message,
    });
  }
};

// 3. Delete old notifications (Cron Job)
cron.schedule("0 0 * * *", async () => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Delete notifications older than 30 days with status "read"
    const result = await NotificationModel.deleteMany({
      status: "read",
      createdAt: { $lt: thirtyDaysAgo },
    });

    console.log(
      `Deleted ${result.deletedCount} read notifications older than 30 days`
    );
  } catch (error: any) {
    console.error("Failed to delete old notifications", error.message);
  }
});
