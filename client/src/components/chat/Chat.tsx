import React, { useEffect, useRef, useState } from 'react';
import socket from '../../socket';
import './Chat.css';

type MessageType = {
  userName: string;
  text: string;
};
type UserType = {
  id: string;
  userName: string;
};

const Chat = ({
  users,
  messages,
  userName,
  roomId,
  onAddMessage,
}: {
  users: UserType[];
  messages: MessageType[];
  userName: string;
  roomId: string;
  onAddMessage: Function;
}) => {
  const [messageValue, setMessageValue] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);

  const onSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageValue) {
      socket.emit('ROOM:NEW_MESSAGE', {
        roomId,
        userName,
        text: messageValue,
      });
      onAddMessage({
        userName,
        text: messageValue,
      });
      setMessageValue('');
    }
  };

  useEffect(() => {
    if (null !== messagesRef.current) messagesRef.current.scrollTo(0, 999999);
  }, [messages]);

  return (
    <div className='chat row'>
      <div className='chat-users col s12 m3'>
        <b>Online ({users.length})</b>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.userName}</li>
          ))}
        </ul>
      </div>
      <div className='chat-messages col s12 m9'>
        <div className='messages' ref={messagesRef}>
          {messages?.map((message: { userName: string; text: string }, key) => (
            <div
              className={`message ${
                userName === message.userName && 'message-right'
              }`}
              key={key}
            >
              <p className={`card-panel ${userName === message.userName ? 'teal lighten-2': 'grey lighten-2'}`}>{message.text}</p>
              <div>
                <span className='message-author'>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <br />
        <hr />
        <form onSubmit={onSendMessage}>
          <textarea
            id='textarea1'
            className='materialize-textarea form-control'
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          ></textarea>
          <button className='btn btn-primary teal lighten-2' onClick={onSendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
