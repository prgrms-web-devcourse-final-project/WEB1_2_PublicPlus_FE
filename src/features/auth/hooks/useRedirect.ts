import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
