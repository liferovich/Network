import axios from 'axios';
import { FC, useState, useEffect, useCallback } from 'react';
import socket from '../../socket';
import Chat from './Chat';

type MessageType = {
  userName: string;
  text: string;
};
type UserType = {
  id: string;
  userName: string;
};

const MessagesPage: FC = () => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [auth, setAuth] = useState(false);

  const [users, setUsers] = useState<Array<UserType>>([]);
  const [messages, setMessages] = useState<Array<MessageType>>([]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId || !userName) return console.log('Error');

    axios.post('http://localhost:5000/rooms', { roomId, userName }).then(() => {
      setAuth(true);
    });

    socket.emit('ROOM:JOIN', { roomId, userName });
    const { data } = await axios.get(`/rooms/${roomId}`);
    setUsers(data.users);
  };

  const addMessage = useCallback(
    (newMessage: MessageType) => {
      setMessages([...messages, newMessage]);
    },
    [messages]
  );

  useEffect(() => {
    socket.on('ROOM:SET_USERS', (currentUsers: Array<UserType>) => {
      setUsers([...currentUsers]);
    });
  }, []);

  useEffect(() => {
    socket.on(
      'ROOM:ADD_MESSAGE',
      (newMessage: { userName: string; text: string }) => {
        addMessage(newMessage);
      }
    );
  }, [messages, addMessage]);

  return (
    <div className='MessagePage'>
      {!auth ? (
        <form onSubmit={signIn}>
          <input
            type='text'
            placeholder='Room Id'
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type='text'
            placeholder='Name'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className='btn' onClick={signIn}>
            Sign In
          </button>
        </form>
      ) : (
        <Chat
          users={users}
          messages={messages}
          userName={userName}
          roomId={roomId}
          onAddMessage={addMessage}
        />
      )}
    </div>
  );
};

export default MessagesPage;
