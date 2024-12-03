import { faker } from '@faker-js/faker';

// 모의 사용자 데이터
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
    userId: faker.string.uuid(),
    email: 'test@example.com',
    password: 'password123',
    nickname: '운동하는개발자',
    profile_image: faker.image.avatarGitHub(),
    description: '건강한 삶을 추구하는 개발자입니다.',
    role: 'USER'
  }
];
