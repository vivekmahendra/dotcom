import type { Route } from "./+types/blog";
import { Link } from "react-router";
import { Newsletter } from "../components/ui";
import { PageHeader } from "../components/layouts";
import { getBlog } from "../utils/content";
import { handleNewsletterAction } from "../lib/newsletter-action";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog - Vivek Mahendra" },
    { name: "description", content: "Thoughts on technology, business, and everything in between" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  return handleNewsletterAction(request);
}

const posts = getBlog();

export default function Blog() {
  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* Newsletter Banner */}
      <Newsletter banner={true} />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <PageHeader title="Blog" />
          
          {posts.length > 0 ? (
            <div className="space-y-12">
              {posts.map((post, index) => (
                <article key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                  <h2 className="text-2xl font-medium mb-2">
                    <Link 
                      to={`/blog/${post.slug}`}
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
                    to={`/blog/${post.slug}`}
                    className="group text-sm text-gray-600 hover:text-black transition-colors inline-block"
                  >
                    Read full article <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Coming soon. This is where I'll share my thoughts on technology, business, and whatever else is on my mind.
              </p>

              <p className="text-gray-700 leading-relaxed">
                In the meantime, check out my <Link to="/ideas" className="text-black underline hover:no-underline">ideas</Link> and <Link to="/projects" className="text-black underline hover:no-underline">projects</Link> sections.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}