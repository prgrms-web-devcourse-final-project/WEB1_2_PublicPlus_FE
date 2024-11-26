interface PasswordConfirmFieldProps {
  passwordConfirm: string;
  setPasswordConfirm: (value: string) => void;
  error?: string;
}

export function PasswordConfirmField({
  passwordConfirm,
  setPasswordConfirm,
  error
}: PasswordConfirmFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm">비밀번호 확인</label>
      <div className="flex gap-2">
        <input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          className={`flex-1 rounded-lg border p-3 ${
            error ? 'border-red-500' : ''
          }`}
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
        />
      </div>
      {error && passwordConfirm && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
