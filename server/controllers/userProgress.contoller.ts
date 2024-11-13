import { Request, Response } from 'express';
import { UserProgress} from '../models/course.model';
import { Lecture } from '../models/course.model';
import  Badge  from '../models/badge.model';
import { Course } from '../models/course.model';
import mongoose from 'mongoose';
import User from '../models/user.model';  // Import user model

export const getUserProgress = async (req: Request, res: Response) => {
    const { userId, courseId } = req.params;
  
    try {
      const userProgress = await UserProgress.findOne({ userId, courseId })
      .exec();
  
      if (!userProgress) {
        return res.status(404).json({ message: 'Progress data not found.' });
      }
  
      res.status(200).json(userProgress);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
 

  export const updateLectureProgress = async (req: Request, res: Response) => {
    const { userId, courseId, lectureId } = req.body;
    const { isCompleted, progressPercentage, quizStatus } = req.body;
  
    try {
      // Fetch or create user progress
      let userProgress = await UserProgress.findOne({ userId, courseId });
      if (!userProgress) {
        userProgress = new UserProgress({
          userId,
          courseId,
          lectureProgress: [],
          totalCompletedLectures: 0,
          totalQuizzesPassed: 0,
          streakUpdated: false,
          earnedBadges: []
        });
      }
  
      // Update lecture progress
      const lectureIndex = userProgress.lectureProgress.findIndex(
        (lp) => lp.lectureId.toString() === lectureId
      );
  
      if (lectureIndex >= 0) {
        userProgress.lectureProgress[lectureIndex] = {
          ...userProgress.lectureProgress[lectureIndex],
          isCompleted,
          progressPercentage,
          quizStatus
        };
      } else {
        userProgress.lectureProgress.push({
          lectureId,
          isCompleted,
          progressPercentage,
          quizStatus
        });
      }
  
      // Update streaks if lecture is completed
      if (isCompleted) {
        userProgress.totalCompletedLectures += 1;
  
        const user = await User.findById(userId);
        if (user) {
          user.streaks += 10;
          await user.save();
        }
      }
  
      if (quizStatus?.isPassed) userProgress.totalQuizzesPassed += 1;
  
      await userProgress.save();
  
      // Check if all course lectures are completed
      const course = await Course.findById(courseId).populate('lectures');
      if (course) {
        const completedLectureIds = userProgress.lectureProgress
          .filter(lp => lp.isCompleted)
          .map(lp => lp.lectureId.toString());
  
        const allLecturesCompleted = course.lectures.every(lecture =>
          completedLectureIds.includes(lecture._id.toString())
        );
  
        // Award course badges to user if all lectures are completed
        if (allLecturesCompleted) {
          const user = await User.findById(userId);
          if (user) {
            course.badges.forEach(badgeId => {
              if (!user.badges.includes(badgeId)) {
                user.badges.push(badgeId);
              }
            });
            await user.save();
          }
        }
      }
  
      res.status(200).json({ message: 'Lecture progress updated.', userProgress });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  
  
  export const awardBadgeForCourseCompletion = async (req: Request, res: Response) => {
    const { userId, courseId } = req.body;
  
    try {
      const userProgress = await UserProgress.findOne({ userId, courseId });
  
      if (!userProgress || userProgress.totalCompletedLectures === 0) {
        return res.status(400).json({ message: 'User has not completed the course.' });
      }
  
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      const badge = await Badge.findOne({ courseId });
      if (badge && !userProgress.earnedBadges.includes(badge._id.toString())) {
        userProgress.earnedBadges.push(badge._id.toString());
        await userProgress.save();
  
        return res.status(200).json({ message: 'Badge awarded successfully', badge });
      }
  
      res.status(200).json({ message: 'Badge already awarded or not available.' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

  export const resetUserProgress = async (req: Request, res: Response) => {
    const { userId, courseId } = req.params;
  
    try {
      const userProgress = await UserProgress.findOne({ userId, courseId });
  
      if (!userProgress) {
        return res.status(404).json({ message: 'User progress not found' });
      }
  
      userProgress.lectureProgress = [];
      userProgress.totalCompletedLectures = 0;
      userProgress.totalQuizzesPassed = 0;
      userProgress.streakUpdated = false;
      userProgress.earnedBadges = [];
  
      await userProgress.save();
      res.status(200).json({ message: 'User progress reset successfully', userProgress });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  
  