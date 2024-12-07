import Link from 'next/link';

interface CreateMeetingButtonProps {
  className?: string;
}

export const CreateMeetingButton = ({
  className = ''
}: CreateMeetingButtonProps) => {
  return (
    <div
      className={`sticky bottom-[80px] z-[90] mx-auto w-full bg-white px-6 ${className}`}>
      <Link
        href="/meeting/create"
        className="block">
        <button className="w-full rounded-lg bg-blue-500 py-3 font-bold text-white transition-colors hover:bg-blue-600">
          모임 생성하기
        </button>
      </Link>
    </div>
  );
};
