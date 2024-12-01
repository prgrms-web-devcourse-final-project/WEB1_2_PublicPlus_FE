// src/mocks/handlers/authHandlers.ts
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { mockUsers } from '../data/userData';
import { LoginResponse } from '@/entities/User';

export const authHandlers = [
  // 로그인 핸들러
  http.post('/api/user/login', async ({ request }) => {
    const body = await request.json();
    const { email, password } = body as {
      email: string;
      password: string;
    };

    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      // LoginResponse 타입에 맞게 응답 구조 작성
      const response: LoginResponse = {
        userId: user.userId,
        bearer: 'Bearer',
        access_token: faker.string.uuid(),
        refresh_token: faker.string.uuid()
      };

      return HttpResponse.json(response, { status: 200 });
    }

    return HttpResponse.json(
      {
        httpStatus: 'BAD_REQUEST',
        message: '이메일이나 암호가 맞지 않습니다'
      },
      { status: 400 }
    );
  }),

  // 프로필 조회
  http.get('/api/user/:userId', ({ params }) => {
    const { userId } = params;
    const user = mockUsers.find(u => u.userId === userId);

    if (!user) {
      return HttpResponse.json(
        {
          httpStatus: 'NOT_FOUND',
          message: '가입된 회원을 찾을 수 없습니다'
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        userId: user.userId,
        email: user.email,
        profilePath: user.profilePath,
        nickname: user.nickname,
        description: user.description,
        Role: user.role
      },
      { status: 200 }
    );
  }),

  // 토큰 재발급
  http.post('/api/user/refresh/header', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          httpStatus: 'UNAUTHORIZED',
          message: '유효하지 않은 토큰입니다'
        },
        { status: 401 }
      );
    }

    const refreshToken = authHeader.split(' ')[1];

    return HttpResponse.json(
      {
        bearer: 'Bearer',
        access_token: faker.string.uuid(),
        refresh_token: refreshToken
      },
      { status: 200 }
    );
  })
];
