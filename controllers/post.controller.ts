import express from 'express';
import postService from '../services/post.service';

class PostController {
  async getPosts(req: express.Request, res: express.Response) {
    try {
      const { posts, usersIds } = await postService.getPosts();
      const profiles = await postService.getProfiles(
        JSON.parse(JSON.stringify(usersIds))
      );

      return res.json({ posts, profiles });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async addPost(req: express.Request, res: express.Response) {
    try {
      const id = req.body.userId;
      const text = req.body.text;
      await postService.addPost(id, text);
      const { posts, usersIds } = await postService.getPosts();
      const profiles = await postService.getProfiles(
        JSON.parse(JSON.stringify(usersIds))
      );

      return res.json({ posts, profiles });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async editPost(req: express.Request, res: express.Response) {
    try {
      const id = req.body.id;
      const text = req.body.text;
      await postService.editPost(id, text);
      const { posts, usersIds } = await postService.getPosts();
      const profiles = await postService.getProfiles(
        JSON.parse(JSON.stringify(usersIds))
      );

      return res.json({ posts, profiles });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async addLike(req: express.Request, res: express.Response) {
    try {
      const userId = req.body.userId;
      const id = req.body.id;
      const oldLikes = await postService.getLikes(Number(id));
      const likesArr = JSON.parse(JSON.stringify(oldLikes)).likes;
      const index = likesArr.indexOf(userId);

      if (index > -1) {
        likesArr.splice(index, 1);
      } else {
        likesArr.push(userId);
      }

      await postService.addLike(likesArr, Number(id));

      const { posts, usersIds } = await postService.getPosts();

      const profiles = await postService.getProfiles(
        JSON.parse(JSON.stringify(usersIds))
      );

      return res.json({ posts, profiles });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async addComment(req: express.Request, res: express.Response) {
    try {
      const comment = req.body.comment;
      const id = req.body.id;
      await postService.addComment(comment, Number(id));

      const { posts, usersIds } = await postService.getPosts();

      const profiles = await postService.getProfiles(
        JSON.parse(JSON.stringify(usersIds))
      );

      return res.json({ posts, profiles });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async deletePost(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      await postService.deletePost(Number(id));
      const { posts, usersIds } = await postService.getPosts();
      const profiles = await postService.getProfiles(
        JSON.parse(JSON.stringify(usersIds))
      );

      return res.json({ posts, profiles });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }
}

export default new PostController();
