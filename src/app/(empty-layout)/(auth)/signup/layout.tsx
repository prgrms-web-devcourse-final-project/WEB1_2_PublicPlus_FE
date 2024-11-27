import { CustomHeader } from '@/components/common/Header/CustomHeader';
export default function SignupLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CustomHeader />
      <div>
        <h1 className="text-center text-2xl font-bold">회원가입</h1>
        <div className="mb-12 mt-16">{children}</div>
      </div>
    </div>
  );
}
