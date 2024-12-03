import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { mockUsers } from '../data/userData';
import { UserLoginDTO, UserJoinDTO, ErrorResponseDTO } from '@/api/generated';

const emailVerificationCodes: Record<string, string> = {};

export const authHandlers = [
  http.post('/api/user/login', async ({ request }) => {
    const body = (await request.json()) as UserLoginDTO;
    const { email, password } = body;

    if (!email || !password) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'LOGIN_INVALID',
        message: '이메일과 비밀번호를 입력해주세요',
        details: '로그인 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      return HttpResponse.json(
        {
          userId: user.userId,
          authentication: 'Bearer',
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

  http.post('/api/email', ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'EMAIL_INVALID',
        message: '유효한 이메일 주소를 입력해주세요',
        details: '이메일 인증 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    const verificationCode = faker.string.numeric(6);

    emailVerificationCodes[email] = verificationCode;
    console.log(`Verification code for ${email}: ${verificationCode}`);

    return HttpResponse.json(null, { status: 200 });
  }),

  http.get('/api/email', ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const code = url.searchParams.get('code');

    if (!email || !code) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'VERIFICATION_INVALID',
        message: '이메일과 인증 코드를 입력해주세요',
        details: '인증 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    if (emailVerificationCodes[email] !== code) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'VERIFICATION_FAILED',
        message: '인증 코드가 일치하지 않습니다',
        details: '인증 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    delete emailVerificationCodes[email];

    return HttpResponse.json(null, { status: 200 });
  }),

  http.post('/api/user/join', async ({ request }) => {
    const body = (await request.json()) as UserJoinDTO & {
      verificationCode: string;
    };
    const { email, password, nickname, checkPassword } = body;

    if (!email || !password || !nickname || !checkPassword) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'JOIN_INVALID',
        message: '필수 정보가 누락되었습니다',
        details: '회원가입 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    if (password !== checkPassword) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'PASSWORD_FAILED',
        message: '비밀번호가 일치하지 않습니다.',
        details: '회원가입 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'JOIN_FAILED',
        message: '이미 존재하는 이메일입니다',
        details: '회원가입 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    const newUser = {
      userId: faker.string.uuid(),
      email,
      password,
      nickname,
      profilePath: null,
      description: null,
      role: 'USER' as const
    };
    mockUsers.push(newUser);

    delete emailVerificationCodes[email];

    return HttpResponse.json(newUser, { status: 201 });
  }),

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

    return HttpResponse.json(
      {
        authentication: 'Bearer',
        access_token: faker.string.uuid(),
        refresh_token: faker.string.uuid()
      },
      { status: 200 }
    );
  }),

  http.get('/api/user/:userId', ({ params }) => {
    const { userId } = params;

    if (!userId) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'USER_INVALID',
        message: '유효한 사용자 ID를 입력해주세요',
        details: '회원 정보 조회 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    const user = mockUsers.find(u => u.userId === userId);

    if (!user) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'USER_NOT_FOUND',
        message: '해당 사용자를 찾을 수 없습니다',
        details: '회원 정보 조회 실패'
      };
      return HttpResponse.json(errorResponse, { status: 404 });
    }

    return HttpResponse.json(
      {
        userId: user.userId,
        email: user.email,
        nickname: user.nickname,
        profile_image: user.profile_image,
        description: user.description,
        role: user.role
      },
      { status: 200 }
    );
  })
];
