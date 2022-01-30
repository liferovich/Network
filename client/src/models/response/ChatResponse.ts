export interface ChatResponse {
  id: number;
  members: number[];
  date: Date;
  UserId: number;
}

export interface MessageResponse {
  id: number;
  sender: number;
  text: string;
  createdAt: Date;
  ChatId: number;
}
