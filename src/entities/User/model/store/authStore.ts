import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { UserJoinDTO, UserLoginDTO } from '@/shared/api/generated';
import { AuthState } from '../types/AuthState';
import { userService } from '../../api/userService';

export type SocialProvider = 'kakao' | 'google' | 'naver';

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
          const response = await userService.login(loginData);

          document.cookie = `auth-storage=${JSON.stringify({
            state: {
              userId: response.userId,
              tokens: {
                access_token: response.accessToken,
                refresh_token: response.refreshToken
              },
              isAuthenticated: true
            }
          })}; path=/; secure; samesite=strict; max-age=86400`;

          set({
            userId: response.userId,
            tokens: {
              access_token: response.accessToken ?? null,
              refresh_token: response.refreshToken ?? null
            },
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          return true;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : '로그인 실패';

          set({
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage
          });
          return false;
        }
      },
      // 소셜 로그인
      socialLogin: async (provider: SocialProvider) => {
        set({ isLoading: true, error: null });

        try {
          const response = await userService.socialLogin(provider);

          document.cookie = `auth-storage=${JSON.stringify({
            state: {
              userId: response.userId,
              tokens: {
                access_token: response.access_token,
                refresh_token: response.refresh_token
              },
              isAuthenticated: true
            }
          })}; path=/; secure; samesite=strict; max-age=86400`;

          set({
            userId: response.userId,
            tokens: {
              access_token: response.access_token ?? null,
              refresh_token: response.refresh_token ?? null
            },
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          return true;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : '소셜 로그인 실패';

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
          await userService.join(joinData);
          set({ isLoading: false, error: null });
          return true;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : '회원가입 실패';

          set({
            isLoading: false,
            error: errorMessage
          });
          return false;
        }
      },

      logout: async () => {
        try {
          set({
            userId: null,
            tokens: {
              access_token: null,
              refresh_token: null
            },
            isAuthenticated: false,
            error: null
          });

          document.cookie.split(';').forEach(c => {
            document.cookie = c
              .replace(/^ +/, '')
              .replace(
                /=.*/,
                '=;expires=' + new Date().toUTCString() + ';path=/'
              );
          });
        } catch (error) {
          console.error('Logout failed', error);
        }
      },

      refreshToken: async () => {
        const { tokens } = get();

        if (!tokens.refresh_token) return false;

        try {
          const response = await userService.refreshToken();

          set(state => ({
            tokens: {
              ...state.tokens,
              access_token: response.accessToken ?? state.tokens.access_token
            }
          }));

          return true;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : '토큰 재발급 실패';

          set({
            error: errorMessage
          });

          get().logout();
          return false;
        }
      },
      deleteUser: async () => {
        const { userId } = get(); // 현재 로그인된 사용자의 ID 가져오기

        if (!userId) {
          set({ error: '로그인된 사용자 정보가 없습니다.' });
          return false;
        }

        set({ isLoading: true, error: null });

        try {
          await userService.deleteUser(userId);

          set({
            userId: null,
            tokens: {
              access_token: null,
              refresh_token: null
            },
            isAuthenticated: false,
            error: null
          });

          document.cookie.split(';').forEach(c => {
            document.cookie = c
              .replace(/^ +/, '')
              .replace(
                /=.*/,
                '=;expires=' + new Date().toUTCString() + ';path=/'
              );
          });

          localStorage.removeItem('auth-storage');

          set({ isLoading: false });
          return true;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '회원 탈퇴에 실패했습니다.';

          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false
          });

          return false;
        }
      }
    }),

    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: AuthState) => ({
        userId: state.userId,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
