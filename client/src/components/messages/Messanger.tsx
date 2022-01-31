import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  chats,
  getChats,
  getMessages,
  addChat,
  messages,
  addMessage,
  setMessage,
  profiles,
  users,
  getUsers,
} from '../../features/ChatSlice';
import { profile } from '../../features/ProfileSlice';
import { id } from '../../features/AuthSlice';
import {
  ChatResponse,
  MessageResponse,
} from '../../models/response/ChatResponse';
import { ProfileResponse } from '../../models/response/Profileresponse';
import Message from './Message';
import { io, Socket } from 'socket.io-client';
import './Messanger.css';

type ArrivalType = {
  senderId: string;
  text: string;
  createdAt: Date;
};

const Messanger = () => {
  const dispatch = useDispatch();
  const userChats = useSelector(chats);
  const chatProfiles = useSelector(profiles);
  const currentMessages = useSelector(messages);
  const newChatUsers = useSelector(users);
  const userId = useSelector(id);
  const [currentChat, setCurrentChat] = useState<ChatResponse>();
  const [messageValue, setMessageValue] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);
  const socket = useRef<Socket>();
  const userProfile = useSelector(profile);

  const selectChat = (chat: ChatResponse) => {
    if (currentChat !== chat) {
      setCurrentChat(chat);
      dispatch(getMessages(chat.id));
    }
    setMessageValue('');
  };

  const onSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const receiverId = currentChat?.members.find(
      (member: number) => member !== userId
    );
    socket.current?.emit('sendMessage', {
      senderId: userId,
      receiverId,
      text: messageValue,
    });
    dispatch(
      addMessage({
        text: messageValue,
        sender: userId,
        ChatId: Number(currentChat?.id),
      })
    );
    setMessageValue('');
  };

  const addNewChat = (receiverId: number) => {
    dispatch(addChat({ senderId: userId, receiverId }));
    dispatch(getChats(userId));
  };

  useEffect(() => {
    socket.current = io('http://localhost:5100');
  }, []);

  useEffect(() => {
    socket.current?.on('getMessage', (data: ArrivalType) => {
      dispatch(setMessage(data));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.current?.emit('addUser', userId);
    socket.current?.on(
      'getUsers',
      (users: [{ userId: string; socketId: string }]) => {
        console.log(users);
      }
    );
  }, [userId]);

  useEffect(() => {
    dispatch(getChats(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    messagesRef.current?.scrollTo(0, 999999);
  }, [currentMessages]);

  useEffect(() => {
    let members: number[] = [];
    userChats?.forEach((chat: ChatResponse) =>
      chat.members?.forEach((member: number) => {
        if (!members.includes(member) && member !== Number(userId)) {
          members.push(member);
        }
      })
    );
    dispatch(getUsers({ userId, friendsIds: members }));
  }, [dispatch, userChats, userId]);

  return (
    <div className='chat row'>
      <div className='chat-users col s12 m3'>
        <b>My Chats ({userChats.length})</b>
        <div className='chats mb-1'>
          {userChats?.map((chat: ChatResponse) => (
            <div
              className={`chatUser ${
                chat.id === currentChat?.id ? 'active' : ''
              }`}
              onClick={() => selectChat(chat)}
              key={chat.id}
            >
              {
                chatProfiles?.find(
                  (profile: ProfileResponse) =>
                    profile.UserId ===
                    chat.members?.find((member: number) => member !== userId)
                )?.firstname
              }{' '}
              {
                chatProfiles.find(
                  (profile: ProfileResponse) =>
                    profile.UserId ===
                    chat.members?.find((member: number) => member !== userId)
                )?.lastname
              }
            </div>
          ))}
        </div>
        <b>Others ({newChatUsers.length})</b>
        <div className='chats'>
          {newChatUsers?.map((profile: ProfileResponse) => (
            <div
              className='chatUser'
              onClick={() => addNewChat(profile.UserId)}
              key={profile.id}
            >
              {profile.firstname} {profile.lastname}
            </div>
          ))}
        </div>
      </div>
      <div className='chat-messages col s12 m9'>
        {currentChat ? (
          <>
            <div className='messages' ref={messagesRef}>
              {currentMessages.length ? (
                currentMessages.map((message: MessageResponse) => (
                  <Message message={message} key={message.id} />
                ))
              ) : (
                <p className='no-messages'>No messages</p>
              )}
            </div>
            <br />
            <hr />
            <div className='chatForm'>
              <div className='row'>
                <div className='col s12 m2'>
                  <div className='chatImg'>
                    <div className='post-user'>
                      <div className='user-status'>
                        <img src='img/vacations.png' alt='status' />
                      </div>
                      <img
                        className='user-img'
                        src={
                          userProfile.avatar
                            ? userProfile.avatar
                            : 'img/no_user.png'
                        }
                        id='user-image'
                        alt='user'
                      />
                    </div>
                  </div>
                </div>
                <div className='col s12 m10'>
                  <form onSubmit={onSendMessage}>
                    <textarea
                      id='textarea1'
                      className='materialize-textarea form-control'
                      value={messageValue}
                      onChange={(e) => setMessageValue(e.target.value)}
                    ></textarea>
                    <button
                      className='btn btn-primary teal lighten-2 btn-sendmess'
                      onClick={onSendMessage}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1 className='choose'>Choose a chat</h1>
        )}
      </div>
    </div>
  );
};

export default Messanger;
