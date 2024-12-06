import { useQuery } from '@tanstack/react-query';
import { userService } from '@/entities/User/api/userService';
import { useAuthStore } from './store/authStore';

export const useUserQuery = () => {
  const { userId } = useAuthStore();
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.findMyInformation(userId || ''),
    enabled: !!userId
  });
};
