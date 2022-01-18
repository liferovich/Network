import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../http';
import { IUser } from '../models/IUser';
import { AuthResponse } from '../models/response/AuthResponse';
import AuthService from '../services/AuthService';

const initialState = {
  user: {},
  isAuth: false,
  isLoading: false,
};

export const login = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.login(email, password);
      console.log(response)

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.register(email, password);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();

      return;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(
        `${API_URL}/auth/refresh`,
        { withCredentials: true }
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.accessToken);
      state.isAuth = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.accessToken);
      state.isAuth = true;
      state.user = action.payload.user;
    });
    builder.addCase(register.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      localStorage.removeItem('token');
      state.isAuth = false;
      state.user = {} as IUser;
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.accessToken);
      console.log(action.payload);
      state.isAuth = true;
      state.user = action.payload.user;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setUser, setAuth, setLoading } = authSlice.actions;
export const isAuth = (state: any) => state.user.isAuth; //ANYYYYY
export const isLoading = (state: any) => state.user.isLoading; //ANYYYYY
export const isActivated = (state: any) => state.user.user.isActivated; //ANYYYYY
export default authSlice.reducer;
