import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chats, getChats, getMessages, messages, addMessage } from '../../features/ChatSlice';
import { id } from '../../features/AuthSlice';
import { ChatResponse, MessageResponse } from '../../models/response/ChatResponse';
import Chat from './Chat';
import Message from './Message';
// import socket from '../../socket';
import {io, Socket} from 'socket.io-client';
import './Messanger.css';

type ArrivalType = {
  senderId:string, 
  text: string
}

const Messanger = () => {
  const dispatch = useDispatch();
    const userChats = useSelector(chats);
    const currentMessages = useSelector(messages);
    const userId = useSelector(id);
    const [currentChat, setCurrentChat] = useState<ChatResponse>({});
    const [messageValue, setMessageValue] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState<ArrivalType>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const socket = useRef();

  const selectChat = (chat: ChatResponse) => {
    if (currentChat !== chat) {
      setCurrentChat(chat);
      dispatch(getMessages(chat.id))
    } 
    setMessageValue('');  
  }

  const onSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const receiverId = currentChat.members.find((member: number) => member !== userId);
    socket.current.emit('sendMessage', { senderId: userId, receiverId, text: messageValue })
    dispatch(addMessage({text: messageValue, sender: userId, ChatId: Number(currentChat.id)}))
  }

  useEffect(()=>{
    socket.current = io('http://localhost:5000');
    socket.current.on('getMessage', (data: ArrivalType)=> {
      setArrivalMessage(data);
    })
  },[])

  useEffect(()=>{
    socket.current.emit('addUser', userId);
    socket.current.on('getUsers', (users: [{ userId: string, socketId: string }]) => {
      console.log(users)
    })
  },[userId])

  useEffect(()=>{
      dispatch(getChats(userId));
  },[])

  useEffect(() => {
    messagesRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [currentMessages]);

  // useEffect(() => {
  //   arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) && setMessageValue()
  // }, [arrivalMessage]);

  return (
    <div className='chat row'>
      <div className='chat-users col s12 m3'>
        <b>Online ({users.length})</b>
        <ul>
          {userChats.map((chat) => (
            // <Chat chat={chat} key={chat.id}/>
            <li onClick={()=>selectChat(chat)}>{chat.members.find((member) => member !== userId)}</li>
          ))}
        </ul>
      </div>
      <div className='chat-messages col s12 m9'>
        {currentChat && (<><div className='messages' ref={messagesRef}>
          {currentMessages?.map((message: MessageResponse) => (
            <Message message={message}/>
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
        </form></>)}
        
      </div>
    </div>
  );
};

export default Messanger;
