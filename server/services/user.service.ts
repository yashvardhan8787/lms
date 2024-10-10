import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/user.model";

// get user by id
// Helper function to get user by ID
export const getUserById = async (userId: string, res: Response) => {
  const user = await userModel.findById(userId).select("-password"); // Exclude password

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      isVerified: user.isVerified,
      courses: user.courses,
      completedCourses: user.completedCourses, // Assuming you have this in the model
      badges: user.badges,
      streaks: user.streaks,
      title: user.title,
      about: user.about,
    },
  });
};


// Get All users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// update user role
export const updateUserRoleService = async (res:Response,id: string,role:string) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
}