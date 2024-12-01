export interface UserType {
  userId: string;
  email: string;
  password: string;
  nickname: string;
  profilePath?: string;
  description?: string;
  role: 'USER' | 'ADMIN';
}
