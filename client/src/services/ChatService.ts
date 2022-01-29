import { AxiosResponse } from 'axios';
import api from '../http';
import { PostResponse2 } from '../models/response/PostResponse';

export default class ChatService {
  static async getChats(): Promise<AxiosResponse<PostResponse2>> {
    return api.get<PostResponse2>(`/posts/`);
  }

  static async addChat(userId: number, text: string): Promise<AxiosResponse<PostResponse2>> {
    return api.post<PostResponse2>(`/posts/`, { userId, text });
  }
}
