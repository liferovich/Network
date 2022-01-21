import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { friends, getFriends, isLoading } from '../../features/FriendsSlice';
import { id } from '../../features/AuthSlice';

import './FriendsPage.css';

type FriendType = {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  sex: string;
  avatar: string | null;
  email: string;
  phone: string;
  instagram: string | null;
  status: string | null;
  UserId: number;
};

const FriendsPage: FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(id);
  const userFriends = useSelector(friends);
  const loading = useSelector(isLoading);

  useEffect(() => {
    dispatch(getFriends(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* <div className='row'>
        {userFriends.length
          ? userFriends.map((friend: FriendType) => {
              return (
                <div className='col s12 m3'>
                  <div className='friend card' key={friend.UserId}>
                    <div className='card-image'>
                      <img src={friend.avatar || 'img/userpic_100px.png'} alt={friend.lastname} />
                      <span className='card-title'>{friend.firstname} {friend.lastname}</span>
                      <p className='btn-floating halfway-fab waves-effect waves-light red'>
                        <i className='material-icons'>add</i>
                      </p>
                    </div>
                    <div className='card-content'>
                      <p>Email: {friend.email}</p>
                      <p>Phone: {friend.phone}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : ''}
      </div> */}

      <div className='row'>
        <div className='col-lg-4'>
          <div className='search'>
            <div className='search-inner'>
              <div className='tabs-search'>
                <div className='tab active'>
                  <p>Basic search</p>
                </div>
                <div className='tab'>
                  <p>Advanced search</p>
                </div>
              </div>
              <form className='form-search' method='post'>
                <div className='form-inner'>
                  <div className='input-search'>
                    <input
                      type='text'
                      placeholder='John Smith / Джон Смит'
                      id='name'
                    />
                  </div>
                  <button type='submit' id='btn-search'>
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='col-lg-8'>
          <div className='employees'>
            <div className='employees-top'>
              <p className='count'>
                <span id='count'></span> employees displayed
              </p>
              <div className='tabs-show'>
                <div className='tab tab-3 active' id='tab-3'></div>
                <div className='tab tab-1' id='tab-1'></div>
              </div>
            </div>
            <div className='employees-inner'>
              <div className='row' id='employees-row'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
