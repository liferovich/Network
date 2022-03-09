import express from 'express';
import mediaService from '../services/media.service';

class MediaController {
  getPhoto(req: express.Request, res: express.Response) {
    const name = req.params.name;

    return res.sendFile(`D:/work/Network/public/uploads/${name}`);
  }

  async getMedia(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const photos = await mediaService.getMedia(id);

      return res.json({ photos });
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
      const id = req.params.id;
      let photo: any;
      if (files) {
        photo = await mediaService.addPhoto(
          JSON.parse(JSON.stringify(files)).avatar[0].filename,
          JSON.parse(JSON.stringify(files)).avatar[0].path,
          id
        );
      }

      return res.json({ photo });
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
