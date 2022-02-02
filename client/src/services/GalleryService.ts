import { AxiosResponse } from 'axios';
import api from '../http';
import { GalleryResponse } from '../models/response/GalleryResponse';

export default class GalleryService {
  static async getChats(id: number): Promise<AxiosResponse<FormData>> {
    return api.get<FormData>(`/chats/${id}`);
  }

  static async addPhoto(data:FormData): Promise<AxiosResponse<GalleryResponse>> {
    return api.post<GalleryResponse>(`/media/`, data);
  }
}
