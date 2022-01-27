import axios from 'axios';
import { FC, useState } from 'react';
import socket from '../socket';

const MessagesPage: FC = () => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [auth, setAuth] = useState(false);

  const signIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId || !userName) return console.log('Error');

    axios.post('http://localhost:5000/rooms', { roomId, userName }).then((res) => {
      setAuth(true);
    });
  };

  return (
    <div>
      {!auth && (
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
      )}
    </div>
  );
};

export default MessagesPage;
