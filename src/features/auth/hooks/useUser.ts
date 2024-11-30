import { useAuthStore } from '../model/store';

export const useUser = () => {
  const { user, setUser, clearUser } = useAuthStore();

  return {
    user,
    isLoggedIn: !!user,
    setUser,
    clearUser
  };
};
