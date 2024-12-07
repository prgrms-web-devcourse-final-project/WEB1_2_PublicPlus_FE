import { api } from '@/shared/api/client';

export const likeService = {
  addLikeService: async (facilityId: string, tokens: string) => {
    // tokens가 객체라면 토큰을 추출합니다.
    console.log('토큰: ', tokens, '좋아요한 시설 아이디: ', facilityId);
    await api.facilityLike.addlike(facilityId, {
      headers: {
        Authorization: `Bearer ${tokens}`
      }
    });
  },

  removeLikeService: async (facilityId: string, tokens: string) => {
    // tokens가 객체라면 토큰을 추출합니다.
    console.log('토큰: ', tokens, '좋아요 취소한 시설 아이디: ', facilityId);
    await api.facilityLike.dislike(facilityId, {
      headers: {
        Authorization: `Bearer ${tokens}`
      }
    });
  }
};
