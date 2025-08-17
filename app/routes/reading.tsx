import type { Route } from "./+types/reading";
import { Link } from "react-router";
import { PageHeader } from "../components/layouts";
import { TEXT_CONFIG } from "../config/text";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Reading - ${TEXT_CONFIG.site.author}` },
    { name: "description", content: "Books I'm currently reading or have recently enjoyed." },
  ];
}

export default function Reading() {
  const books = TEXT_CONFIG.pages.about.sections.reading.items;

  return (
    <div className="bg-white text-black overflow-x-hidden">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link 
              to="/about"
              className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
              Back to about
            </Link>
            <PageHeader title="Reading" />
            <p className="text-gray-600 mt-4">
              Books I'm currently reading or have recently enjoyed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-600">
                      by {book.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}