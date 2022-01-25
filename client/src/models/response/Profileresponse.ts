export interface ProfileResponse {
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

export interface ProfileResponse2 {
  friends: [
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
  friendsIds: [number];
}
