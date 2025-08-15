import type { MDXComponents } from 'mdx/types';

// Typography Components
import { H1, H2, H3, H4, H5, H6 } from './typography/Heading';
import { Paragraph, Strong, Em } from './typography/Paragraph';
import { UnorderedList, OrderedList, ListItem } from './typography/List';
import { Link } from './typography/Link';
import { InlineCode, CodeBlock } from './typography/Code';
import { Blockquote, HorizontalRule } from './typography/Blockquote';

// Custom Components
import { Callout } from './Callout';
import { DataTable } from './DataTable';
import { StockChart } from './StockChart';
import { Newsletter } from '../ui';

/**
 * Centralized MDX component mapping
 * Maps standard HTML elements and custom components for consistent styling
 */
export const mdxComponents: MDXComponents = {
  // Typography - Headers
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  
  // Typography - Text
  p: Paragraph,
  strong: Strong,
  em: Em,
  
  // Typography - Lists
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  
  // Typography - Links & Code
  a: Link,
  code: InlineCode,
  pre: CodeBlock,
  
  // Typography - Quotes & Dividers
  blockquote: Blockquote,
  hr: HorizontalRule,
  
  // Custom Research Components
  Callout,
  DataTable,
  StockChart,
  Newsletter,
};

/**
 * Design tokens for consistent styling
 * Easily customizable Tailwind classes
 */
export const designTokens = {
  typography: {
    h1: 'text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8 mt-12 first:mt-0',
    h2: 'text-3xl lg:text-4xl font-light text-gray-900 leading-tight mb-6 mt-10',
    h3: 'text-2xl font-semibold text-gray-900 leading-tight mb-4 mt-8',
    h4: 'text-xl font-semibold text-gray-900 leading-tight mb-4 mt-6',
    h5: 'text-lg font-semibold text-gray-900 leading-tight mb-3 mt-6',
    h6: 'text-base font-semibold text-gray-900 leading-tight mb-3 mt-4',
    paragraph: 'text-base leading-relaxed text-gray-700 mb-6',
    link: 'text-black hover:text-gray-600 transition-colors underline decoration-gray-300 hover:decoration-gray-500 underline-offset-2',
    code: 'bg-gray-100 text-gray-800 px-2 py-1 rounded-sm text-sm font-mono',
    codeBlock: 'bg-gray-900 text-gray-100 p-4 rounded-b-sm overflow-x-auto',
  },
  spacing: {
    section: 'my-8',
    paragraph: 'mb-6',
    heading: 'mb-4 mt-8',
    list: 'mb-6 space-y-2',
  },
  colors: {
    heading: 'text-gray-900',
    body: 'text-gray-700',
    muted: 'text-gray-600',
    accent: 'text-black',
    border: 'border-gray-300',
    background: 'bg-gray-50',
  }
};

export default mdxComponents;