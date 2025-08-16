import { Link } from "react-router";
import { getBlog } from "../../utils/content";

const blogPosts = getBlog();

export function HomeBlogSection() {
  // Only show if there are blog posts
  if (blogPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-3xl font-light">Latest Blog</h2>
          <Link 
            to="/blog"
            className="group px-4 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            View all <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <p className="text-gray-600">Thoughts on tech, business, and more</p>
      </div>
      
      <div>
        {blogPosts.slice(0, 3).map((post, index) => (
          <div key={post.slug}>
            <article className="py-6">
              <h2 className="text-2xl font-medium mb-1">
                <Link 
                  to={`/blog/${post.slug}`}
                  className="hover:text-gray-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <time className="text-gray-500 text-sm block mb-3">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <Link 
                to={`/blog/${post.slug}`}
                className="group text-sm text-gray-600 hover:text-black transition-colors inline-block"
              >
                Read Article <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </article>
            {index < blogPosts.slice(0, 3).length - 1 && (
              <div className="border-t border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}