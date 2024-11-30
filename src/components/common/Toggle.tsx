interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
  className?: string; // 추가된 className prop
}

export const Toggle = ({ isOn, onToggle, className = '' }: ToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={`relative aspect-[1.75/1] w-full rounded-full transition-colors duration-300 ${
        isOn ? 'bg-blue-500' : 'bg-gray-300'
      } ${className}`}>
      <span
        className={`absolute left-[5%] top-[10%] aspect-square h-[80%] transform rounded-full bg-white transition-transform duration-300 ${
          isOn ? 'translate-x-[90%]' : 'translate-x-0'
        }`}
      />
    </button>
  );
};
