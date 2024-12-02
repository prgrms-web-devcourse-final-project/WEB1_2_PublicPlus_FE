import { useQuery } from '@tanstack/react-query';
import { userService } from '@/entities/User/api/userService';
import { useAuthStore } from './store/authStore';
import { UserInformation } from '@/features/mypage/types';

export const useUserQuery = () => {
  const { userId } = useAuthStore();
  return useQuery<UserInformation>({
    queryKey: ['user', userId],
    queryFn: () => userService.findMyInformation(userId || ''),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    refetchOnWindowFocus: false
  });
};
