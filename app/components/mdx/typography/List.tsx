import type { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
}

export const UnorderedList = ({ children }: ListProps) => (
  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700 pl-4">
    {children}
  </ul>
);

export const OrderedList = ({ children }: ListProps) => (
  <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700 pl-4">
    {children}
  </ol>
);

export const ListItem = ({ children }: ListProps) => (
  <li className="text-base leading-relaxed">
    {children}
  </li>
);