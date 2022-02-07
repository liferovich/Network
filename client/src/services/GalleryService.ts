import { AxiosResponse } from 'axios';
import api from '../http';
import {
  PhotoResponse,
  PhotosResponse,
} from '../models/response/GalleryResponse';

export default class GalleryService {
  static async getPhotos(id: number): Promise<AxiosResponse<PhotosResponse>> {
    return api.get<PhotosResponse>(`/media/${id}`);
  }

  static async addPhoto(
    data: FormData,
    id: number
  ): Promise<AxiosResponse<PhotoResponse>> {
    return api.post<PhotoResponse>(`/media/${id}`, data);
  }
}
