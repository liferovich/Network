import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import ProfileService from '../../services/ProfileService';
import { ProfileResponse } from '../../models/response/Profileresponse';
import {
  friendsIds,
  addFriend,
  deleteFriend,
} from '../../features/FriendsSlice';
import { id as currentUserId } from '../../features/AuthSlice';
import './Profile.css';

const UserPage: FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileResponse>({
    id: 0,
    firstname: '',
    lastname: '',
    age: 0,
    sex: '',
    avatar: '',
    email: '',
    phone: '',
    instagram: '',
    status: '',
    UserId: 0,
  });
  const dispatch = useDispatch();
  const userFriendsIds = useSelector(friendsIds);
  const userId = useSelector(currentUserId);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await ProfileService.getProfile(Number(id));
        if (response.data) setProfile(response.data);
      } catch (err: any) {
        console.log(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const addNewFriend = () => {
    dispatch(addFriend({ userId, friendId: Number(id) }));
  };

  const deleteMyFriend = () => {
    dispatch(deleteFriend({ userId, friendId: Number(id) }));
  };

  const buttonAddFriend = (
    <button
      className='waves-effect waves-light btn btn-addfriend'
      onClick={addNewFriend}
    >
      add user
    </button>
  );
  const buttonDeleteFriend = (
    <button
      className='grey lighten-1 btn btn-addfriend'
      onClick={deleteMyFriend}
    >
      delete user
    </button>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='profile user-profile'>
      <div className='user row'>
        <div className='user-left col s12 m12 l4'>
          <div className='user-left-inner'>
            <div className='back'>
              <NavLink to='/friends'>
                <img src='../img/back.png' alt='back' />
              </NavLink>
            </div>
            <div className='user-main-info'>
              <div className='user-image'>
                <div className='user-status'>
                  <img src='../img/vacations.png' alt='status' />
                </div>
                <img
                  className='main-img'
                  src={profile.avatar ? profile.avatar : '../img/no_user.png'}
                  id='user-image'
                  alt='user'
                />
              </div>
              <p className='sex'>
                <span id='sex'>{profile.sex === 'male' ? 'Mr' : 'Ms'}</span>
              </p>
              <h4 className='name'>
                <span id='first_name'>{profile.firstname}</span>{' '}
                <span id='last_name'>{profile.lastname}</span>
              </h4>
              <div className='block-btn-add'>
                {userFriendsIds.indexOf(Number(id)) === -1
                  ? buttonAddFriend
                  : buttonDeleteFriend}
              </div>
            </div>
          </div>
        </div>
        <div className='user-right col s12 m12 l8'>
          <div className='user-right-inner'>
            <div className='block-info'>
              <div className='title-block'>
                <h4>General info</h4>
              </div>
              <div className='block-inner'>
                {profile.age ? (
                  <div className='row'>
                    <div className='col s12 l6'>
                      <div className='block-property'>
                        <img
                          src='../img/department.png'
                          className='icon'
                          alt='Age'
                        />
                        <p>Age</p>
                      </div>
                    </div>
                    <div className='col s12 l6'>
                      <div className='block-value'>
                        <p id='age'>{profile.age}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {profile.status ? (
                  <div className='row'>
                    <div className='col s12 l6'>
                      <div className='block-property'>
                        <img
                          src='../img/room.png'
                          className='icon'
                          alt='status'
                        />
                        <p>Status</p>
                      </div>
                    </div>
                    <div className='col s12 l6'>
                      <div className='block-value'>
                        <p id='status'>{profile.status}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className='block-info'>
              <div className='title-block'>
                <h4>Contacts</h4>
              </div>
              <div className='block-inner'>
                {profile.email ? (
                  <div className='row'>
                    <div className='col s12 l6'>
                      <div className='block-property'>
                        <img
                          src='../img/department.png'
                          className='icon'
                          alt='phone'
                        />
                        <p>Mobile phone</p>
                      </div>
                    </div>
                    <div className='col s12 l6'>
                      <div className='block-value'>
                        <p id='mobile'>{profile.phone}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {profile.email ? (
                  <div className='row'>
                    <div className='col s12 l6'>
                      <div className='block-property'>
                        <img
                          src='../img/department.png'
                          className='icon'
                          alt='email'
                        />
                        <p>Email</p>
                      </div>
                    </div>
                    <div className='col s12 l6'>
                      <div className='block-value'>
                        <p id='email'>{profile.email}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className='block-info'>
              <div className='title-block'>
                <h4>Additional modules</h4>
              </div>
              <div className='block-inner'>
                {profile.instagram ? (
                  <div className='row'>
                    <div className='col s12 l6'>
                      <div className='block-property'>
                        <img
                          src='../img/department.png'
                          className='icon'
                          alt='instagram'
                        />
                        <p>Instagram</p>
                      </div>
                    </div>
                    <div className='col s12 l6'>
                      <div className='block-value'>
                        <p id='instagram'>{profile.instagram}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
