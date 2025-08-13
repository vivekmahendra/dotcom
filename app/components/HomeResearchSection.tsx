import { Link } from "react-router";

const researchPosts = [
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

export function HomeResearchSection() {
  return (
    <section className="py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-light mb-2">Latest Research</h2>
        <p className="text-gray-600">Investment analysis and market insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {researchPosts.map((post) => (
          <article key={post.slug} className="border border-gray-200 p-6 hover:border-gray-400 transition-colors">
            <h3 className="text-xl font-medium mb-2">
              <Link 
                to={`/research/${post.slug}`}
                className="hover:text-gray-600 transition-colors"
              >
                {post.title}
              </Link>
            </h3>
            <time className="text-gray-500 text-sm mb-3 block">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <p className="text-gray-700 leading-relaxed mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <Link 
              to={`/research/${post.slug}`}
              className="text-black hover:text-gray-600 transition-colors inline-flex items-center text-sm"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
      
      <Link 
        to="/research"
        className="text-black hover:text-gray-600 transition-colors inline-flex items-center"
      >
        View all research →
      </Link>
    </section>
  );
}