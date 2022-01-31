import { Router } from 'express';
import { default as mediaController } from '../controllers/media.controller';
import { mediaMiddleware } from '../middlewares/media.middleware';

export const mediaRouter = Router();

mediaRouter.post('/', mediaMiddleware, mediaController.addMedia);
