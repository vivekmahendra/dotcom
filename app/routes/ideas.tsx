import type { Route } from "./+types/ideas";
import { Link } from "react-router";
import { Newsletter } from "../components/Newsletter";
import { PageScene3D } from "../components/PageScene3D";
import { Suspense } from "react";
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
          {/* Header with 3D Scene */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-light mb-4">Ideas</h1>
              <p className="text-xl text-gray-600">
                Investment analysis, market insights, and strategic thinking.
              </p>
            </div>
            <div className="h-48 md:h-64">
              <Suspense fallback={<div className="w-full h-full bg-gray-50 animate-pulse rounded" />}>
                <PageScene3D modelType="research" enableOrbitControls />
              </Suspense>
            </div>
          </div>
          
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