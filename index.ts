import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes/index';
import { initDatabase } from './database/initDatabase';
// import { errorMiddleware } from './middlewares/error.middleware';
import dotenv from 'dotenv';
dotenv.config();
import { Server } from 'socket.io';
import http from 'http';

const PORT = process.env.PORT || 5000;

const app = express();

const rooms = new Map();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });

app.use(express.json());
app.use(express.)
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use('/api', router);
// app.use(errorMiddleware);

app.get('/rooms/:id', (req, res) => {
  const roomId = req.params.id;
  const obj = {
    users: [...rooms.get(roomId).get('users').values()],
    messages: [...rooms.get(roomId).get('messages').values()]
  }

  res.json(obj);
});
app.post('/rooms', (req, res) => {
  const { roomId } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', []],
        ['messages', []],
      ])
    );
  }
  res.json([...rooms.values()]);
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').push({ id: socket.id, userName });
    const users = rooms.get(roomId).get('users').map(item => item.userName) //userlist
    socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
  });

  socket.on('disconnected', () => {
    rooms.forEach((value, roomId)=>{
      const index = value.get('users').indexOf(socket.id);
      if (index > -1) {
        value.get('users').slice(index, 1);
        const users = rooms.get(roomId).get('users').map(item => item.userName) //userlist
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
      }
    });
  })

  console.log('User connected ', socket.id);
});

server.listen(5000, async () => {
  console.log(`Server started on PORT = ${PORT}`);
  await initDatabase();
});
