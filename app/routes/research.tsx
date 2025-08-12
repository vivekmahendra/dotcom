import type { Route } from "./+types/research";
import { Link } from "react-router";
import { Newsletter } from "../components/Newsletter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Research - Vivek Mahendra" },
    { name: "description", content: "Investment research and analysis by Vivek Mahendra" },
  ];
}

const posts = [
  {
    title: "Understanding Market Dynamics in 2024",
    date: "2024-01-15",
    excerpt: "An analysis of current market trends and their implications for long-term investing.",
    slug: "market-dynamics-2024",
  },
  {
    title: "Tech Stock Valuation: A Deep Dive",
    date: "2024-01-10",
    excerpt: "Exploring valuation methodologies for technology companies in the current environment.",
    slug: "tech-stock-valuation",
  },
  {
    title: "Emerging Markets Outlook",
    date: "2024-01-05",
    excerpt: "Key considerations for emerging market investments in the coming year.",
    slug: "emerging-markets-outlook",
  },
];

export default function Research() {
  return (
    <div className="bg-white text-black">
      {/* Newsletter Banner */}
      <Newsletter banner={true} />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl font-light mb-8">Research</h1>
            <p className="text-xl text-gray-600 mb-8">
              Investment analysis, market insights, and strategic thinking.
            </p>
          </div>
          
          <div className="space-y-12">
            {posts.map((post, index) => (
              <article key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                <h2 className="text-2xl font-medium mb-2">
                  <Link 
                    to={`/research/${post.slug}`}
                    className="hover:text-gray-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <time className="text-gray-500 text-sm mb-4 block">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <p className="text-gray-700 leading-relaxed mb-4">{post.excerpt}</p>
                <Link 
                  to={`/research/${post.slug}`}
                  className="text-black hover:text-gray-600 transition-colors inline-flex items-center text-sm"
                >
                  Read full article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}