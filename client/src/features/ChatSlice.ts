import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChatService from '../services/ChatService';

const initialState = {
  chats: [{}],
  messages: [{}],
  profiles: [{}],
  isLoading: false,
};

export const getChats = createAsyncThunk(
  'chat/getchats',
  async (id: number, { rejectWithValue }) => {
    setLoading(true);
    try {
      const response = await ChatService.getChats(id);

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
    { senderId, receiverId }: { senderId: number; receiverId: number },
    { rejectWithValue }
  ) => {
    setLoading(true);
    try {
      const response = await ChatService.addChat(senderId, receiverId);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

export const getMessages = createAsyncThunk(
  'chat/getmessages',
  async (chatId: number, { rejectWithValue }) => {
    setLoading(true);
    try {
      const response = await ChatService.getMessages(chatId);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

export const addMessage = createAsyncThunk(
  'chat/addmessage',
  async (
    { text, sender, ChatId }: { text: string, sender: number, ChatId: number },
    { rejectWithValue }
  ) => {
    setLoading(true);
    try {
      const response = await ChatService.addMessage(text, sender, ChatId);

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
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.chats = action.payload;
    });
    builder.addCase(getChats.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(addChat.fulfilled, (state, action) => {
      state.chats = state.chats.push(action.payload);
    });
    builder.addCase(addChat.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.messages = state.messages.push(action.payload);
    });
    builder.addCase(addMessage.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setLoading } = chatSlice.actions;
export const chats = (state: any) => state.chats.chats; //ANYYYYY
export const messages = (state: any) => state.chats.messages; //ANYYYYY
export const isLoading = (state: any) => state.chats.isLoading; //ANYYYYY
export default chatSlice.reducer;
