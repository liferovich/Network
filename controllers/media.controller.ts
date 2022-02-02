import express from 'express';
import mediaService from '../services/media.service';

class MediaController {
  async getChats(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const chats = await mediaService.getChats(Number(id));

      return res.json({ chats });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }

  async addMedia(req: express.Request, res: express.Response) {
    try {
      const files = req.files;
      if (files) {
        await mediaService.addPhoto(
          JSON.parse(JSON.stringify(files)).avatar[0].filename,
          JSON.parse(JSON.stringify(files)).avatar[0].path
        );
      }

      return res.json({ files });
    } catch (err: any) {
      if (err.status) {
        res.status(err.status).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'Server error..' } });
      }
    }
  }
}

export default new MediaController();
