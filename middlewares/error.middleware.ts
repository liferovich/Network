import express from 'express';

export function errorMiddleware(
  err: express.ErrorRequestHandler,
  req: express.Request,
  res: express.Response
) {
  // console.log({ error: err });

  return res.status(500).json({ error: err });
}
