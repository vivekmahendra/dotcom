import type { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  id?: string;
}

export const H1 = ({ children, id }: HeadingProps) => (
  <h1 id={id} className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8 mt-12 first:mt-0">
    {children}
  </h1>
);

export const H2 = ({ children, id }: HeadingProps) => (
  <h2 id={id} className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight mb-6 mt-10">
    {children}
  </h2>
);

export const H3 = ({ children, id }: HeadingProps) => (
  <h3 id={id} className="text-2xl font-semibold text-gray-900 leading-tight mb-4 mt-8">
    {children}
  </h3>
);

export const H4 = ({ children, id }: HeadingProps) => (
  <h4 id={id} className="text-xl font-semibold text-gray-900 leading-tight mb-4 mt-6">
    {children}
  </h4>
);

export const H5 = ({ children, id }: HeadingProps) => (
  <h5 id={id} className="text-lg font-semibold text-gray-900 leading-tight mb-3 mt-6">
    {children}
  </h5>
);

export const H6 = ({ children, id }: HeadingProps) => (
  <h6 id={id} className="text-base font-semibold text-gray-900 leading-tight mb-3 mt-4">
    {children}
  </h6>
);