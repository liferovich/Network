import { Router } from 'express';
import { default as postController } from '../controllers/post.controller';
// import { authMiddleware } from '../middlewares/auth.middleware';

export const postRouter = Router();

postRouter.get('/', postController.getPosts);
postRouter.post('/', postController.addPost);
postRouter.put('/', postController.editPost);
postRouter.delete('/:id', postController.deletePost);
// profileRouter.get('/:id', authMiddleware, profileController.getProfile);
// profileRouter.get('/edit', authMiddleware, profileController.editProfile);
