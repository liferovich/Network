import { AxiosResponse } from 'axios';
import api from '../http';
import { ProfileResponse } from '../models/response/Profileresponse';

export default class PostService {
  static async getPosts(id: number): Promise<AxiosResponse<ProfileResponse>> {
    return api.get<ProfileResponse>(`/post/${id}`);
  }

  static async addPost(post: {
    id: number;
    firstname: string;
    lastname: string;
    age: number;
    avatar: string;
    email: string;
    phone: string;
    sex: string;
    status: string;
    instagram: string;
    UserId: number;
  }): Promise<AxiosResponse<ProfileResponse>> {
    return api.post<ProfileResponse>(`/post/`, { post });
  }
}
