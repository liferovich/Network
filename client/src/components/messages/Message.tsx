import { useSelector } from 'react-redux';
import {format} from 'timeago.js'; //npm i timeago.js@4.0.0-beta.3
import { id } from '../../features/AuthSlice';
import { MessageResponse } from '../../models/response/ChatResponse';

const Message = (message: MessageResponse) => {
    const userId = useSelector(id);

return (<div
    className={`message ${
      userId === message.sender && 'message-right'
    }`}>
    <p className={`card-panel ${userId === message.sender ? 'teal lighten-2': 'grey lighten-2'}`}>{message.text}</p>
    <div>
      <span className='message-author'>{format(message.createdAt)}</span>
    </div>
  </div>)
}

export default Message;