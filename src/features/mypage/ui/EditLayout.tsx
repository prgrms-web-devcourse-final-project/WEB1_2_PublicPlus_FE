import { Button } from '@/components/common/Button/Button';
import { CustomHeader } from '@/components/common/Header/CustomHeader';

interface EditLayoutProps {
  children: React.ReactNode;
  onSubmit: () => void;
  isValid?: boolean;
}

export default function EditLayout({
  children,
  onSubmit,
  isValid = true
}: EditLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      <CustomHeader />
      <main className="flex-1">
        <div className="flex flex-col space-y-4">{children}</div>
      </main>
      <div className="sticky bottom-32 w-full">
        <Button
          onclick={onSubmit}
          size="lg"
          disabled={!isValid}
          fullWidth>
          저장
        </Button>
      </div>
    </div>
  );
}
