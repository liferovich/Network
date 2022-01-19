import { AxiosResponse } from 'axios';
import api from '../http';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/auth/login', { email, password });
  }

  static async register(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/auth/registration', { email, password });
  }

  static async logout(): Promise<void> {
    return api.post('/auth/logout');
  }

  static async deleteUser(id: number): Promise<void> {
    return api.delete(`/profile/delete/${id}`);
  }
}
