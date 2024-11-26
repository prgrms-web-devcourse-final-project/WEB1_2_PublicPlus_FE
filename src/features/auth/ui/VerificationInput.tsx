import { Button } from '@/components/common/Button/Button';

interface VerificationInputProps {
  verificationCode: string;
  setVerificationCode: (value: string) => void;
}

export function VerificationInput({
  verificationCode,
  setVerificationCode
}: VerificationInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm">인증코드</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="인증코드를 입력해주세요."
          className="flex-1 rounded border p-3"
          value={verificationCode}
          onChange={e => setVerificationCode(e.target.value)}
        />
        <Button variant="line">인증 요청</Button>
      </div>
    </div>
  );
}
