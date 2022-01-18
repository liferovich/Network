import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProfileService from '../services/ProfileService';

const initialState = {
  profile: {},
  isLoading: false,
};

export const getProfile = createAsyncThunk(
  'profile/getprofile',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await ProfileService.getProfile(id);
      console.log(response);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
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
  },
});

export const { setLoading } = profileSlice.actions;
export const profile = (state: any) => state.profile.profile; //ANYYYYY
export default profileSlice.reducer;
