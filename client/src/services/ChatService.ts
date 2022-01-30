import { AxiosResponse } from 'axios';
import api from '../http';
import { ChatResponse, MessageResponse } from '../models/response/ChatResponse';

export default class ChatService {
  static async getChats(id: number): Promise<AxiosResponse<Array<ChatResponse>>> {
    return api.get<Array<ChatResponse>>(`/chats/${id}`);
  }

  static async addChat(senderId: number, receiverId: number): Promise<AxiosResponse<ChatResponse>> {
    return api.post<ChatResponse>(`/chats/`, { senderId, receiverId });
  }

  static async getMessages(id: number): Promise<AxiosResponse<Array<MessageResponse>>> {
    return api.get<Array<MessageResponse>>(`/messages/${id}`);
  }

  static async addMessage(text: string, sender: number, ChatId: number): Promise<AxiosResponse<MessageResponse>> {
    return api.post<MessageResponse>(`/messages/`, {text, sender, ChatId});
  }
}
