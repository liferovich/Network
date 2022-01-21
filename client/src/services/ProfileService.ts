import { AxiosResponse } from 'axios';
import api from '../http';
import { ProfileResponse } from '../models/response/Profileresponse';

export default class ProfileService {
  static async getProfile(id: number): Promise<AxiosResponse<ProfileResponse>> {
    return api.get<ProfileResponse>(`/profile/${id}`);
  }

  static async editProfile(profile: {
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
    return api.put<ProfileResponse>(`/profile/edit`, { profile });
  }
}
