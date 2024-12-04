import { SocialProvider } from '@/entities/User';
import { SOCIAL_PROVIDERS } from '../model/constants';
import Image from 'next/image';

export function SocialLoginButton({
  provider,
  onLogin
}: {
  provider: (typeof SOCIAL_PROVIDERS)[number];
  onLogin: (provider: SocialProvider) => void;
}) {
  return (
    <button
      className="rounded-full p-2 hover:bg-gray-50"
      onClick={() => onLogin(provider.name as SocialProvider)}>
      <Image
        width={40}
        height={40}
        alt={provider.alt}
        src={provider.icon}
        className="transition-transform hover:scale-105"
      />
    </button>
  );
}
