import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios, { AxiosError } from 'axios';
import { AuthState } from '../types/AuthState';
import { ErrorResponseDTO, UserJoinDTO, UserLoginDTO } from '@/api/generated';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userId: null,
      tokens: {
        access_token: null,
        refresh_token: null
      },
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (loginData: UserLoginDTO) => {
        set({ isLoading: true, error: null });

        try {
          const response = await axios.post<{
            userId: string;
            access_token: string;
            refresh_token: string;
          }>('/api/user/login', loginData);

          // 쿠키에 명시적으로 저장
          document.cookie = `auth-storage=${JSON.stringify({
            state: {
              userId: response.data.userId,
              tokens: {
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token
              },
              isAuthenticated: true
            }
          })}; path=/; secure; samesite=strict; max-age=86400`; // 24시간 유효

          set({
            userId: response.data.userId,
            tokens: {
              access_token: response.data.access_token,
              refresh_token: response.data.refresh_token
            },
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          return true;
        } catch (error) {
          const axiosError = error as AxiosError;
          const errorMessage =
            (axiosError.response?.data as ErrorResponseDTO)?.message ||
            axiosError.message ||
            '로그인 실패';

          set({
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage
          });
          return false;
        }
      },

      join: async (joinData: UserJoinDTO) => {
        set({ isLoading: true, error: null });

        try {
          await axios.post('/api/user/join', joinData);
          set({ isLoading: false, error: null });
          return true;
        } catch (error) {
          const axiosError = error as AxiosError;
          const errorMessage =
            (axiosError.response?.data as ErrorResponseDTO)?.message ||
            axiosError.message ||
            '회원가입 실패';

          set({
            isLoading: false,
            error: errorMessage
          });
          return false;
        }
      },

      logout: () => {
        // 쿠키 삭제
        document.cookie =
          'auth-storage=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';

        set({
          userId: null,
          tokens: {
            access_token: null,
            refresh_token: null
          },
          isAuthenticated: false,
          error: null
        });
      },

      refreshToken: async () => {
        const { tokens } = get();

        if (!tokens.refresh_token) return false;

        try {
          const response = await axios.post<{
            access_token: string;
            refresh_token: string;
          }>(
            '/api/user/refresh/header',
            {},
            {
              headers: {
                Authorization: `Bearer ${tokens.refresh_token}`
              }
            }
          );

          set(state => ({
            tokens: {
              ...state.tokens,
              access_token: response.data.access_token
            }
          }));

          return true;
        } catch (error) {
          const axiosError = error as AxiosError;
          const errorMessage =
            (axiosError.response?.data as ErrorResponseDTO)?.message ||
            axiosError.message ||
            '토큰 재발급 실패';

          set({
            error: errorMessage
          });

          get().logout();
          return false;
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: AuthState) =>
        ({
          userId: state.userId,
          tokens: state.tokens,
          isAuthenticated: state.isAuthenticated
        }) as AuthState
    }
  )
);
