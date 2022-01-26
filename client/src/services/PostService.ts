import { AxiosResponse } from 'axios';
import api from '../http';
import { PostResponse } from '../models/response/PostResponse';

export default class PostService {
  static async getPosts(): Promise<AxiosResponse<Array<PostResponse>>> {
    return api.get<Array<PostResponse>>(`/post/`);
  }

  static async addPost(userId: number, text: string): Promise<AxiosResponse<Array<PostResponse>>> {
    return api.post<Array<PostResponse>>(`/post/`, { userId, text });
  }

  static async editPost(id: number, text: string): Promise<AxiosResponse<Array<PostResponse>>> {
    return api.put<Array<PostResponse>>(`/post/`, { id, text });
  }

  static async deletePost(id: number): Promise<AxiosResponse<Array<PostResponse>>> {
    return api.delete<Array<PostResponse>>(`/post/${id}`);
  }
}
