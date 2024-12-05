import { api } from '@/shared/api/client';
import axios from 'axios';
import type {
  UserLoginDTO,
  UserJoinDTO,
  ChangePasswordDTO,
  ErrorResponseDTO
} from '@/api/generated';
import { SocialProvider } from '../model/store/authStore';

export const userService = {
  login: async (loginData: UserLoginDTO) => {
    if (!loginData.email) {
      throw new Error('이메일을 입력해주세요.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      throw new Error('유효하지 않은 이메일 형식입니다.');
    }

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
  socialLogin: async (provider: SocialProvider) => {
    try {
      const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${provider}`;
      window.location.href = redirectUrl;

      return null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(
          errorResponse?.message || '소셜 로그인에 실패했습니다.'
        );
      }
      throw error;
    }
  },

  join: async (joinData: UserJoinDTO) => {
    if (!joinData.email) {
      throw new Error('이메일을 입력해주세요.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(joinData.email)) {
      throw new Error('유효하지 않은 이메일 형식입니다.');
    }

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
  changePassword: async (
    userId: string,
    changePasswordData: ChangePasswordDTO
  ) => {
    // 이메일 유효성 검사
    if (!changePasswordData.email) {
      throw new Error('이메일을 입력해주세요.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(changePasswordData.email)) {
      throw new Error('유효하지 않은 이메일 형식입니다.');
    }

    // 비밀번호 유효성 검사
    if (
      !changePasswordData.changePassword ||
      changePasswordData.changePassword.length < 6
    ) {
      throw new Error('비밀번호는 최소 6자 이상이어야 합니다.');
    }

    // 비밀번호 확인 검사
    if (
      changePasswordData.changePassword !==
      changePasswordData.checkChangePassword
    ) {
      throw new Error('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

    try {
      const response = await api.user.changePassword(
        userId,
        changePasswordData
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
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(
          errorResponse?.message || '회원 정보 조회에 실패했습니다.'
        );
      }
      throw error;
    }
  },

  updateNickname: async (userId: string, nickname: string) => {
    try {
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

  updateDescription: async (userId: string, description: string) => {
    try {
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
  },
  updateProfileImage: async (userId: string, file: File) => {
    try {
      if (!file) {
        throw new Error('프로필 사진 파일을 선택해주세요.');
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('파일 크기는 5MB를 초과할 수 없습니다.');
      }

      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('JPG, PNG 형식의 이미지만 업로드 가능합니다.');
      }

      // 이미지 등록 테스트 랜덤 이미지 출력
      const fallbackImages = [
        'https://via.placeholder.com/150',
        'https://picsum.photos/200/300',
        '/default-profile.png'
      ];

      const randomImageUrl =
        fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

      const formData = new FormData();
      formData.append('multipartFile', file);

      await api.user.changeProfile(userId, file);

      // 실제 이미지 파일 등록 시 반환
      //     const response = await api.user.changeProfile(userId, file);
      //     return response.data;
      return {
        userId,
        profile_image: randomImageUrl
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(
          errorResponse?.message || '프로필 사진 변경에 실패했습니다.'
        );
      }
      throw error;
    }
  },
  deleteUser: async (userId: string) => {
    try {
      if (!userId) {
        throw new Error('사용자 ID가 없습니다.');
      }

      const response = await api.user.deleteUser(userId);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponseDTO;
        throw new Error(errorResponse?.message || '회원 탈퇴에 실패했습니다.');
      }
      throw error;
    }
  }
};
