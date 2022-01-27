import { FC, useState } from 'react';
import './Chat.css';

const Chat: FC = ({ users, messages }: { users: string[], messages: string[] }) => {
    const [messageValue, setMessageValue] = useState('');

    return (
        <div className='chat'>
            <div className="chat-users">
                <b>Online ({users.length})</b>
                <ul>
                    {users.map(name => <li key={name}>{name}</li>)}
                    
                </ul>
            </div>
            <div className="chat-messages">
                <div className="messages">
                    <div className="message">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi dolorem dolorum natus consequatur saepe quidem iusto sed nobis? Consequuntur, optio aperiam. Quae, delectus velit! Placeat nisi suscipit rem molestias sequi.</p>
                        <div>
                            <span>Test User</span>
                        </div>
                    </div>
                    <div className="message">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi dolorem dolorum natus consequatur saepe quidem iusto sed nobis? Consequuntur, optio aperiam. Quae, delectus velit! Placeat nisi suscipit rem molestias sequi.</p>
                        <div>
                            <span>Test User</span>
                        </div>
                    </div>
                    <div className="message">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi dolorem dolorum natus consequatur saepe quidem iusto sed nobis? Consequuntur, optio aperiam. Quae, delectus velit! Placeat nisi suscipit rem molestias sequi.</p>
                        <div>
                            <span>Test User</span>
                        </div>
                    </div>
                </div>
                <form>
                    <textarea value={messageValue} onChange={(e)=> setMessageValue(e.target.value)} className='form-control' rows='3' ></textarea>
                    <button className='btn btn-primary'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat;