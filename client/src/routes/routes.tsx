import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../components/auth/LoginPage';
import ActivatePage from '../components/auth/ActivatePage';
import ProfilePage from '../components/user/ProfilePage';
import FriendsPage from '../components/FriendsPage';
import NewsPage from '../components/NewsPage';
import MessagesPage from '../components/MessagesPage';
import EditPage from '../components/user/EditPage';

export function useRoutes (authenticated: any, activated: boolean) {
  if (authenticated && activated) {
    return (
      <Routes>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/edit' element={<EditPage />} />
        <Route path='/friends' element={<FriendsPage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/messages' element={<MessagesPage />} />
        <Route path='*' element={<Navigate to='/profile' />} />
      </Routes>
    );
  } else if (authenticated && !activated) {
    return (
      <Routes>
        <Route path='/activate' element={<ActivatePage />} />
        <Route path='*' element={<Navigate to='/activate' />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    );
  }
};
