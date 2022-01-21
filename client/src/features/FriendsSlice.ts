import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FriendsService from '../services/FriendsService';

const initialState = {
  friends: [{}],
  isLoading: false,
};

export const getFriends = createAsyncThunk(
  'friends/getfriends',
  async (id: number, { rejectWithValue }) => {
    setLoading(true);
    try {
      const response = await FriendsService.getFriends(id);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFriends.fulfilled, (state, action) => {
      state.friends = action.payload;
    });
    builder.addCase(getFriends.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setLoading } = friendSlice.actions;
export const friends = (state: any) => state.friends.friends; //ANYYYYY
export const isLoading = (state: any) => state.friends.isLoading; //ANYYYYY
export default friendSlice.reducer;
