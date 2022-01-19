import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { default as authReducer } from '../features/AuthSlice';
import { default as profileReducer } from '../features/ProfileSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    profile: profileReducer,
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
