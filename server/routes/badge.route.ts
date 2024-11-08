import express from 'express';
import { addBadgeToCourse } from '../controllers/badges.controller';

const BadgeRouter = express.Router();

// POST route for adding a badge to a course
BadgeRouter.post('/add-badge-to-course', addBadgeToCourse);

export default BadgeRouter;
