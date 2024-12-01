// src/mocks/data/userData.ts

import { UserType } from '@/entities/User';
import { faker } from '@faker-js/faker';

// 모의 사용자 데이터
export const mockUsers: UserType[] = [
  {
    userId: faker.string.uuid(),
    email: 'test@example.com',
    password: 'password123',
    nickname: '운동하는개발자',
    profilePath: faker.image.avatarGitHub(),
    description: '건강한 삶을 추구하는 개발자입니다.',
    role: 'USER'
  }
];
