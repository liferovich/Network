import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { profile, isLoading, editProfile } from '../../features/ProfileSlice';
import { deleteUser } from '../../features/AuthSlice';
import './Profile.css';

const EditPage: FC = () => {
  const userProfile = useSelector(profile);
  const loading = useSelector(isLoading);
  const [editedUserProfile, setEditedUserProfile] = useState(userProfile);
  const dispatch = useDispatch();
  const history = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUserProfile({
      ...editedUserProfile,
      [event.target.name]: event.target.value,
    });
  };

  const editUserProfile = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(editProfile(editedUserProfile));
    history('/profile');
  };

  const deleteUserProfile = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(deleteUser(editedUserProfile.user_id));
    // history('/login');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='edit-page'>
      <div className='user row'>
        <div className='user-left col s12 m12 l4'>
          <div className='user-left-inner'>
            <div className='back'>
              <NavLink to='/profile'>
                <img src='img/back.png' alt='back' />
              </NavLink>
            </div>
            <div className='user-main-info'>
              <div className='user-image'>
                <img
                  className='main-img'
                  src='./img/upload.png'
                  id='user-image'
                  alt='user'
                />
              </div>
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
                <div className='row'>
                  <div className='col s12 l5'>
                    <div className='block-property'>
                      <img
                        src='img/department.png'
                        className='icon'
                        alt='Age'
                      />
                      <p className='ml-32'>Sex</p>
                    </div>
                  </div>
                  <div className='col s12 l7'>
                    <div className='block-value radio-block'>
                      <label>
                        <input
                          className='with-gap'
                          name='sex'
                          type='radio'
                          value='male'
                          checked={
                            editedUserProfile.sex === 'male' ? true : false
                          }
                          onChange={onChange}
                        />
                        <span>Mr</span>
                      </label>
                      <label>
                        <input
                          className='with-gap'
                          name='sex'
                          type='radio'
                          value='female'
                          checked={
                            editedUserProfile.sex === 'female' ? true : false
                          }
                          onChange={onChange}
                        />
                        <span>Ms</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col s12 l5'>
                    <div className='block-property'>
                      <img
                        src='img/department.png'
                        className='icon'
                        alt='Age'
                      />
                      <p className='ml-32'>First name</p>
                    </div>
                  </div>
                  <div className='col s12 l7'>
                    <div className='block-value'>
                      <input
                        type='text'
                        name='firstname'
                        id='firstname'
                        className='edit-text'
                        value={editedUserProfile.firstname}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col s12 l5'>
                    <div className='block-property'>
                      <img
                        src='img/department.png'
                        className='icon'
                        alt='Age'
                      />
                      <p className='ml-32'>Last name</p>
                    </div>
                  </div>
                  <div className='col s12 l7'>
                    <div className='block-value'>
                      <input
                        type='text'
                        name='lastname'
                        id='lastname'
                        className='edit-text'
                        value={editedUserProfile.lastname}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col s12 l5'>
                    <div className='block-property'>
                      <img
                        src='img/department.png'
                        className='icon'
                        alt='Age'
                      />
                      <p className='ml-32'>Age</p>
                    </div>
                  </div>
                  <div className='col s12 l7'>
                    <div className='block-value'>
                      <input
                        type='text'
                        name='age'
                        id='age'
                        className='edit-text'
                        value={editedUserProfile.age}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col s12 l5'>
                    <div className='block-property'>
                      <img src='img/room.png' className='icon' alt='status' />
                      <p className='ml-32'>Status</p>
                    </div>
                  </div>
                  <div className='col s12 l7'>
                    <div className='block-value radio-block'>
                      <label>
                        <input
                          className='with-gap'
                          name='status'
                          type='radio'
                          value='active'
                          checked={
                            editedUserProfile.status === 'active' ? true : false
                          }
                          onChange={onChange}
                        />
                        <span>Active</span>
                      </label>
                      <label>
                        <input
                          className='with-gap'
                          name='status'
                          type='radio'
                          value='passive'
                          checked={
                            editedUserProfile.status === 'passive'
                              ? true
                              : false
                          }
                          onChange={onChange}
                        />
                        <span>Passive</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='block-info'>
              <div className='title-block'>
                <h4>Contacts</h4>
              </div>
              <div className='block-inner'>
                <div className='row'>
                  <div className='col l5'>
                    <div className='block-property'>
                      <img
                        src='img/department.png'
                        className='icon'
                        alt='phone'
                      />
                      <p>Mobile phone</p>
                    </div>
                  </div>
                  <div className='col l7'>
                    <div className='block-value'>
                      <input
                        type='text'
                        name='phone'
                        id='phone'
                        className='edit-text'
                        value={editedUserProfile.phone}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col l5'>
                    <div className='block-property'>
                      <img
                        src='img/department.png'
                        className='icon'
                        alt='email'
                      />
                      <p>Email</p>
                    </div>
                  </div>
                  <div className='col l7'>
                    <div className='block-value'>
                      <input
                        type='text'
                        name='email'
                        id='email'
                        className='edit-text'
                        value={editedUserProfile.email}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='block-info'>
              <div className='title-block'>
                <h4>Additional modules</h4>
              </div>
              <div className='block-inner'>
                <div className='row'>
                  <div className='col l5'>
                    <div className='block-property'>
                      <img
                        src='img/department.png'
                        className='icon'
                        alt='instagram'
                      />
                      <p>Instagram</p>
                    </div>
                  </div>
                  <div className='col l7'>
                    <div className='block-value'>
                      <input
                        type='text'
                        name='instagram'
                        id='instagram'
                        className='edit-text'
                        value={editedUserProfile.instagram}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='block-info delete-block'>
              <button className='red darken-3 btn' onClick={deleteUserProfile}>delete</button>
            </div>
          </div>
        </div>
        <div className='user-details col s12 m6 l2'>
          <div className='edit'>
            <NavLink to='/profile' className='btn-edit btn-cancel'>
              cancel
            </NavLink>
          </div>
          <div className='edit create'>
            <button className='btn-edit btn-create' onClick={editUserProfile}>
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
