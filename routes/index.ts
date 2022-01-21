import { Router } from 'express';
import { authRouter } from './auth';
import { friendRouter } from './friend';
import { profileRouter } from './profile';

export const router = Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);

router.use('/friends', friendRouter);
