export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  user: Omit<User, 'password'>; // password 제외
  message?: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}
