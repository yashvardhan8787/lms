require("dotenv").config();
import mongoose, { Document, Model, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"; // For password reset token generation

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>; // Courses the user is enrolled in
  completedCourses: Array<{ courseId: string; completionDate: Date }>; // Completed courses
  badges: Types.ObjectId[];  // Badges earned by the user
  streaks: number; // Count of streaks (consecutive course completion days)
  title: string; // Title based on user achievements or self-setup
  about: string; // A self-written description about the user
  resetPasswordToken?: string; // Password reset token (optional)
  resetPasswordExpire?: Date; // Password reset token expiration (optional)
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
  getResetPasswordToken: () => string; // Method to generate reset token
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String, // Courses the user is currently enrolled in
      },
    ],
    completedCourses: [
      {
        courseId: String, // ID of the completed course
        completionDate: {
          type: Date,
          default: Date.now, // Store the date of completion
        },
      },
    ],
    badges: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Badge", // Reference to badges
      default: [],
    },
    streaks: {
      type: Number, // Number of consecutive days user completed courses
      default: 0,
    },
    title: {
      type: String, // User's custom or achievement-based title
      default: "Newbie",
    },
    about: {
      type: String, // A brief description about the user
      default: "Hey there! I am a lifelong learner.",
    },
    resetPasswordToken: String, // Token for password reset
    resetPasswordExpire: Date, // Expiration for reset token
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Sign access token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// Sign refresh token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set resetPasswordToken field
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Set expire time for reset token (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
