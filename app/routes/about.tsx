import type { Route } from "./+types/about";
import { PageHeader } from "../components/layouts";

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
        <div className="max-w-6xl mx-auto">
          <PageHeader title="About" />
          
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