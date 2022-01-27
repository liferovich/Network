import { AxiosResponse } from 'axios';
import api from '../http';
import { PostResponse2 } from '../models/response/PostResponse';

export default class PostService {
  static async getPosts(): Promise<AxiosResponse<PostResponse2>> {
    return api.get<PostResponse2>(`/posts/`);
  }

  static async addPost(userId: number, text: string): Promise<AxiosResponse<PostResponse2>> {
    return api.post<PostResponse2>(`/posts/`, { userId, text });
  }

  static async editPost(id: number, text: string): Promise<AxiosResponse<PostResponse2>> {
    return api.put<PostResponse2>(`/posts/`, { id, text });
  }

  static async deletePost(id: number): Promise<AxiosResponse<PostResponse2>> {
    return api.delete<PostResponse2>(`/posts/${id}`);
  }
}
