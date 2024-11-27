import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  updatePassword,
  updateUserProfile,
  updateUserInfo,
  updateUserRole,
  resetPassword,
  forgetPassword,
} from "../controllers/user.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout",isAutheticated, logoutUser);

userRouter.get("/me", isAutheticated, getUserInfo);


userRouter.put("/update-user-info",isAutheticated, updateUserInfo);

userRouter.put("/update-user-password", isAutheticated, updatePassword);

userRouter.put("/update-user-avatar", isAutheticated, updateUserProfile);
// Request Password Reset
userRouter.post("/forgot-password", forgetPassword);
// Reset Password
userRouter.put("/reset-password", resetPassword);

userRouter.get(
  "/get-users",
  // isAutheticated,
  // authorizeRoles("admin"),
  getAllUsers
);

userRouter.put(
  "/update-user",
  // isAutheticated,
  // authorizeRoles("admin"),
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
