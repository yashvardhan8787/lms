import { Request, Response } from 'express';
import Badge from '../models/badge.model';
import {Course} from '../models/course.model';
import User from '../models/user.model'; // Import the User model
import sendMail from '../utils/sendMail';
// Middleware function to check if the user is an admin
const isAdmin = (req: Request, res: Response, next: Function) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

// Create a new badge and associate it with a course
export const addBadgeToCourse = async (req: Request, res: Response) => {
  try {
    const { badgeImageUrl, title, description, name, courseId } = req.body;

    // Validate that the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create the badge
    const badge = new Badge({
      badgeImageUrl,
      title,
      description,
      name,
      courseName: course.name,
      courseId
    });
    await badge.save();

    // Add the badge reference to the course
    course.badges.push(badge._id);
    await course.save();

    res.status(201).json({ message: 'Badge added to course successfully', badge });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Get a badge by ID
export const getBadgeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const badge = await Badge.findById(id);

    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }

    res.status(200).json({ badge });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const redeemRewards = async (req: Request, res: Response) => {
  try {
    // Ensure req.user exists before accessing its properties
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
    const userId = req.user.id; // Assuming the user ID is available in the request after authentication
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has enough streaks to redeem rewards
    const requiredStreaks = 20;
    if (user.streaks < requiredStreaks) {
      return res.status(400).json({ message: 'Insufficient streak points to redeem rewards.' });
    }

    // Deduct streak points
    user.streaks -= requiredStreaks;
    await user.save();

    // await sendMail({
    //   email: user.email,
    //   subject: "Activate your account",
    //   template: "activation-mail.ejs",
    //   data,
    // });

    res.status(200).json({ message: 'Reward redeemed successfully and email sent to user.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
