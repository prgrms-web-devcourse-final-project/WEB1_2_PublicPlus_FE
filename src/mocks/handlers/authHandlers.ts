// src/mocks/handlers/authHandlers.ts
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import {
  User,
  LoginResponse,
  SignupRequest,
  EmailVerificationRequest,
  ProfileUpdateRequest
} from '../types/UserTypes';
import { mockUsers } from '../data/userData';

export const authHandlers = [
  // 로그인
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
        bearer: 'Bearer',
        access_token: faker.string.uuid(),
        refresh_token: faker.string.uuid(),
        user: {
          userId: user.userId,
          email: user.email,
          nickname: user.nickname
        }
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

  // 회원가입
  http.post('/api/user/join', async ({ request }) => {
    const body = await request.json();
    const { email, password, checkPassword, nickname } = body as SignupRequest;

    // 비밀번호 검증
    if (password !== checkPassword) {
      return HttpResponse.json(
        {
          httpStatus: 'BAD_REQUEST',
          message: '암호가 일치하지 않습니다'
        },
        { status: 400 }
      );
    }

    // 이메일 중복 검사
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return HttpResponse.json(
        {
          httpStatus: 'BAD_REQUEST',
          message: '이미 가입된 이메일입니다'
        },
        { status: 400 }
      );
    }

    // 새 사용자 생성
    const newUser: User = {
      userId: faker.string.uuid(),
      email,
      password,
      name: nickname,
      nickname,
      profilePath: faker.image.avatarGitHub(),
      description: '',
      role: 'USER'
    };

    mockUsers.push(newUser);

    return HttpResponse.json(null, { status: 204 });
  }),

  // 이메일 인증 요청
  http.post('/api/email', async ({ request }) => {
    const body = await request.json();
    const { email } = body as EmailVerificationRequest;

    // 이미 인증 요청한 이메일 체크
    if (email === 'already@example.com') {
      return HttpResponse.json(
        {
          httpStatus: 'BAD_REQUEST',
          message: '이미 인증을 요청한 이메일입니다'
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({ message: '전송완료' }, { status: 200 });
  }),

  // 이메일 인증 검증
  http.get('/api/email', ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const code = url.searchParams.get('code');

    return HttpResponse.json(
      {
        message: email === 'test@example.com' && code === '123456'
      },
      { status: 200 }
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

  // 닉네임 변경 핸들러
  http.post('/api/user/nickname/:userId', async ({ request, params }) => {
    const body = await request.json();
    const { nickname } = body as ProfileUpdateRequest;
    const { userId } = params;

    // 닉네임 유효성 검사 함수
    const isValidNickname = (nick: string | undefined): nick is string => {
      return typeof nick === 'string' && nick.length >= 2 && nick.length <= 10;
    };

    // 닉네임 유효성 검사
    if (!isValidNickname(nickname)) {
      return HttpResponse.json(
        {
          httpStatus: 'BAD_REQUEST',
          message: '닉네임을 다시 설정해주세요'
        },
        { status: 400 }
      );
    }

    const userIndex = mockUsers.findIndex(u => u.userId === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].nickname = nickname;
      return HttpResponse.json(
        { message: '닉네임 변경 완료' },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      {
        httpStatus: 'NOT_FOUND',
        message: '가입된 회원을 찾을 수 없습니다'
      },
      { status: 404 }
    );
  }),

  // 소개글 변경
  http.post('/api/user/description/:userId', async ({ request, params }) => {
    const body = await request.json();
    const { description } = body as { description: string };
    const { userId } = params;

    const userIndex = mockUsers.findIndex(u => u.userId === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].description = description;
    }

    return HttpResponse.json({ message: '소개글 변경 완료' }, { status: 200 });
  }),

  // 토큰 재발급
  http.post('/api/user/refresh', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const refreshToken = authHeader?.split(' ')[1];

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
