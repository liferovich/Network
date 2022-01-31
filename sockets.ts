import { Server, Socket } from 'socket.io';

type UsersType = {
  userId: string;
  socketId: string;
};

const initSockets = () => {
  const io = new Server(5100, { cors: { origin: 'http://localhost:3000' } });

  let users: UsersType[] = [];

  const addUser = (userId: string, socketId: string) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId: string) => {
    users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId: string) => {
    return users.find((user) => user.userId === userId);
  };

  io.on('connection', (socket: Socket) => {
    console.log('User connected');

    socket.on('addUser', (userId: string) => {
      addUser(userId, socket.id);
      io.emit('getUsers', users);
    });

    socket.on(
      'sendMessage',
      ({
        senderId,
        receiverId,
        text,
      }: {
        senderId: string;
        receiverId: string;
        text: string;
      }) => {
        const user = getUser(receiverId);
        if (user)
          io.to(user.socketId).emit('getMessage', {
            senderId,
            text,
            createdAt: new Date(),
          });
      }
    );

    socket.on('disconnect', () => {
      console.log('User disconnected');
      removeUser(socket.id);
      io.emit('getUsers', users);
    });
  });

  // io.on('connection', (socket) => {
  //   socket.on('ROOM:JOIN', ({ roomId, userName }) => {
  //     socket.join(roomId);
  //     rooms.get(roomId).get('users').push({ id: socket.id, userName });
  //     const users = rooms.get(roomId).get('users');
  //     socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users);
  //   });

  //   socket.on('disconnected', () => {
  //     rooms.forEach((value, roomId) => {
  //       const index = value.get('users').indexOf(socket.id);
  //       if (index > -1) {
  //         value.get('users').slice(index, 1);
  //         const users = rooms.get(roomId).get('users');
  //         socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users);
  //       }
  //     });
  //   });

  //   console.log('User connected ', socket.id);
  // });

  // server.listen(5000, async () => {
  //   console.log(`Server started on PORT = ${PORT}`);
  //   await initDatabase();
  // });
};

export default initSockets;
