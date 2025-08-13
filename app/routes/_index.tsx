import type { Route } from "./+types/_index";
import { HomeResearchSection } from "../components/HomeResearchSection";
import { HomePortfolioSection } from "../components/HomePortfolioSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vivek Mahendra - Portfolio" },
    { name: "description", content: "Welcome to Vivek Mahendra's portfolio" },
  ];
}

export default function Home() {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <section className="py-20 md:py-32">
            <div className="space-y-8">
              {/* Console-style intro */}
              <div className="font-mono text-sm text-gray-500">
                <span className="text-green-600">$</span> whoami
              </div>
              
              {/* Main heading with modern typography */}
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-tight leading-none mb-2">
                  Vivek Mahendra
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-gray-600 mt-4">
                  <span className="flex items-center">
                    <span className="text-green-600 mr-1">&gt;</span> Software Engineer
                  </span>
                  <span className="flex items-center">
                    <span className="text-green-600 mr-1">&gt;</span> Value Investor
                  </span>
                  <span className="flex items-center">
                    <span className="text-green-600 mr-1">&gt;</span> Research Author
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 max-w-3xl">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Building elegant software solutions and analyzing market dynamics through 
                  fundamental research. Focused on fintech, AI, and next-generation trading tools.
                </p>
                
                {/* Disclaimers */}
                <div className="border-l-2 border-gray-300 pl-4 space-y-2">
                  <p className="text-xs text-gray-500 font-mono">
                    <span className="text-yellow-600">⚠</span> Investment content is for informational purposes only. 
                    Not financial advice.
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                    <span className="text-blue-600">ℹ</span> All content written by me, not AI.
                  </p>
                </div>
              </div>

              {/* Status line */}
              <div className="font-mono text-xs text-gray-400 pt-4">
                [STATUS: <span className="text-green-600">ONLINE</span>] 
                [LOCATION: <span className="text-gray-600">USA</span>] 
                [LAST_UPDATE: <span className="text-gray-600">{new Date().toISOString().split('T')[0]}</span>]
              </div>
            </div>
          </section>

          {/* Content Sections */}
          <HomeResearchSection />
          <div className="border-t border-gray-200"></div>
          <HomePortfolioSection />
        </div>
      </div>
    </div>
  );
}
