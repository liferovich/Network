import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import socket from '../../socket';
import { Chat } from './Chat';

const MessagesPage: FC = () => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [auth, setAuth] = useState(false);

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const signIn = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId || !userName) return console.log('Error');

    axios.post('http://localhost:5000/rooms', { roomId, userName }).then((res) => {
      setAuth(true);
    });

    socket.emit('ROOM:JOIN', { roomId, userName });
    const { data } = await axios.get(`/rooms/${roomId}`);
    setUsers(data.users);
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', (users: string[])=>{
      setUsers(users);
    })
  }, [])  

  return (
    <div>
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
      ): (<Chat users={users} messages={messages}/>)}
    </div>
  );
};

export default MessagesPage;
