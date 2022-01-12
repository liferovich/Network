import { Router } from 'express';
import { authRouter } from './auth';

export const router = Router();

router.use('/auth', authRouter);

router.get('/users', (req, res) => {
  res.send('Стартовая страница');
});
