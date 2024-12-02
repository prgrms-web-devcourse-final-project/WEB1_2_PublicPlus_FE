export interface UserInformation {
  userId: string;
  email: string;
  profile_image: string;
  nickname: string;
  description: string;
  role: 'USER' | 'ADMIN' | 'GUEST';
}
