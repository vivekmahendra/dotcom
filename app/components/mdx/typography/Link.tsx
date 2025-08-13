import type { ReactNode } from 'react';

interface LinkProps {
  children: ReactNode;
  href?: string;
  title?: string;
}

export const Link = ({ children, href, title }: LinkProps) => (
  <a 
    href={href} 
    title={title}
    className="text-black hover:text-gray-600 transition-colors underline decoration-gray-300 hover:decoration-gray-500 underline-offset-2"
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
  >
    {children}
  </a>
);