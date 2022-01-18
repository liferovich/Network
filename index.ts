import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes/index';
import { initDatabase } from './database/initDatabase';
import { errorMiddleware } from './middlewares/error.middleware';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use('/api', router);
app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server started on PORT = ${PORT}`);
  await initDatabase();
});
