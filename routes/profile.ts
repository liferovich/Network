import { Router } from 'express';
import { default as profileController } from '../controllers/profile.controller';
// import { authMiddleware } from '../middlewares/auth.middleware';

export const profileRouter = Router();

profileRouter.get('/:id', profileController.getProfile);
// profileRouter.get('/', authMiddleware, profileController.getProfile);
// profileRouter.get('/edit', authMiddleware, profileController.editProfile);
