import { useAuthStore } from '@/entities/User';
import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: {
    encode: (param: string) => encodeURIComponent(param)
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const authStorageCookie = Cookies.get('auth-storage');

    const parsedCookie = authStorageCookie ? JSON.parse(authStorageCookie) : '';
    const token = parsedCookie.state.tokens.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Handle 401 error (token expired)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResult = await useAuthStore.getState().refreshToken();

        if (refreshResult) {
          const { tokens } = useAuthStore.getState();
          originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        // 토큰 재발급 실패 시 로그아웃
        console.error('토큰 재발급 중 오류 발생:', error);
        useAuthStore.getState().logout();

        // 클라이언트 사이드에서만 리다이렉트
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
