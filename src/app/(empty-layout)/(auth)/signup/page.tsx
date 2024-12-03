'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button/Button';
import { useSignup } from '@/features/auth/hooks/useSignup';

export default function SignupForm() {
  const router = useRouter();
  const {
    email,
    setEmail,
    password,
    setPassword,
    checkPassword,
    setCheckPassword,
    nickname,
    setNickname,
    verificationCode,
    setVerificationCode,
    step,
    error,
    handleEmailSubmit,
    handleVerificationSubmit,
    handleSignup
  } = useSignup(router);

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
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-input w-full rounded border p-3 text-sm"
            required
          />
          <Button
            type="submit"
            size="lg"
            fullWidth>
            이메일 인증
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
          <input
            type="text"
            placeholder="인증코드를 입력해주세요"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
            className="w-full rounded border p-3 text-sm"
            required
          />
          <Button
            type="submit"
            size="lg"
            fullWidth>
            인증 확인
          </Button>
        </form>
      )}

      {step === 'details' && (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSignup();
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
          <input
            type="text"
            placeholder="닉네임 입력 (2-10자)"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            className="w-full rounded border p-3 text-sm"
            required
            minLength={2}
            maxLength={10}
          />
          <Button
            type="submit"
            fullWidth>
            회원가입 완료
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
