import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GalleryService from '../services/GalleryService';

const initialState = {
  photos: [] as any,
  isLoading: false,
};

export const getPhotos = createAsyncThunk(
  'gallery/getphotos',
  async (id: number, { rejectWithValue }) => {
    setLoading(true);
    try {
      const response = await GalleryService.getPhotos(id);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

export const addPhoto = createAsyncThunk(
  'gallery/addphotos',
  async ({ data, id }: { data: FormData; id: number }, { rejectWithValue }) => {
    setLoading(true);
    try {
      const response = await GalleryService.addPhoto(data, id);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setGellary: (state, action) => {
      state.photos = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.photos = action.payload.photos;
    });
    builder.addCase(getPhotos.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(addPhoto.fulfilled, (state, action) => {
      state.photos = [...state.photos, action.payload.photo]
    });
    builder.addCase(addPhoto.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setLoading } = gallerySlice.actions;
export const photos = (state: any) => state.gallery.photos; //ANYYYYY
// export const messages = (state: any) => state.chats.messages; //ANYYYYY
// export const profiles = (state: any) => state.chats.profiles; //ANYYYYY
// export const users = (state: any) => state.chats.users; //ANYYYYY
export const isLoading = (state: any) => state.chats.isLoading; //ANYYYYY
export default gallerySlice.reducer;
