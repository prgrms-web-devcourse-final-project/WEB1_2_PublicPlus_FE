interface CreateMeetingButtonProps {
  className?: string;
}

export const CreateMeetingButton = ({
  className = ''
}: CreateMeetingButtonProps) => {
  return (
    <div
      className={`sticky bottom-[80px] mx-auto w-full max-w-[600px] bg-white pl-[1.5rem] pr-[1.5rem] ${className}`}>
      <button className="w-full rounded-lg bg-blue-500 py-3 font-bold text-white">
        모임 생성하기
      </button>
    </div>
  );
};
