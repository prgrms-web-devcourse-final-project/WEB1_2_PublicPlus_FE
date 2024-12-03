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
  },

  // 회원 정보 조회
  findMyInformation: async (userId: string) => {
    try {
      if (!userId) {
        throw new Error('사용자 ID가 없습니다.');
      }

      const response = await api.user.findMyInformation(userId);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error); // 에러 상세 로깅
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(
          errorResponse?.message || '회원 정보 조회에 실패했습니다.'
        );
      }
      throw error;
    }
  },

  // 닉네임 변경 메서드 추가
  updateNickname: async (userId: string, nickname: string) => {
    try {
      // 닉네임 유효성 검사 (2~10자, 한글, 영어 소문자, 숫자만 허용)
      const nicknameRegex = /^[가-힣a-z0-9]{2,10}$/;
      if (!nickname) {
        throw new Error('닉네임을 입력해주세요.');
      }

      if (!nicknameRegex.test(nickname)) {
        throw new Error(
          '닉네임은 2~10자 사이의 한글, 영어 소문자, 숫자만 가능합니다.'
        );
      }

      const response = await api.user.updateNickname(userId, { nickname });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(
          errorResponse?.message || '닉네임 변경에 실패했습니다.'
        );
      }
      throw error;
    }
  },

  // 소개글 변경 메서드 추가
  updateDescription: async (userId: string, description: string) => {
    try {
      // 소개글 길이 제한 (예: 최대 200자)
      if (description && description.length > 200) {
        throw new Error('소개글은 200자 이내로 작성해주세요.');
      }

      const response = await api.user.updateDescription(userId, {
        description
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(
          errorResponse?.message || '소개글 변경에 실패했습니다.'
        );
      }
      throw error;
    }
  }
};
