// src/mocks/handlers/authHandlers.ts
import { http, HttpResponse } from 'msw';
import { User, LoginResponse, SignupRequest } from '../types/UserTypes';
import { loginMockData } from '../data/authData';
import { mockUsers } from '../data/userData';

export const authHandlers = [
  http.post('/api/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      const response: LoginResponse = {
        ...loginMockData,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      };

      return HttpResponse.json(response, { status: 200 });
    }

    return HttpResponse.json(
      {
        message: '로그인 실패'
      },
      { status: 401 }
    );
  }),

  http.post('/api/logout', () => {
    return HttpResponse.json(
      {
        message: '로그아웃 성공'
      },
      { status: 200 }
    );
  }),

  http.post('/api/signup', async ({ request }) => {
    const { email, password, name } = (await request.json()) as SignupRequest;

    const existingUser = mockUsers.find(u => u.email === email);

    if (existingUser) {
      return HttpResponse.json(
        {
          message: '이미 존재하는 이메일입니다.'
        },
        { status: 400 }
      );
    }

    // password 사용 예시
    if (password.length < 6) {
      return HttpResponse.json(
        {
          message: '비밀번호는 최소 6자 이상이어야 합니다.'
        },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email,
      name,
      password
    };

    mockUsers.push(newUser);

    return HttpResponse.json(
      {
        user: newUser,
        message: '회원가입 성공'
      },
      { status: 201 }
    );
  })
];
