import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChatService from '../services/ChatService';

const initialState = {
  chats: [{}],
  profiles: [{}],
  isLoading: false,
};

export const getChats = createAsyncThunk(
  'chat/getchats',
  async (_, { rejectWithValue }) => {
    setLoading(true);
    try {
      const response = await ChatService.getChats();

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

export const addChat = createAsyncThunk(
  'chat/addchat',
  async (
    { userId, text }: { userId: number; text: string },
    { rejectWithValue }
  ) => {
    setLoading(true);
    try {
      const response = await ChatService.addChat(userId, text);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setchats: (state, action) => {
      state.chats = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.chats = action.payload.chats;
      state.profiles = action.payload.profiles;
    });
    builder.addCase(getChats.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(addChat.fulfilled, (state, action) => {
      state.chats = action.payload.chats;
      state.profiles = action.payload.profiles;
    });
    builder.addCase(addChat.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setLoading } = chatSlice.actions;
export const chats = (state: any) => state.chats.chats; //ANYYYYY
export const profiles = (state: any) => state.chats.profiles; //ANYYYYY
export const isLoading = (state: any) => state.chats.isLoading; //ANYYYYY
export default chatSlice.reducer;
