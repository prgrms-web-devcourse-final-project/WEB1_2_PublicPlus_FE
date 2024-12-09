import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { mockUsers } from '../data/userData';
import {
  UserLoginDTO,
  UserJoinDTO,
  ErrorResponseDTO,
  UserChangeInfoDTO,
  ChangePasswordDTO
} from '@/shared/api/generated';

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
  // 소셜로그인
  http.get('/api/oauth2/:provider', ({ params }) => {
    const { provider } = params;
    const allowedProviders = ['kakao', 'google', 'naver'];

    if (!allowedProviders.includes(provider as string)) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'OAUTH_INVALID_PROVIDER',
        message: '유효하지 않은 소셜 로그인 제공자입니다.',
        details: '소셜 로그인 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    return HttpResponse.json(
      {
        userId: '999e1234-e12b-34c5-a456-567801236547',
        authentication: 'Bearer',
        access_token: faker.string.uuid(),
        refresh_token: faker.string.uuid()
      },
      { status: 200 }
    );
  }),

  // 회원가입
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
  // 토큰 재발급
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
  // 회원정보 조회
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

    // 사용자 정보 반환
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
  }),
  // 닉네임 변경
  http.patch('/api/user/nickname/:userId', async ({ request, params }) => {
    const { userId } = params;
    const body = (await request.json()) as UserChangeInfoDTO;
    const { nickname } = body;

    const nicknameRegex = /^[가-힣a-z0-9]{2,10}$/;
    if (!nickname || !nicknameRegex.test(nickname)) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'NICKNAME_INVALID',
        message: '닉네임은 2~10자 사이의 한글, 영어 소문자, 숫자만 가능합니다.',
        details: '닉네임 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    const userIndex = mockUsers.findIndex(u => u.userId === userId);
    if (userIndex === -1) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'USER_NOT_FOUND',
        message: '해당 사용자를 찾을 수 없습니다',
        details: '닉네임 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 404 });
    }

    mockUsers[userIndex].nickname = nickname;

    return HttpResponse.json(
      {
        userId: userId,
        nickname: nickname
      },
      { status: 200 }
    );
  }),

  // 소개글 변경
  http.patch('/api/user/description/:userId', async ({ request, params }) => {
    const { userId } = params;
    const body = (await request.json()) as UserChangeInfoDTO;
    const { description } = body;

    if (description && description.length > 200) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'DESCRIPTION_INVALID',
        message: '소개글은 200자 이내로 작성해주세요.',
        details: '소개글 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    const userIndex = mockUsers.findIndex(u => u.userId === userId);
    if (userIndex === -1) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'USER_NOT_FOUND',
        message: '해당 사용자를 찾을 수 없습니다',
        details: '소개글 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 404 });
    }

    mockUsers[userIndex].description = description || null;

    return HttpResponse.json(
      {
        userId: userId,
        description: description
      },
      { status: 200 }
    );
  }),
  // 프로필 사진 변경
  http.post('/api/user/profile/:userId', async ({ request, params }) => {
    const { userId } = params;
    const body = await request.formData();
    const multipartFile = body.get('multipartFile') as File | null;

    const userIndex = mockUsers.findIndex(u => u.userId === userId);
    if (userIndex === -1) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'USER_NOT_FOUND',
        message: '해당 사용자를 찾을 수 없습니다',
        details: '프로필 사진 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 404 });
    }

    if (!multipartFile || !(multipartFile instanceof File)) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'FILE_INVALID',
        message: '유효한 파일을 업로드해주세요',
        details: '프로필 사진 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    if (multipartFile.size > 5 * 1024 * 1024) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'FILE_SIZE_EXCEEDED',
        message: '파일 크기는 5MB를 초과할 수 없습니다',
        details: '프로필 사진 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(multipartFile.type)) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'FILE_TYPE_INVALID',
        message: 'JPG, PNG 형식의 이미지만 업로드 가능합니다',
        details: '프로필 사진 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    // 대체 이미지 URL 목록
    const fallbackImages = [
      'https://via.placeholder.com/150',
      'https://picsum.photos/200/300',
      '/default-profile.png'
    ];

    // 랜덤 대체 이미지 선택
    const randomImageUrl =
      fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

    // 사용자 프로필 이미지를 랜덤 대체 이미지로 업데이트
    mockUsers[userIndex].profile_image = randomImageUrl;

    return HttpResponse.json(
      {
        userId: userId,
        profile_image: randomImageUrl
      },
      { status: 200 }
    );
  }),
  // 회원 탈퇴
  http.delete('/api/user/:userId', ({ params }) => {
    const { userId } = params;

    if (!userId) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'USER_INVALID',
        message: '유효한 사용자 ID를 입력해주세요',
        details: '회원 탈퇴 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    const userIndex = mockUsers.findIndex(u => u.userId === userId);
    if (userIndex === -1) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'USER_NOT_FOUND',
        message: '해당 사용자를 찾을 수 없습니다',
        details: '회원 탈퇴 실패'
      };
      return HttpResponse.json(errorResponse, { status: 404 });
    }

    mockUsers.splice(userIndex, 1);

    return HttpResponse.json({ message: '회원 탈퇴 완료' }, { status: 200 });
  }),
  // 비밀번호 변경
  http.patch(`/api/user/password/:userId`, async ({ request, params }) => {
    const { userId } = params;
    const body = (await request.json()) as ChangePasswordDTO;
    const { email, changePassword, checkChangePassword } = body;

    // 필수 정보 누락 검증
    if (!email || !changePassword || !checkChangePassword || !userId) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'PASSWORD_CHANGE_INVALID',
        message: '필수 정보가 누락되었습니다',
        details: '비밀번호 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    // 비밀번호 일치 검증
    if (changePassword !== checkChangePassword) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'PASSWORD_MISMATCH',
        message: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다',
        details: '비밀번호 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    // 비밀번호 길이 검증
    if (changePassword.length < 6) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'PASSWORD_TOO_SHORT',
        message: '비밀번호는 최소 6자 이상이어야 합니다',
        details: '비밀번호 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    // 사용자 존재 여부 확인
    const userIndex = mockUsers.findIndex(
      u => u.email === email && u.userId === userId
    );

    if (userIndex === -1) {
      const errorResponse: ErrorResponseDTO = {
        errorCode: 'USER_NOT_FOUND',
        message: '해당 사용자를 찾을 수 없습니다',
        details: '비밀번호 변경 실패'
      };
      return HttpResponse.json(errorResponse, { status: 404 });
    }

    // 비밀번호 업데이트
    mockUsers[userIndex].password = changePassword;

    return HttpResponse.json(
      {
        userId: mockUsers[userIndex].userId,
        message: '비밀번호가 성공적으로 변경되었습니다'
      },
      { status: 200 }
    );
  })
];
