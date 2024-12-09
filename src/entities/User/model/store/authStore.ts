import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { UserJoinDTO, UserLoginDTO } from '@/shared/api/generated';
import type { AuthState } from '../types/AuthState';
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
      socialLogin: async (provider: SocialProvider, state?: string) => {
        try {
          const authorizationUrl = state
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/oauth2/${provider}?state=${encodeURIComponent(state)}`
            : `${process.env.NEXT_PUBLIC_API_URL}/api/oauth2/${provider}`;

          window.location.href = authorizationUrl;
          return true;
        } catch (error) {
          set({
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : '소셜 로그인 실패'
          });
          return false;
        }
      },
      kakaoLogin: async (state: string) => {
        try {
          const authorizationUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/oauth2/kakao?state=${encodeURIComponent(state)}`;
          window.location.href = authorizationUrl;
          return true;
        } catch (error) {
          set({
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : '카카오 로그인 실패'
          });
          return false;
        }
      },
      socialLoginComplete: async (loginResponse: {
        authentication: string;
        accessToken?: string;
        refreshToken?: string;
        userId: string;
      }) => {
        // 키 이름 유연하게 처리
        const access_token = loginResponse.accessToken;
        const refresh_token = loginResponse.refreshToken;

        // 쿠키에 사용자 토큰 정보 저장
        document.cookie = `auth-storage=${JSON.stringify({
          state: {
            userId: loginResponse.userId,
            tokens: {
              access_token,
              refresh_token
            },
            isAuthenticated: true
          }
        })}; path=/; secure; samesite=strict; max-age=86400`;

        // 로컬 스토리지에 사용자 정보 저장
        localStorage.setItem(
          'auth-storage',
          JSON.stringify({
            userId: loginResponse.userId,
            tokens: {
              access_token,
              refresh_token
            },
            isAuthenticated: true
          })
        );

        // Zustand 스토어 상태 업데이트
        set({
          userId: loginResponse.userId,
          tokens: {
            access_token,
            refresh_token
          },
          isAuthenticated: true,
          isLoading: false,
          error: null
        });

        return true;
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
