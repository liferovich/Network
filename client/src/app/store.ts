import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { default as authReducer } from '../features/AuthSlice';
import { default as profileReducer } from '../features/ProfileSlice';
import { default as friendsReducer } from '../features/FriendsSlice';
import { default as postReducer } from '../features/PostSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    profile: profileReducer,
    friends: friendsReducer,
    posts: postReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
