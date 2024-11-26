import { LoginResponse } from '@/mocks/types/UserTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 인증 상태의 타입 정의
interface AuthState {
  // 사용자 정보 (비밀번호 제외)
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  token: string | null; // 인증 토큰
  isAuthenticated: boolean; // 로그인 상태
  isLoading: boolean; // 로딩 상태
  error: string | null; // 에러 메시지

  // 로그인, 로그아웃 메서드 정의
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태 설정
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // 로그인 메서드
      login: async (email: string, password: string) => {
        // 로그인 시작: 로딩상태 설정, 이전에러 초기화
        set({ isLoading: true, error: null });

        try {
          // 로그인 api
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });

          // API 응답
          const data: LoginResponse = await response.json();

          // 로그인 성공 처리
          if (response.ok) {
            set({
              user: data.user,
              token: data.accessToken,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            return true;
          } else {
            // 로그인 실패 처리
            set({
              isAuthenticated: false,
              isLoading: false,
              // 에러 메세지 설정
              error: data.message || '로그인 실패'
            });
            return false;
          }
        } catch (error) {
          // 에러 예외처리
          set({
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : '알 수 없는 오류'
          });
          return false;
        }
      },

      // 로그아웃 메서드
      logout: async () => {
        // 로그아웃 시작: 로딩상태 설정
        set({ isLoading: true, error: null });

        try {
          // 로그아웃 API 호출 (현재 토큰 사용)
          await fetch('api/logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${get().token}`
            }
          });
        } catch (error) {
          // 로그아웃 실패 처리
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : '로그아웃 실패'
          });
        }
      }
    }),
    {
      // persist 설정
      name: 'auth-storage', // localStorage 키 이름
      partialize: state => ({
        // 저장할 상태 선택 (사용자 정보와 토큰만 유지)
        user: state.user,
        token: state.token
      })
    }
  )
);
