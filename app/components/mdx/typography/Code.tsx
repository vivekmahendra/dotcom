import type { ReactNode } from 'react';

interface CodeProps {
  children: ReactNode;
  className?: string;
}

export const InlineCode = ({ children }: CodeProps) => (
  <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded-sm text-sm font-mono">
    {children}
  </code>
);

export const CodeBlock = ({ children, className }: CodeProps) => {
  // Extract language from className (e.g., "language-javascript" -> "javascript")
  const language = className?.replace('language-', '') || '';
  
  return (
    <div className="my-6">
      {language && (
        <div className="bg-gray-800 text-gray-300 text-xs px-4 py-2 font-mono uppercase tracking-wide">
          {language}
        </div>
      )}
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-sm overflow-x-auto">
        <code className="font-mono text-sm leading-relaxed">
          {children}
        </code>
      </pre>
    </div>
  );
};