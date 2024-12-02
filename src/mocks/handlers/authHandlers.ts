import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { mockUsers } from '../data/userData';
import { UserLoginDTO, UserJoinDTO, ErrorResponseDTO } from '@/api/generated';

export const authHandlers = [
  // 로그인 핸들러
  http.post('/api/user/login', async ({ request }) => {
    const body = (await request.json()) as UserLoginDTO;
    const { email, password } = body;

    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      return HttpResponse.json(
        {
          userId: user.userId,
          access_token: faker.string.uuid(),
          refresh_token: faker.string.uuid()
        },
        { status: 200 }
      );
    }

    const errorResponse: ErrorResponseDTO = {
      errorCode: 'LOGIN_FAILED',
      message: '이메일이나 암호가 맞지 않습니다',
      details: '로그인 실패'
    };

    return HttpResponse.json(errorResponse, { status: 400 });
  }),

  // 회원가입 핸들러 (추가)
  http.post('/api/user/join', async ({ request }) => {
    const body = (await request.json()) as UserJoinDTO;
    const { email, password, nickname } = body;

    // 간단한 중복 검사 로직
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'JOIN_FAILED',
        message: '이미 존재하는 이메일입니다',
        details: '회원가입 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    // 회원가입 성공 로직
    return HttpResponse.json({}, { status: 201 });
  }),

  // 토큰 재발급 핸들러
  http.post('/api/user/refresh/header', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'TOKEN_INVALID',
        message: '유효하지 않은 토큰입니다',
        details: '토큰 재발급 실패'
      };
      return HttpResponse.json(errorResponse, { status: 401 });
    }

    const refreshToken = authHeader.split(' ')[1];

    return HttpResponse.json(
      {
        access_token: faker.string.uuid(),
        refresh_token: refreshToken
      },
      { status: 200 }
    );
  })
];
