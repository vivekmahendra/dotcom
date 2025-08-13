import type { Route } from "./+types/about";
import { PageScene3D } from "../components/PageScene3D";
import { Suspense } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Vivek Mahendra" },
    { name: "description", content: "Learn more about Vivek Mahendra" },
  ];
}

export default function About() {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header with 3D Scene */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-light mb-8">About</h1>
              <div className="text-lg leading-relaxed space-y-6">
                <p>
                  Hello, I'm Vivek Mahendra. Welcome to my digital space where I share my journey 
                  through technology, investments, and creative pursuits.
                </p>
                <p>
                  I'm passionate about building meaningful products, exploring emerging technologies, 
                  and sharing insights through research and writing.
                </p>
              </div>
            </div>
            <div className="h-48 md:h-64">
              <Suspense fallback={<div className="w-full h-full bg-gray-50 animate-pulse rounded" />}>
                <PageScene3D modelType="about" enableOrbitControls />
              </Suspense>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-light mb-8">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 rounded-sm hover:bg-gray-200 transition-colors"
                >
                  {/* Placeholder for photos - replace with actual images */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}