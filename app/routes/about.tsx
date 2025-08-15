import type { Route } from "./+types/about";
import { PageHeader } from "../components/layouts";
import { Newsletter } from "../components/ui/Newsletter";
import { handleNewsletterAction } from "../lib/newsletter-action";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Vivek Mahendra" },
    { name: "description", content: "Learn more about Vivek Mahendra" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  return handleNewsletterAction(request);
}

export default function About() {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <PageHeader title="About" />
          </div>
          
          <div className="prose prose-lg max-w-none mb-12">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 float-right ml-6 mb-4 mt-2">
              <img 
                src="https://picsum.photos/200?random=profile" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              I'm Vivek. I like building things, hiking, and researching businesses.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              I read "One Up On Wall Street" in 7th grade and bought AMD stock at $1.80. Sold it at $25. It's now $180. That got me interested in Warren Buffett and Charlie Munger's approach to investing.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              This site is where I put my projects and write about things I'm thinking about. Mostly tech, business stuff, and whatever else seems worth sharing.
            </p>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-light mb-6 text-gray-900">Interesting Links</h2>
            <div className="space-y-4">
              {[
                {
                  name: "Paul Graham Essays",
                  url: "http://paulgraham.com/articles.html",
                  description: "Thoughtful essays on startups, programming, and life"
                },
                {
                  name: "Stratechery",
                  url: "https://stratechery.com",
                  description: "Daily analysis of the strategy and business side of technology"
                },
                {
                  name: "Papers We Love",
                  url: "https://paperswelove.org",
                  description: "A repository of academic computer science papers and a community who loves reading them"
                },
                {
                  name: "Hacker News",
                  url: "https://news.ycombinator.com",
                  description: "Social news website focusing on computer science and entrepreneurship"
                },
                {
                  name: "The Pragmatic Engineer",
                  url: "https://blog.pragmaticengineer.com",
                  description: "In-depth articles about the tech industry and engineering culture"
                },
                {
                  name: "Acquired Podcast",
                  url: "https://acquired.fm",
                  description: "Deep dives into the stories and strategies behind great companies"
                }
              ].map((link, i) => (
                <div key={i} className="border-l-2 border-gray-200 pl-4 hover:border-gray-400 transition-colors">
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {link.name} →
                  </a>
                  <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-light mb-6 text-gray-900">Gallery</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                'https://picsum.photos/300',
                'https://picsum.photos/300?random=2',
                'https://picsum.photos/300?random=3',
                'https://picsum.photos/300?random=4',
                'https://picsum.photos/300?random=5',
                'https://picsum.photos/300?random=6',
                'https://picsum.photos/300?random=7',
                'https://picsum.photos/300?random=8',
                'https://picsum.photos/300?random=9'
              ].map((src, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-50 rounded hover:bg-gray-100 transition-colors overflow-hidden shadow-sm"
                >
                  <img 
                    src={src} 
                    alt={`Gallery item ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <Newsletter inline />
          </div>
        </div>
      </div>
    </div>
  );
}