export interface UserType {
  userId: string;
  email: string;
  nickname: string;
  profile_image?: string | null;
  description?: string | null;
  role: 'USER' | 'ADMIN';
}
