import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { mockUsers } from '../data/userData';
import { UserLoginDTO, UserJoinDTO, ErrorResponseDTO } from '@/api/generated';

// 이메일 인증 코드 저장소
const emailVerificationCodes: Record<string, string> = {};

export const authHandlers = [
  // 로그인 핸들러
  http.post('/api/user/login', async ({ request }) => {
    const body = (await request.json()) as UserLoginDTO;
    const { email, password } = body;

    // 필수 필드 검증
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

  // 이메일 인증 코드 발송 핸들러
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

    // 6자리 인증 코드 생성
    const verificationCode = faker.string.numeric(6);

    // 이메일별 인증 코드 저장
    emailVerificationCodes[email] = verificationCode;
    console.log(`Verification code for ${email}: ${verificationCode}`);

    return HttpResponse.json(null, { status: 200 });
  }),

  // 이메일 인증 코드 검증 핸들러
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

    // 저장된 인증 코드와 일치 여부 확인
    if (emailVerificationCodes[email] !== code) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'VERIFICATION_FAILED',
        message: '인증 코드가 일치하지 않습니다',
        details: '인증 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    // 인증 성공 후 코드 삭제
    delete emailVerificationCodes[email];

    return HttpResponse.json(null, { status: 200 });
  }),

  // 회원가입 핸들러 수정 (이메일 인증 추가)
  http.post('/api/user/join', async ({ request }) => {
    const body = (await request.json()) as UserJoinDTO & {
      verificationCode: string;
    };
    const { email, password, nickname, checkPassword } = body;

    // 필수 필드
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

    // 기존 이메일 중복 검사
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

    // 인증 코드 삭제
    delete emailVerificationCodes[email];

    return HttpResponse.json(newUser, { status: 201 });
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

    return HttpResponse.json(
      {
        authentication: 'Bearer',
        access_token: faker.string.uuid(),
        refresh_token: faker.string.uuid()
      },
      { status: 200 }
    );
  }), // 회원정보 조회 핸들러 추가
  http.get('/api/user/:userId', ({ params }) => {
    const { userId } = params;

    // userId가 제공되지 않은 경우 에러 응답
    if (!userId) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'USER_INVALID',
        message: '유효한 사용자 ID를 입력해주세요',
        details: '회원 정보 조회 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    // mockUsers에서 해당 userId를 가진 사용자 찾기
    const user = mockUsers.find(u => u.userId === userId);

    // 사용자를 찾지 못한 경우 에러 응답
    if (!user) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'USER_NOT_FOUND',
        message: '해당 사용자를 찾을 수 없습니다',
        details: '회원 정보 조회 실패'
      };
      return HttpResponse.json(errorResponse, { status: 404 });
    }

    // 사용자 정보 반환 (비밀번호 제외)
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
