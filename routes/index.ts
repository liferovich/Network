import { Router } from 'express';
import { authRouter } from './auth';
import { friendRouter } from './friend';
import { profileRouter } from './profile';
import { userRouter } from './user';
import { postRouter } from './post';
import { chatRouter } from './chat';
import { messageRouter } from './message';

export const router = Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/users', userRouter);
router.use('/friends', friendRouter);
router.use('/posts', postRouter);
router.use('/chats', chatRouter);
router.use('/messages', messageRouter);
