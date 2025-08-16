import { Link } from "react-router";
import { NewsletterInline } from "../ui";
import { TEXT_CONFIG } from "../../config/text";

interface BlogLayoutProps {
  title: string;
  date: string;
  excerpt?: string;
  readingTime?: string;
  ticker?: string;
  stockPrice?: number;
  currency?: string;
  backTo?: {
    href: string;
    label: string;
  };
  children: React.ReactNode;
}

export function BlogLayout({ 
  title, 
  date, 
  excerpt, 
  readingTime = "5 min read",
  ticker,
  stockPrice,
  currency = "USD",
  backTo = { href: "/ideas", label: "Ideas" },
  children 
}: BlogLayoutProps) {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <Link 
            to={backTo.href} 
            className="inline-flex items-center text-gray-500 hover:text-black transition-colors mb-8"
          >
            ← Back to {backTo.label}
          </Link>
          
          {/* Article Header */}
          <header className="mb-12 pb-8 border-b border-gray-200">
            <h1 className="text-4xl lg:text-5xl font-light leading-tight mb-6">
              {title}
            </h1>
            
            {excerpt && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {excerpt}
              </p>
            )}
            
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <time>{new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</time>
              <span>•</span>
              <span>{readingTime}</span>
              {ticker && stockPrice && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-700">
                      ${ticker}
                    </span>
                    <span className="text-gray-700 font-medium">
                      ${stockPrice.toLocaleString('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </span>
                    <span className="text-xs text-gray-400">
                      at publication
                    </span>
                  </div>
                </>
              )}
            </div>
          </header>
          
          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div className="mdx-content">
              {children}
            </div>
          </article>
          
          {/* Newsletter Signup */}
          <div className="mt-16">
            <NewsletterInline />
          </div>
          
          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <Link 
              to={backTo.href}
              className="text-black hover:text-gray-600 transition-colors"
            >
              ← Back to all {backTo.label.toLowerCase()}
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}