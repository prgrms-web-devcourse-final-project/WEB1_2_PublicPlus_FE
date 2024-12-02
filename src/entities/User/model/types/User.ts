export interface UserType {
  userId: string;
  email: string;
  password: string;
  nickname: string;
  profilePath?: string | null;
  description?: string | null;
  role: 'USER' | 'ADMIN';
}
