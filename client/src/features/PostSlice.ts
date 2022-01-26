import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProfileService from '../services/ProfileService';

const initialState = {
  posts: [{}],
  isLoading: false,
};

export const getPosts = createAsyncThunk(
  'post/getposts',
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

export const addPost = createAsyncThunk(
  'post/addpost',
  async (
    post: {
      id: number;
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
      console.log(post);
      const response = await ProfileService.editProfile(post);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(addPost.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setLoading } = postSlice.actions;
export const posts = (state: any) => state.profile.posts; //ANYYYYY
export const isLoading = (state: any) => state.profile.isLoading; //ANYYYYY
export default postSlice.reducer;
