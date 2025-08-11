import { Link } from "react-router";

interface BlogLayoutProps {
  title: string;
  date: string;
  excerpt?: string;
  readingTime?: string;
  children: React.ReactNode;
}

export function BlogLayout({ 
  title, 
  date, 
  excerpt, 
  readingTime = "5 min read",
  children 
}: BlogLayoutProps) {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back to Research */}
          <Link 
            to="/research" 
            className="inline-flex items-center text-gray-500 hover:text-black transition-colors mb-8"
          >
            ← Back to Research
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
            </div>
          </header>
          
          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div className="mdx-content">
              {children}
            </div>
          </article>
          
          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <Link 
              to="/research"
              className="text-black hover:text-gray-600 transition-colors"
            >
              ← Back to all research
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}