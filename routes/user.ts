import { Router } from 'express';
import { default as userController } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/', userController.getUsers);
