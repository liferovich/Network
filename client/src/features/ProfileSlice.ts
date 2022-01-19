import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProfileService from '../services/ProfileService';

const initialState = {
  profile: {},
  isLoading: false,
};

export const getProfile = createAsyncThunk(
  'profile/getprofile',
  async (id: number, { rejectWithValue }) => {
    setLoading(true);
    try {
      const response = await ProfileService.getProfile(id);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

export const editProfile = createAsyncThunk(
  'profile/editprofile',
  async (
    profile: {
      id: number;
      user_id: number;
      firstname: string;
      lastname: string;
      age: number;
      avatar: string;
      email: string;
      phone: string;
      sex: string;
      status: string;
      instagram: string;
      UserId: number;
    },
    { rejectWithValue }
  ) => {
    setLoading(true);
    try {
      const response = await ProfileService.editProfile(profile);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setLoading } = profileSlice.actions;
export const profile = (state: any) => state.profile.profile; //ANYYYYY
export const isLoading = (state: any) => state.profile.isLoading; //ANYYYYY
export default profileSlice.reducer;
