import { Link } from "react-router";
import { getIdeas } from "../utils/content";

const ideas = getIdeas();

export function HomeIdeasSection() {
  return (
    <section className="py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-light mb-2">Latest Ideas</h2>
        <p className="text-gray-600">Investment analysis and market insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {ideas.map((post) => (
          <article key={post.slug} className="border border-gray-200 p-6 hover:border-gray-400 transition-colors">
            <h3 className="text-xl font-medium mb-2">
              <Link 
                to={`/ideas/${post.slug}`}
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
              to={`/ideas/${post.slug}`}
              className="text-black hover:text-gray-600 transition-colors inline-flex items-center text-sm"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
      
      <Link 
        to="/ideas"
        className="text-black hover:text-gray-600 transition-colors inline-flex items-center"
      >
        View all ideas →
      </Link>
    </section>
  );
}