'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/components/button/Button';
import { useChangePassword } from '@/features/mypage/hooks/useChangePassword';

export default function EditPasswordForm() {
  const router = useRouter();
  const {
    email,
    password,
    setPassword,
    checkPassword,
    setCheckPassword,
    verificationCode,
    setVerificationCode,
    step,
    error,
    handleEmailSubmit,
    handleVerificationSubmit,
    handlePasswordChange,
    remainingTime,
    timerActive,
    formatTime
  } = useChangePassword(router);

  return (
    <div className="item-center mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center space-y-6 p-6">
      {error && <div className="text-xs text-red-500">{error}</div>}

      {step === 'email' && (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleEmailSubmit();
          }}
          className="space-y-8">
          <div>회원 이메일</div>
          <input
            type="email"
            value={email}
            className="form-input w-full rounded border bg-gray-200 p-3 text-sm text-gray-700"
            disabled
          />
          <Button
            type="submit"
            size="lg"
            fullWidth>
            인증코드 보내기
          </Button>
        </form>
      )}

      {step === 'verification' && (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleVerificationSubmit();
          }}
          className="space-y-8">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="인증코드를 입력해주세요"
              value={verificationCode}
              onChange={e => setVerificationCode(e.target.value)}
              className="w-full rounded border p-3 text-sm"
              required
            />
            {timerActive && (
              <div className="ml-4 w-[60px] rounded-lg border border-primary-600 p-2 px-4 text-center text-primary-600">
                {timerActive ? formatTime(remainingTime) : '만료'}
              </div>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            fullWidth>
            인증 확인
          </Button>
        </form>
      )}

      {step === 'newPassword' && (
        <form
          onSubmit={e => {
            e.preventDefault();
            handlePasswordChange();
          }}
          className="space-y-8">
          <input
            type="password"
            placeholder="비밀번호 입력 (6자 이상, 영문, 숫자 포함)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded border p-3 text-sm"
            required
            minLength={6}
          />
          <input
            type="password"
            placeholder="비밀번호 재입력"
            value={checkPassword}
            onChange={e => setCheckPassword(e.target.value)}
            className="w-full rounded border p-3 text-sm"
            required
            minLength={6}
          />
          <Button
            type="submit"
            fullWidth>
            비밀번호 변경
          </Button>
          <div className="space-y-8 text-xs text-gray-600">
            <p>2-10자까지 입력가능합니다.</p>
            <p>한글, 숫자, 영문 소문자만 입력가능합니다.</p>
          </div>
        </form>
      )}
    </div>
  );
}
