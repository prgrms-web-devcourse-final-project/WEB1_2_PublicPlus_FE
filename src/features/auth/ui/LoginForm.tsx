import { Button } from '@/components/common/Button/Button';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
}

export default function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin
}: LoginFormProps) {
  return (
    <div className="py-8">
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={e => onEmailChange(e.target.value)}
        className="form-input mb-4 w-full rounded border p-3"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => onPasswordChange(e.target.value)}
        className="form-input mb-4 w-full rounded border p-3"
      />
      <div onClick={onLogin}>
        <Button
          size="md"
          fullWidth>
          로그인
        </Button>
      </div>
    </div>
  );
}
