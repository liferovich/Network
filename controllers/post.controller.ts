import express from 'express';
import postService from '../services/post.service';

class PostController {
  async getPosts(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { posts, usersIds } = await postService.getPosts();
      const profiles = await postService.getProfiles(
        JSON.parse(JSON.stringify(usersIds))
      );

      return res.json({ posts, profiles });
    } catch (e) {
      next(e);
    }
  }

  async addPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.body.userId;
      const text = req.body.text;
      await postService.addPost(id, text);
      const { posts, usersIds } = await postService.getPosts();
      const profiles = await postService.getProfiles(
        JSON.parse(JSON.stringify(usersIds))
      );

      return res.json({ posts, profiles });
    } catch (e) {
      next(e);
    }
  }

  async editPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.body.id;
      const text = req.body.text;
      await postService.editPost(id, text);
      const { posts, usersIds } = await postService.getPosts();
      const profiles = await postService.getProfiles(
        JSON.parse(JSON.stringify(usersIds))
      );

      return res.json({ posts, profiles });
    } catch (e) {
      next(e);
    }
  }

  async deletePost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      await postService.deletePost(Number(id));
      const { posts, usersIds } = await postService.getPosts();
      const profiles = await postService.getProfiles(
        JSON.parse(JSON.stringify(usersIds))
      );

      return res.json({ posts, profiles });
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();
