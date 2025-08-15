import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeSnippetProps {
  title?: string;
  language?: string;
  children: React.ReactNode;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeSnippet({
  title,
  language = 'typescript',
  children,
  filename,
  showLineNumbers = true
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Convert children to string if it's not already
  const codeString = typeof children === 'string' ? children : String(children);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lines = codeString.trim().split('\n');

  return (
    <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
      {/* Header */}
      {(title || filename) && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            
            {filename && (
              <span className="text-sm font-mono text-gray-600">{filename}</span>
            )}
            
            {title && !filename && (
              <span className="text-sm font-medium text-gray-700">{title}</span>
            )}
          </div>
          
          <button
            onClick={handleCopy}
            className="text-xs font-mono px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        {mounted ? (
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
              lineHeight: '1.5'
            }}
            lineNumberStyle={{
              color: '#6b7280',
              paddingRight: '1rem',
              userSelect: 'none'
            }}
          >
            {codeString.trim()}
          </SyntaxHighlighter>
        ) : (
          <pre className="overflow-x-auto p-4 bg-gray-900 text-gray-100 text-sm leading-relaxed">
            <code className="font-mono">
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  {showLineNumbers && (
                    <span className="text-gray-500 select-none mr-4 text-right w-8 flex-shrink-0">
                      {i + 1}
                    </span>
                  )}
                  <span className="flex-1">
                    {line || '\u00A0'}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        )}
        
        {/* Copy button for headerless version */}
        {!title && !filename && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-xs font-mono px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
    </div>
  );
}