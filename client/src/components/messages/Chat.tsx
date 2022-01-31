// import { useEffect } from 'react';
import { ChatResponse } from '../../models/response/ChatResponse';
import { useSelector } from 'react-redux';
import { id } from '../../features/AuthSlice';

const Chat = ({ chat }: { chat: ChatResponse }) => {
  const userId = useSelector(id);
  const memberId = chat.members?.find((member) => member !== userId);

  return <div className='chatUser'>{memberId}</div>;
};

export default Chat;
