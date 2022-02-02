import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../http';
import { IUser } from '../models/IUser';
import { AuthResponse } from '../models/response/AuthResponse';
import AuthService from '../services/AuthService';

// type ErrorType = {
//   error: {
//     message: string;
//   };
// };

const initialState = {
  user: {},
  isAuth: false,
  isLoading: false,
  error: {} as any,
  id: 0,
};

export const login = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.login(email, password);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
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
      return rejectWithValue(err.response.data);
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
      return rejectWithValue(err.response.data);
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
      return rejectWithValue(err.response.data);
    } finally {
      setLoading(false);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: number, { rejectWithValue }) => {
    setLoading(true);
    try {
      await AuthService.deleteUser(id);

      return;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
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
    clearError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.accessToken);
      state.isAuth = true;
      state.user = action.payload.user;
      state.id = Number(action.payload.user.id);
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action.payload);
      state.error = JSON.parse(JSON.stringify(action.payload));
    });
    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.accessToken);
      state.isAuth = true;
      state.user = action.payload.user;
      state.id = Number(action.payload.user.id);
    });
    builder.addCase(register.rejected, (state, action) => {
      console.log(action.payload);
      state.error = JSON.parse(JSON.stringify(action.payload));
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      localStorage.removeItem('token');
      state.isAuth = false;
      state.user = {} as IUser;
      state.id = 0;
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log(action.payload);
      state.error = JSON.parse(JSON.stringify(action.payload));
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.accessToken);
      state.isAuth = true;
      state.user = action.payload.user;
      state.id = Number(action.payload.user.id);
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      console.log(action.payload);
      state.error = JSON.parse(JSON.stringify(action.payload));
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      localStorage.removeItem('token');
      state.isAuth = false;
      state.user = {} as IUser;
      state.id = 0;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      console.log(action.payload);
      state.error = JSON.parse(JSON.stringify(action.payload));
    });
  },
});

export const { setUser, setAuth, setLoading, clearError } = authSlice.actions;
export const isAuth = (state: any) => state.user.isAuth; //ANYYYYY
export const isLoading = (state: any) => state.user.isLoading; //ANYYYYY
export const isActivated = (state: any) => state.user.user.isActivated; //ANYYYYY
export const id = (state: any) => state.user.id; //ANYYYYY
export const error = (state: any) => state.user.error;
export default authSlice.reducer;
