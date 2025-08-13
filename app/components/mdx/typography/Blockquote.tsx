import type { ReactNode } from 'react';

interface BlockquoteProps {
  children: ReactNode;
}

export const Blockquote = ({ children }: BlockquoteProps) => (
  <blockquote className="border-l-4 border-gray-300 pl-6 py-2 my-6 italic text-gray-600 bg-gray-50">
    {children}
  </blockquote>
);

export const HorizontalRule = () => (
  <hr className="border-0 h-px bg-gray-300 my-8" />
);