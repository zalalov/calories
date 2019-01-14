import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import mealRoutes from './meal.route';
import {isAuthenticated, isOwner} from '../middlewares/authenticate';

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

// mount meal routes at /users
router.use('/users/:userId/meals', [isAuthenticated, isOwner], mealRoutes);

export default router;