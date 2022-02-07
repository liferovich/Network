import { Router } from 'express';
import { default as mediaController } from '../controllers/media.controller';
// import { mediaMiddleware } from '../middlewares/media.middleware';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/uploads`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const multipleUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 },
]);

export const mediaRouter = Router();

mediaRouter.post('/:id', multipleUpload, mediaController.addMedia);
mediaRouter.get('/:id', multipleUpload, mediaController.getMedia);
mediaRouter.get('/photo/:name', mediaController.getPhoto);
