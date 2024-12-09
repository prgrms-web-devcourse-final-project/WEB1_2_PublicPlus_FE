import { CustomHeader } from '@/widgets/header/ui/CustomHeader';

export default function SignupLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CustomHeader />
      <div>
        <h1 className="mt-24 text-center text-2xl font-bold">비밀번호 변경</h1>
        <div className="mb-12">{children}</div>
      </div>
    </div>
  );
}
