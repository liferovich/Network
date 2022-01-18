import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {default as authReducer} from '../features/AuthSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
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
