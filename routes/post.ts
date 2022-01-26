import { Router } from 'express';
import { default as profileController } from '../controllers/profile.controller';
// import { authMiddleware } from '../middlewares/auth.middleware';

export const postRouter = Router();

postRouter.get('/:id', profileController.getProfile);
postRouter.post('/', profileController.getProfiles);
// profileRouter.post('/profile', profileController.editAvatar);
// profileRouter.get('/:id', authMiddleware, profileController.getProfile);
// profileRouter.get('/edit', authMiddleware, profileController.editProfile);
