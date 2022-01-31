import express from 'express';

export function mediaMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.files === null) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  next();
}
