import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useRedirect(
  isAuthenticated: boolean,
  userId: string | null,
  tokens: { access_token: string | null }
) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && userId && tokens.access_token) {
      router.push('/');
    }
  }, [isAuthenticated, userId, tokens.access_token, router]);
}
