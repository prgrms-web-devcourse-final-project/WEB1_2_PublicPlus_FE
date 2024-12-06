import { useQuery } from '@tanstack/react-query';
import { userService } from '@/entities/User/api/userService';
import { useAuthStore } from './store/authStore';
import { UserType } from './types/User';

export const useUserQuery = () => {
  const { userId } = useAuthStore();
  return useQuery<UserType>({
    queryKey: ['user', userId],
    queryFn: () => userService.findMyInformation(userId || ''),
    enabled: !!userId
  });
};
