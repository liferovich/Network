import { Router } from 'express';
import { default as authController } from '../controllers/auth.controller';
import { body } from 'express-validator';

export const authRouter = Router();

authRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  authController.register
);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/activate/:link', authController.activate);
authRouter.get('/refresh', authController.refresh);
