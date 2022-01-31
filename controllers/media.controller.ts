import express from 'express';
import mediaService from '../services/media.service';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/public/uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields

class ChatController {
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
      const file = req.files.file;
      file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err: any) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
      });

      return res.json({
        fileName: file.name,
        filePath: `/uploads/${file.name}`,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new ChatController();
