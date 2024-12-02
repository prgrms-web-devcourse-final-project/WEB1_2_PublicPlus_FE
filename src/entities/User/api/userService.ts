import { api } from '@/shared/api/client';
import axios from 'axios';
import type {
  UserLoginDTO,
  UserJoinDTO,
  ChangePasswordDTO,
  ErrorResponseDTO
} from '@/api/generated';

export const userService = {
  // 로그인
  login: async (loginData: UserLoginDTO) => {
    // 이메일 유효성 검사
    if (!loginData.email) {
      throw new Error('이메일을 입력해주세요.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      throw new Error('유효하지 않은 이메일 형식입니다.');
    }

    // 비밀번호 길이 검사
    if (!loginData.password || loginData.password.length < 6) {
      throw new Error('비밀번호는 최소 6자 이상이어야 합니다.');
    }

    try {
      const response = await api.user.login(loginData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(errorResponse?.message || '로그인에 실패했습니다.');
      }
      throw error;
    }
  },

  // 회원가입
  join: async (joinData: UserJoinDTO) => {
    if (!joinData.email) {
      throw new Error('이메일을 입력해주세요.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(joinData.email)) {
      throw new Error('유효하지 않은 이메일 형식입니다.');
    }

    // 비밀번호 유효성 검사
    if (!joinData.password || joinData.password.length < 6) {
      throw new Error('비밀번호는 최소 6자 이상이어야 합니다.');
    }

    try {
      const response = await api.user.join(joinData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(errorResponse?.message || '회원가입에 실패했습니다.');
      }
      throw error;
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      await api.user.logout();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(errorResponse?.message || '로그아웃에 실패했습니다.');
      }
      throw error;
    }
  },

  // 비밀번호 변경
  changePassword: async (passwordData: ChangePasswordDTO) => {
    try {
      const response = await api.user.changePassword(
        passwordData.email || '',
        passwordData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(
          errorResponse?.message || '비밀번호 변경에 실패했습니다.'
        );
      }
      throw error;
    }
  },

  // 토큰 재발급
  refreshToken: async () => {
    try {
      const response = await api.user.resignAccessTokenByHeader();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(
          errorResponse?.message || '토큰 재발급에 실패했습니다.'
        );
      }
      throw error;
    }
  }
};
