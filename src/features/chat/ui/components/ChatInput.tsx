import Image from 'next/image';
interface ChatInputProps {
  value: string; // 입력된 메시지의 현재 값
  onChange: (value: string) => void; // 입력값 변경 시 호출되는 함수
  onSend: () => void; // 메시지 전송 시 호출되는 함수
}
export const ChatInput = ({ value, onChange, onSend }: ChatInputProps) => (
  <div className="flex items-center gap-2 bg-white pt-4">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="메시지를 입력하세요"
      className="form-input h-16 flex-1 rounded-full bg-gray-100 px-4 text-m focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <button
      onClick={onSend}
      disabled={!value.trim()}
      className="form-input h-16 w-16 rounded-full bg-primary text-white disabled:opacity-50">
      <Image
        width={24}
        height={24}
        src={'/icons/send.png'}
        alt="보내기"
      />
    </button>
  </div>
);
