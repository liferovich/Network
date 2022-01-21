import { Router } from 'express';
import { default as friendController } from '../controllers/friend.controller';
// import { authMiddleware } from '../middlewares/auth.middleware';

export const friendRouter = Router();

friendRouter.get('/:id', friendController.getFriends);
