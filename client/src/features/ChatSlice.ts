import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChatService from '../services/ChatService';
import FriendsService from '../services/FriendsService';

const initialState = {
  chats: [{}],
  users: [{}],
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
    { text, sender, ChatId }: { text: string; sender: number; ChatId: number },
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

export const getUsers = createAsyncThunk(
  'chat/getUsers',
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

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setMessage: (state, action) => {
      console.log(action.payload);
      state.messages = [...state.messages, action.payload];
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
      state.chats = [...state.chats, action.payload];
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
      state.messages = [...state.messages, action.payload];
    });
    builder.addCase(addMessage.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setLoading, setMessage } = chatSlice.actions;
export const chats = (state: any) => state.chats.chats; //ANYYYYY
export const messages = (state: any) => state.chats.messages; //ANYYYYY
export const profiles = (state: any) => state.chats.profiles; //ANYYYYY
export const users = (state: any) => state.chats.users; //ANYYYYY
export const isLoading = (state: any) => state.chats.isLoading; //ANYYYYY
export default chatSlice.reducer;
