import type { Route } from "./+types/ideas";
import { Link } from "react-router";
import { Newsletter } from "../components/ui";
import { PageHeader } from "../components/layouts";
import { getIdeas } from "../utils/content";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ideas - Vivek Mahendra" },
    { name: "description", content: "Investment ideas and analysis by Vivek Mahendra" },
  ];
}

const posts = getIdeas();

export default function Ideas() {
  return (
    <div className="bg-white text-black">
      {/* Newsletter Banner */}
      <Newsletter banner={true} />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <PageHeader title="Ideas" />
          
          <div className="space-y-12">
            {posts.map((post, index) => (
              <article key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                <h2 className="text-2xl font-medium mb-2">
                  <Link 
                    to={`/ideas/${post.slug}`}
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
                  to={`/ideas/${post.slug}`}
                  className="group text-sm text-gray-600 hover:text-black transition-colors inline-block"
                >
                  Read full article <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}