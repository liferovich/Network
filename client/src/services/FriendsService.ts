import { AxiosResponse } from 'axios';
import api from '../http';
import { ProfileResponse } from '../models/response/Profileresponse';

export default class FriendsService {
  static async getFriends(
    id: number
  ): Promise<AxiosResponse<Array<ProfileResponse>>> {
    return api.get<Array<ProfileResponse>>(`/friends/${id}`);
  }
}
