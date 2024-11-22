interface ChatInputProps {
  value: string; // 입력된 메시지의 현재 값
  onChange: (value: string) => void; // 입력값 변경 시 호출되는 함수
  onSend: () => void; // 메시지 전송 시 호출되는 함수
}
export const ChatInput = ({ value, onChange, onSend }: ChatInputProps) => (
  <div className="flex items-center gap-2 border-t bg-white p-4">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="메시지를 입력하세요"
      className="form-input h-10 flex-1 rounded-full bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <button
      onClick={onSend}
      disabled={!value.trim()}
      className="form-input h-10 w-10 rounded-full bg-primary text-white disabled:opacity-50">
      전송
    </button>
  </div>
);
