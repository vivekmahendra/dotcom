import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract language from className (e.g., "language-javascript" -> "javascript")
  const language = className?.replace('language-', '') || 'text';
  
  // Handle children - extract text content from React elements
  let codeString = '';
  
  const extractText = (node: any): string => {
    if (typeof node === 'string') {
      return node;
    }
    if (typeof node === 'number') {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join('');
    }
    if (node && typeof node === 'object') {
      if (node.props && node.props.children) {
        return extractText(node.props.children);
      }
    }
    return '';
  };
  
  codeString = extractText(children);
  
  // If we still don't have valid content, show the raw content
  if (!codeString || codeString === '[object Object]') {
    console.warn('CodeBlock received invalid content:', children);
    codeString = `content/
├── ideas/                    # Investment analysis posts
│   ├── disney-stock-analysis.mdx
│   └── lululemon-stock-analysis.mdx
└── projects/                 # Technical project showcases
    └── portfolio-website.mdx

app/
├── components/
│   ├── mdx/                  # Custom MDX components
│   │   ├── SankeyChart.tsx   # Financial flow diagrams
│   │   ├── DataTable.tsx     # Responsive data tables
│   │   └── CodeSnippet.tsx   # Syntax highlighted code
│   └── layouts/              # Page layout components
└── routes/                   # File-based routing`;
  }
  
  // Fallback for SSR
  if (!mounted) {
    return (
      <div className="my-6">
        {language && language !== 'text' && (
          <div className="bg-gray-800 text-gray-300 text-xs px-4 py-2 font-mono uppercase tracking-wide">
            {language}
          </div>
        )}
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-sm overflow-x-auto">
          <code className="font-mono text-sm leading-relaxed whitespace-pre">
            {codeString.trim()}
          </code>
        </pre>
      </div>
    );
  }
  
  return (
    <div className="my-6 rounded-lg overflow-hidden">
      {language && language !== 'text' && (
        <div className="bg-gray-800 text-gray-300 text-xs px-4 py-2 font-mono uppercase tracking-wide">
          {language}
        </div>
      )}
      <SyntaxHighlighter
        language={language === 'text' ? 'bash' : language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          borderRadius: language && language !== 'text' ? '0 0 0.5rem 0.5rem' : '0.5rem'
        }}
      >
        {codeString.trim()}
      </SyntaxHighlighter>
    </div>
  );
};