export interface PostResponse {
  id: number;
  text: string;
  date: Date;
  likes: number[];
  comments: string[];
  UserId: number;
}

export interface PostResponse2 {
  posts: [
    {
      id: number;
      text: string;
      date: Date;
      likes: number[];
      comments: string[];
      UserId: number;
    }
  ];
  profiles: [
    {
      id: number;
      firstname: string;
      lastname: string;
      UserId: number;
    }
  ];
}
