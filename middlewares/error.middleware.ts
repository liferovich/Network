import express from 'express';
import { ApiError } from '../exceptions/api.error';

export function errorMiddleware(
  err: express.ErrorRequestHandler,
  req: express.Request,
  res: express.Response
) {
  console.log(err);

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Server error' });
}
