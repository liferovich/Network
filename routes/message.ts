import { Router } from 'express';
import { default as messageController } from '../controllers/message.controller';
// import { authMiddleware } from '../middlewares/auth.middleware';

export const messageRouter = Router();

messageRouter.get('/:id', messageController.getMessages);
messageRouter.post('/', messageController.addMessage);
