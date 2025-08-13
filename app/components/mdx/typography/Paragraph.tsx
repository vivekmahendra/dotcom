import type { ReactNode } from 'react';

interface ParagraphProps {
  children: ReactNode;
}

export const Paragraph = ({ children }: ParagraphProps) => (
  <p className="text-base leading-relaxed text-gray-700 mb-6">
    {children}
  </p>
);

export const Strong = ({ children }: ParagraphProps) => (
  <strong className="font-semibold text-gray-900">
    {children}
  </strong>
);

export const Em = ({ children }: ParagraphProps) => (
  <em className="italic text-gray-700">
    {children}
  </em>
);