import { Router } from 'express';
import { default as chatController } from '../controllers/chat.controller';

export const chatRouter = Router();

chatRouter.get('/:id', chatController.getChats);
chatRouter.post('/', chatController.addChat);
