import { Router } from 'express';
import { default as postController } from '../controllers/post.controller';
// import { authMiddleware } from '../middlewares/auth.middleware';

export const postRouter = Router();

postRouter.get('/', postController.getPosts);
postRouter.post('/', postController.addPost);
postRouter.put('/', postController.editPost);
postRouter.put('/likes', postController.addLike);
postRouter.put('/comment', postController.addComment);
postRouter.delete('/:id', postController.deletePost);
