interface CreateMeetingButtonProps {
  className?: string;
}

export const CreateMeetingButton = ({
  className = ''
}: CreateMeetingButtonProps) => {
  return (
    <div
      className={`fixed bottom-[80px] left-0 w-full bg-white pl-[1.5rem] pr-[1.5rem] ${className}`}>
      <button className="w-full rounded-lg bg-blue-500 py-3 font-bold text-white">
        모임 생성하기
      </button>
    </div>
  );
};
