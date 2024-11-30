export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  bearer: string;
  access_token: string;
  refresh_token: string;
  userId: string;
}
