export interface MockUser {
  userId: string;
  email: string;
  password: string;
  nickname: string;
  profile_image?: string | null;
  description?: string | null;
  role: 'USER' | 'ADMIN';
}
export const mockUsers: MockUser[] = [
  {
    userId: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    password: 'password123',
    nickname: '운동하는개발자',
    profile_image: '/jjang.jpeg',
    description: '건강한 삶을 추구하는 개발자입니다.',
    role: 'USER'
  },
  {
    userId: '456e1234-e89b-34c5-a456-243525436547',
    email: 'seon022@icloud.com',
    password: 'aaaa1234',
    nickname: '서넝',
    profile_image: null,
    description: null,
    role: 'USER'
  },
  {
    userId: '999e1234-e12b-34c5-a456-567801236547',
    email: 'seon022@naver.com',
    password: 'qwer1234',
    nickname: '소셜로그인할거야',
    profile_image: null,
    description: null,
    role: 'USER'
  }
];
