import express from 'express';
import { addBadgeToCourse , getBadgeById , redeemRewards} from '../controllers/badges.controller';

const BadgeRouter = express.Router();

// POST route for adding a badge to a course
BadgeRouter.post('/add-badge-to-course', addBadgeToCourse);

BadgeRouter.get('/badge/:id', getBadgeById);

BadgeRouter.post('/redeem-rewards', redeemRewards);
export default BadgeRouter;
