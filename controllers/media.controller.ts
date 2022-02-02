import express from 'express';
import mediaService from '../services/media.service';

class MediaController {
  async getChats(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const chats = await mediaService.getChats(Number(id));

      return res.json({ chats });
    } catch (e) {
      next(e);
    }
  }

  async addMedia(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const files = req.files;
      if (files) {
        await mediaService.addPhoto(
          JSON.parse(JSON.stringify(files)).avatar[0].filename,
          JSON.parse(JSON.stringify(files)).avatar[0].path
        );
        // console.log(JSON.parse(JSON.stringify(files)).avatar[0].path);
      }

      return res.json({ files });
    } catch (e) {
      next(e);
    }
  }
}

export default new MediaController();
