import { api } from '@/shared/api/client';
import axios from 'axios';
import type { ErrorResponseDTO } from '@/shared/api/generated';

export const emailService = {
  // 이메일 인증 코드 발송
  sendCode: async (email: string) => {
    try {
      await api.email.sendCode(email);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(
          errorResponse?.message || '이메일 인증 코드 발송에 실패했습니다.'
        );
      }
      throw error;
    }
  },

  // 이메일 인증 코드 검증
  verifyCode: async (email: string, code: string) => {
    try {
      await api.email.verifyCode(email, code);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(
          errorResponse?.message || '이메일 인증 코드 검증에 실패했습니다.'
        );
      }
      throw error;
    }
  }
};
