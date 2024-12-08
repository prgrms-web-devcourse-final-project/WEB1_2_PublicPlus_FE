import { Button } from '@/shared/ui/components/button/Button';

interface EmailInputProps {
  email: string;
  setEmail: (value: string) => void;
}

export function EmailInput({ email, setEmail }: EmailInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm">이메일 아이디</label>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="이메일을 입력해주세요."
          className="flex-1 rounded border p-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button
          variant="line"
          className="whitespace-nowrap">
          이메일 인증
        </Button>
      </div>
    </div>
  );
}
