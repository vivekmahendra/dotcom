import type { Route } from "./+types/links";
import { Link } from "react-router";
import { PageHeader } from "../components/layouts";
import { TEXT_CONFIG } from "../config/text";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Links - ${TEXT_CONFIG.site.author}` },
    { name: "description", content: "A curated collection of useful links and resources." },
  ];
}

export default function Links() {
  const links = TEXT_CONFIG.pages.about.sections.links.items;

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
            <PageHeader title="Links" />
            <p className="text-gray-600 mt-4">
              A curated collection of useful links and resources I find valuable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((link, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-black transition-colors">
                      {link.name}
                    </h3>
                    <span className="text-gray-400 group-hover:text-gray-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-2">
                      ↗
                    </span>
                  </div>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    {link.description}
                  </p>
                  <div className="mt-4 text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                    {new URL(link.url).hostname}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}