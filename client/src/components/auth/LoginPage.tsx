import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  register,
  checkAuth,
  error,
} from '../../features/AuthSlice';
import { useMessage } from '../../hook/message.hook';

const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const userError = useSelector(error);
  const message = useMessage();

  const handleLogin = (e: React.FormEvent) => {
    dispatch(login({ email, password }));
    e.preventDefault();
  };

  const handleRegister = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(register({ email, password }));
  };

  useEffect(() => {
    if (userError.hasOwnProperty('error')) {
      message(userError.error.message);
    }
  }, [message, userError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Authorization</h1>
        <form className='loginForm card blue darken-1'>
          <div className='card-content white-text'>
            <div>
              <div className='input-field'>
                <input
                  placeholder='Input Email'
                  id='email'
                  type='text'
                  name='email'
                  className='yellow-input'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label className='active' htmlFor='email'>
                  Email
                </label>
              </div>
              <div className='input-field'>
                <input
                  placeholder='Input Password'
                  id='password'
                  type='password'
                  name='password'
                  className='yellow-input'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label className='active' htmlFor='password'>
                  Password
                </label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn yellow darken-4'
              style={{ marginRight: 10 }}
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className='btn grey lighten-1 black-text'
              onClick={handleRegister}
            >
              Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
