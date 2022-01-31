export interface ChatResponse {
  id: number;
  members: number[];
  date: Date;
  UserId: number;
}

export interface ChatResponse2 {
  chats: [
    {
      id: number;
      members: number[];
      date: Date;
      UserId: number;
    }
  ];
  profiles: [
    {
      id: number;
      firstname: string;
      lastname: string;
      age: number;
      sex: string;
      avatar: string | null;
      email: string;
      phone: string;
      instagram: string | null;
      status: string | null;
      UserId: number;
    }
  ];
}

export interface MessageResponse {
  id: number;
  sender: number;
  text: string;
  createdAt: Date;
  ChatId: number;
}
