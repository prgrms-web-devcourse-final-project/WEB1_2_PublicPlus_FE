interface PageHeaderProps {
  title: string;
  onBack?: () => void;
}

export function PageHeader({ title, onBack }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="mx-auto flex h-14 items-center px-4">
        {onBack && (
          <button
            onClick={onBack}
            className="mr-4 text-gray-600">
            ←
          </button>
        )}
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
    </header>
  );
}
