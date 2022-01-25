import { AxiosResponse } from 'axios';
import api from '../http';
import {
  ProfileResponse,
  ProfileResponse2,
} from '../models/response/Profileresponse';

export default class FriendsService {
  static async getFriends(
    id: number
  ): Promise<AxiosResponse<ProfileResponse2>> {
    return api.get<ProfileResponse2>(`/friends/${id}`);
  }

  static async addFriend(
    id: any,
    friendId: any
  ): Promise<AxiosResponse<ProfileResponse2>> {
    return api.put<ProfileResponse2>(`/friends/add/${id}`, { friendId });
  }

  static async deleteFriend(
    id: any,
    friendId: any
  ): Promise<AxiosResponse<ProfileResponse2>> {
    return api.put<ProfileResponse2>(`/friends/delete/${id}`, {
      friendId,
    });
  }

  static async getUsers(
    userId: number,
    friendsIds: Array<number>
  ): Promise<AxiosResponse<Array<ProfileResponse>>> {
    return api.post<Array<ProfileResponse>>(`/profile/`, {
      userId,
      friendsIds,
    });
  }
}
