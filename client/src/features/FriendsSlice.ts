import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FriendsService from '../services/FriendsService';

const initialState = {
  friends: [{}],
  friendsIds: [] as Array<number>,
  users: [{}],
  isLoading: false,
};

export const getFriends = createAsyncThunk(
  'friends/getFriends',
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

export const getUsers = createAsyncThunk(
  'friends/getUsers',
  async (
    { userId, friendsIds }: { userId: number; friendsIds: Array<number> },
    { rejectWithValue }
  ) => {
    setLoading(true);
    try {
      const response = await FriendsService.getUsers(userId, friendsIds);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

export const addFriend = createAsyncThunk(
  'friends/addFriend',
  async (
    { userId, friendId }: { userId: any; friendId: any },
    { rejectWithValue }
  ) => {
    setLoading(true);
    try {
      const response = await FriendsService.addFriend(userId, friendId);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

export const deleteFriend = createAsyncThunk(
  'friends/deleteFriend',
  async (
    { userId, friendId }: { userId: any; friendId: any },
    { rejectWithValue }
  ) => {
    setLoading(true);
    try {
      const response = await FriendsService.deleteFriend(userId, friendId);

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
      state.friends = action.payload.friends;
      state.friendsIds = action.payload.friendsIds;
    });
    builder.addCase(getFriends.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(addFriend.fulfilled, (state, action) => {
      state.friends = action.payload.friends;
      state.friendsIds = action.payload.friendsIds;
    });
    builder.addCase(addFriend.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(deleteFriend.fulfilled, (state, action) => {
      state.friends = action.payload.friends;
      state.friendsIds = action.payload.friendsIds;
    });
    builder.addCase(deleteFriend.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setLoading } = friendSlice.actions;
export const friends = (state: any) => state.friends.friends; //ANYYYYY
export const friendsIds = (state: any) => state.friends.friendsIds; //ANYYYYY
export const users = (state: any) => state.friends.users; //ANYYYYY
export const isLoading = (state: any) => state.friends.isLoading; //ANYYYYY
export default friendSlice.reducer;
