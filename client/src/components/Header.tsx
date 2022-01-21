import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../features/AuthSlice';

export const Header = ({
  authenticated,
  activated,
}: {
  authenticated: boolean;
  activated: boolean;
}) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(logout());
    history('/login');
  };

  if (authenticated && activated) {
    return (
      <nav>
        <div
          className='nav-wrapper blue darken-1'
          style={{ padding: '0 2rem' }}
        >
          <span className='brand-logo'>VironIt</span>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              <NavLink to='/profile'>Profile</NavLink>
            </li>
            <li>
              <NavLink to='/friends'>Friends</NavLink>
            </li>
            <li>
              <NavLink to='/news'>News</NavLink>
            </li>
            <li>
              <NavLink to='/messages'>Messages</NavLink>
            </li>
            <li>
              <p onClick={logoutHandler}>Logout</p>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else if (authenticated) {
    return (
      <nav>
        <div
          className='nav-wrapper blue darken-1'
          style={{ padding: '0 2rem' }}
        >
          <span className='brand-logo'>VironIt</span>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              <p onClick={logoutHandler}>Logout</p>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav>
      <div className='nav-wrapper blue darken-1' style={{ padding: '0 2rem' }}>
        <span className='brand-logo'>VironIt</span>
      </div>
    </nav>
  );
};
