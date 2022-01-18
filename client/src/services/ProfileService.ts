import { AxiosResponse } from 'axios';
import api from '../http';
import { ProfileResponse } from '../models/response/Profileresponse';

export default class ProfileService {
  static async getProfile(
    id: number
  ): Promise<AxiosResponse<ProfileResponse>> {
    return api.get<ProfileResponse>(`/profile/${id}`);
  }
}
