export interface User {
  userId: string;
  email: string;
  password: string;
  name: string;
  nickname: string;
  profilePath: string;
  description: string;
  role: 'USER' | 'ADMIN';
}

export interface LoginResponse {
  bearer: string;
  access_token: string;
  refresh_token: string;
  user: {
    userId: string;
    email: string;
    nickname: string;
  };
  message?: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
}

export interface EmailVerificationRequest {
  email: string;
}

export interface ProfileUpdateRequest {
  nickname?: string;
  description?: string;
}
