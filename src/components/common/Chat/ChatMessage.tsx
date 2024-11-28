import Image from 'next/image';
interface ChatMessageProps {
  message: string;
  timestamp: string;
  isMine: boolean;
  profileImage?: string;
  username?: string;
}
export const ChatMessage = ({
  message,
  timestamp,
  isMine,
  profileImage = '/jjang.jpeg',
  username = '왕짱구'
}: ChatMessageProps) => (
  <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-4`}>
    {!isMine && (
      <div className="mr-2 self-end">
        <Image
          width={24}
          height={24}
          src={profileImage}
          alt={`${username} 프로필`}
          className="h-10 w-10 rounded-full object-cover"
        />
      </div>
    )}
    <div className="flex max-w-[280px] max-w-[70%] flex-col">
      {!isMine && (
        <span className="mb-1 text-sm text-gray-600">{username}</span>
      )}
      <div
        className={`px-4 py-2 ${
          isMine
            ? 'self-end rounded-xl rounded-br-none bg-blue-500 text-white'
            : 'self-start rounded-xl rounded-bl-none bg-gray-100 text-gray-900'
        }`}>
        <p className="overflow-wrap-break-word whitespace-pre-wrap break-words">
          {message}
        </p>
        <span className="mt-1 block text-right text-xs opacity-70">
          {timestamp}
        </span>
      </div>
    </div>
  </div>
);
