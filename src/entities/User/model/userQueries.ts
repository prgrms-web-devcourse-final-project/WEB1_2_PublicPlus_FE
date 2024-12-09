import { useQuery } from '@tanstack/react-query';
import { userService } from '@/entities/User/api/userService';
import { UserType } from './types/User';
import { useAuthStore } from './store/authStore';

export const useUserQuery = () => {
  const { userId } = useAuthStore();
  return useQuery<UserType>({
    queryKey: ['user', userId],
    queryFn: () => userService.findMyInformation(userId || ''),
    enabled: !!userId
  });
};
