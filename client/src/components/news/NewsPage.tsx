import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { profile } from '../../features/ProfileSlice';
import './NewsPage.css';

const NewsPage: FC = () => {
  const [text, setText] = useState('');
  const userProfile = useSelector(profile);

  const addNewPost = () => {
    
  }

  return (
      <div className='user row news-page'>
        <div className='user-left col m4 s12'>
          <div className='user-left-inner'>
            <div className='user-main-info'>
              <div className='user-image'>
                <div className='user-status'>
                  <img src='img/vacations.png' alt='status' />
                </div>
                <img
                  className='main-img'
                  src={
                    userProfile.avatar ? userProfile.avatar : 'img/no_user.png'
                  }
                  id='user-image'
                  alt='user'
                />
              </div>
              <p className='sex'>
                <span id='sex'>{userProfile.sex === 'male' ? 'Mr' : 'Ms'}</span>
              </p>
              <h4 className='name'>
                <span id='first_name'>{userProfile.firstname}</span>{' '}
                <span id='last_name'>{userProfile.lastname}</span>
              </h4>
            </div>
          </div>
        </div>
        <div className='user-right col m8 s12'>
          <div className='news'>
            <h4>Posts</h4>
            <p>Welcome to the community!</p>
            <br />
            <form className='post-form'>
              <div className='row'>
                <div className='col s12 post-field'>
                  <textarea
                    id='icon_prefix2'
                    className='materialize-textarea'
                    placeholder='Input some text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                  <button className='btn waves-effect waves btn-post' onClick={addNewPost}>
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default NewsPage;
