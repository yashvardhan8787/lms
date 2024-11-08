import { Request, Response } from 'express';
import Badge from '../models/badge.model';
import {Course} from '../models/course.model';

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
