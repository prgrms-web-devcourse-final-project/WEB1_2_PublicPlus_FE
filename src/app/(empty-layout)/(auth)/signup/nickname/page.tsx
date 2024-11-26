import { NicknameForm } from '@/features/auth/ui/NickNameForm';

export default function NicknamePage() {
  return (
    <div>
      <h1 className="mb-8 text-xl">닉네임을 입력해주세요.</h1>
      <NicknameForm />
    </div>
  );
}
