import express from 'express';
import {
  getUserProgress,
  updateLectureProgress,
  awardBadgeForCourseCompletion,
  resetUserProgress
} from '../controllers/userProgress.contoller';

const progressRouter = express.Router();

progressRouter.get('/getprogress/:userId/:courseId', getUserProgress);
progressRouter.post('/update-progress', updateLectureProgress);
progressRouter.post('/award-badge', awardBadgeForCourseCompletion);
progressRouter.post('/reset/:userId/:courseId', resetUserProgress);

export default progressRouter;
