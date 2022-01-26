import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostService from '../services/PostService';

const initialState = {
  posts: [{}],
  isLoading: false,
};

export const getPosts = createAsyncThunk(
  'post/getposts',
  async (_, { rejectWithValue }) => {
    setLoading(true);
    try {
      const response = await PostService.getPosts();

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
    { userId, text }: { userId: number, text: string },
    { rejectWithValue }
  ) => {
    setLoading(true);
    try {
      const response = await PostService.addPost(userId, text);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

export const editPost = createAsyncThunk(
  'post/addpost',
  async (
    { id, text }: { id: number, text: string },
    { rejectWithValue }
  ) => {
    setLoading(true);
    try {
      const response = await PostService.editPost(id, text);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletepost',
  async (
    id: number,
    { rejectWithValue }
  ) => {
    setLoading(true);
    try {
      const response = await PostService.deletePost(id);

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
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(editPost.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setLoading } = postSlice.actions;
export const posts = (state: any) => state.profile.posts; //ANYYYYY
export const isLoading = (state: any) => state.profile.isLoading; //ANYYYYY
export default postSlice.reducer;
