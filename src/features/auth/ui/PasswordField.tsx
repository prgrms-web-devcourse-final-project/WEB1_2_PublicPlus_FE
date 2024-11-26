interface PasswordFieldProps {
  password: string;
  setPassword: (value: string) => void;
  error?: string;
}

export function PasswordField({
  password,
  setPassword,
  error
}: PasswordFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm">비밀번호</label>
      <div className="flex gap-2">
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          className={`flex-1 rounded border p-3 ${
            error ? 'border-red-500' : ''
          }`}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
