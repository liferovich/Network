import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { profile, getProfile, isLoading } from '../../features/ProfileSlice';
import { id } from '../../features/AuthSlice';
import './Profile.css';

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(id);
  const userProfile = useSelector(profile);
  const loading = useSelector(isLoading);

  useEffect(() => {
    dispatch(getProfile(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='profile'>
      <div className='user row'>
        <div className='user-left col s12 m12 l4'>
          <div className='user-left-inner'>
            <div className='user-main-info'>
              <div className='user-image'>
                <div className='user-status'>
                  <img src='img/vacations.png' alt='status' />
                </div>
                <img
                  className='main-img'
                  src={
                    userProfile.avatar
                      ? userProfile.avatar
                      : './img/no_user.png'
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
        <div className='user-right col s12 m6 l6'>
          <div className='user-right-inner'>
            <div className='block-info'>
              <div className='title-block'>
                <h4>General info</h4>
              </div>
              <div className='block-inner'>
                {userProfile.age ? (
                  <div className='row'>
                    <div className='col s12 l6'>
                      <div className='block-property'>
                        <img
                          src='img/department.png'
                          className='icon'
                          alt='Age'
                        />
                        <p>Age</p>
                      </div>
                    </div>
                    <div className='col s12 l6'>
                      <div className='block-value'>
                        <p id='age'>{userProfile.age}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {userProfile.status ? (
                  <div className='row'>
                    <div className='col s12 l6'>
                      <div className='block-property'>
                        <img src='img/room.png' className='icon' alt='status' />
                        <p>Status</p>
                      </div>
                    </div>
                    <div className='col s12 l6'>
                      <div className='block-value'>
                        <p id='status'>{userProfile.status}</p>
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
                {userProfile.email ? (
                  <div className='row'>
                    <div className='col s12 l6'>
                      <div className='block-property'>
                        <img
                          src='img/department.png'
                          className='icon'
                          alt='phone'
                        />
                        <p>Mobile phone</p>
                      </div>
                    </div>
                    <div className='col s12 l6'>
                      <div className='block-value'>
                        <p id='mobile'>{userProfile.phone}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {userProfile.email ? (
                  <div className='row'>
                    <div className='col s12 l6'>
                      <div className='block-property'>
                        <img
                          src='img/department.png'
                          className='icon'
                          alt='email'
                        />
                        <p>Email</p>
                      </div>
                    </div>
                    <div className='col s12 l6'>
                      <div className='block-value'>
                        <p id='email'>{userProfile.email}</p>
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
                {userProfile.instagram ? (
                  <div className='row'>
                    <div className='col s12 l6'>
                      <div className='block-property'>
                        <img
                          src='img/department.png'
                          className='icon'
                          alt='instagram'
                        />
                        <p>Instagram</p>
                      </div>
                    </div>
                    <div className='col s12 l6'>
                      <div className='block-value'>
                        <p id='instagram'>{userProfile.instagram}</p>
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
        <div className='user-details col s12 m6 l2'>
          <div className='edit edit-user'>
            <NavLink to='/edit' id='btn-edit' className='btn-edit'>
              edit details
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
