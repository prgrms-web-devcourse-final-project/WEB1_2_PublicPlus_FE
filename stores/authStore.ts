import { LoginResponse } from '@/mocks/types/UserTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: {
    userId: string;
    email: string;
    nickname: string;
  } | null;
  tokens: {
    access_token: string | null;
    refresh_token: string | null;
  };
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      tokens: {
        access_token: null,
        refresh_token: null
      },
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password
            })
          });

          const data: LoginResponse = await response.json();

          if (response.ok) {
            set({
              user: data.user,
              tokens: {
                access_token: data.access_token,
                refresh_token: data.refresh_token
              },
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            return true;
          } else {
            set({
              isAuthenticated: false,
              isLoading: false,
              error: data.message || '로그인 실패'
            });
            return false;
          }
        } catch (error) {
          set({
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : '알 수 없는 오류'
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          tokens: {
            access_token: null,
            refresh_token: null
          },
          isAuthenticated: false,
          error: null
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
