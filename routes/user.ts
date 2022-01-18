import { Router } from 'express';
import { default as userController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const userRouter = Router();

userRouter.get('/', authMiddleware, userController.getUsers);
