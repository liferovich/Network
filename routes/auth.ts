import { Router } from 'express';
import { default as authController } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.get('/activate/:link', authController.activate);
authRouter.get('/refresh', authController.refresh);
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
