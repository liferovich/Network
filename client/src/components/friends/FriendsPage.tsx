import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  friends,
  friendsIds,
  getFriends,
  isLoading,
  addFriend,
  getUsers,
  users,
  deleteFriend,
} from '../../features/FriendsSlice';
import { id } from '../../features/AuthSlice';

import './FriendsPage.css';
import { NavLink } from 'react-router-dom';

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
  const userFriendsIds = useSelector(friendsIds);
  const allUsers = useSelector(users);
  const loading = useSelector(isLoading);
  const quantity = userFriends?.length || 0;
  const quantityUsers = allUsers?.length || 0;

  useEffect(() => {
    dispatch(getFriends(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getUsers({ userId, friendsIds: userFriendsIds }));
  }, [dispatch, userId, userFriendsIds]);

  const addNewFriend = (friendId: any) => {
    dispatch(addFriend({ userId, friendId }));
  };
  const deleteMyFriend = (friendId: any) => {
    dispatch(deleteFriend({ userId, friendId }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='row friends-page'>
      <div className='col m4 s12'>
        <div className='search'>
          <div className='search-inner'>
            <div className='tabs-search'>
              <div className='tab active'>
                <p>Search users</p>
              </div>
            </div>
            <form className='form-search' method='post'>
              <div className='form-inner'>
                <div className='input-search'>
                  <input
                    type='text'
                    placeholder='John Smith'
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
      <div className='col m8 s12'>
        <div className='friends'>
          <div className='friends-top'>
            <p className='count'>
              <span id='count'>{quantity}</span> friend(s)
            </p>
          </div>
          <div className='friends-inner'>
            <div className='row' id='friends-row'>
              {userFriends?.map((friend: FriendType) => {
                return (
                  <div className='friend-block col m4 s12'>
                    <div className='friend' key={friend.id}>
                      <div className='friend-photo'>
                        <img
                          src={
                            friend.avatar ? friend.avatar : './img/no_user.png'
                          }
                          alt='avatar'
                        />
                      </div>
                      <div className='friend-info'>
                        <div className='friend-name'>
                          <h4>
                            <NavLink to={`/user/${friend.UserId}`} className='link'>
                              {friend.firstname} {friend.lastname}
                            </NavLink>
                          </h4>
                        </div>
                        <div className='addition-info'>
                          <div className='department'>
                            <img src='img/department.png' alt='department' />
                            <p>{friend.email}</p>
                          </div>
                          <div className='room'>
                            <img src='img/room.png' alt='deparment' />
                            <p>{friend.phone}</p>
                          </div>
                          <button
                            className='grey lighten-1 btn btn-addfriend'
                            onClick={(e) => deleteMyFriend(friend.UserId)}
                          >
                            delete friend
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <br />
        <hr />
        <div className='users'>
          <div className='friends-top'>
            <p className='count'>
              <span id='count'>{quantityUsers}</span> user(s)
            </p>
          </div>
          <div className='friends-inner'>
            <div className='row'>
              {allUsers?.map((user: FriendType) => {
                return (
                  <div className='friend-block col m4 s12' key={user.id}>
                    <div className='friend'>
                      <div className='friend-photo'>
                        <img
                          src={user.avatar ? user.avatar : './img/no_user.png'}
                          alt='avatar'
                        />
                      </div>
                      <div className='friend-info'>
                        <div className='friend-name'>
                          <h4>
                            <NavLink to={`/user/${user.UserId}`} className='link'>
                              {user.firstname} {user.lastname}
                            </NavLink>
                          </h4>
                        </div>
                        <div className='addition-info'>
                          <div className='department'>
                            <img src='img/department.png' alt='department' />
                            <p>{user.email}</p>
                          </div>
                          <div className='room'>
                            <img src='img/room.png' alt='deparment' />
                            <p>{user.phone}</p>
                          </div>
                          <button
                            className='waves-effect waves-light btn btn-addfriend'
                            onClick={(e) => addNewFriend(user.UserId)}
                          >
                            add friend
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
