interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'danger';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    danger: 'bg-red-50 border-red-200 text-red-900'
  };

  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    danger: '🚨'
  };

  return (
    <div className={`border-l-4 p-4 my-6 ${styles[type]}`}>
      {title && (
        <div className="font-medium mb-2 flex items-center gap-2">
          <span>{icons[type]}</span>
          {title}
        </div>
      )}
      <div className="prose prose-sm max-w-none">
        {children}
      </div>
    </div>
  );
}