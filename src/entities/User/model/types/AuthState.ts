import { SocialProvider } from '../store/authStore';
import { LoginResponse, UserLoginDTO } from './UserLogin';
import { UserJoinDTO } from './UserSignup';

export interface AuthState {
  userId: string | null;
  tokens: {
    access_token: string | null;
    refresh_token: string | null;
  };
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (loginData: UserLoginDTO) => Promise<boolean>;
  socialLogin: (provider: SocialProvider) => Promise<boolean>;
  join: (joinData: UserJoinDTO) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  deleteUser: () => Promise<boolean>;
  socialLoginComplete: (loginResponse: LoginResponse) => Promise<boolean>;
}
