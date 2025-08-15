import type { Route } from "./+types/_index";
import { HomeIdeasSection, HomeProjectsSection } from "../components/home";
import { DecryptedText, LetterGlitch } from "../components/react-bits";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vivek Mahendra - Portfolio" },
    { name: "description", content: "Welcome to Vivek Mahendra's portfolio" },
  ];
}

export default function Home() {
  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* Full-width Header Section with LetterGlitch Background */}
      <div className="relative overflow-hidden">
        {/* LetterGlitch Background - fills entire background */}
        <div className="absolute inset-0 z-0">
          <LetterGlitch
            glitchColors={["#f0f0f0", "#f4f4f4", "#eeeeee"]}
            glitchSpeed={500}
            smooth={true}
            outerVignette={false}
            centerVignette={false}
          />
        </div>

        {/* Header Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <section className="py-20 md:py-32">
              {/* Content */}
              <div className="relative z-10 space-y-8">
                {/* Main heading with modern typography */}
                <div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-tight leading-none mb-2">
                    <DecryptedText text="Hello, I'm Vivek" animateOn="view" revealDirection="start" speed={100}/>
                  </h1>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-gray-600 mt-4">
                    <span className="flex items-center">
                      <span className="text-green-600 mr-1">&gt;</span> Software
                      Engineer
                    </span>
                    <span className="flex items-center">
                      <span className="text-green-600 mr-1">&gt;</span> Value
                      Investor
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4 max-w-3xl">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Building user-focused products and delivering research-driven insights on public companies.
                  </p>

                  {/* Disclaimers */}
                  <div className="border-l-2 border-gray-300 pl-4 space-y-2">
                    <p className="text-xs text-gray-500 font-mono">
                      📊 Investment
                      content is for informational purposes only. Not financial
                      advice.
                    </p>
                    <p className="text-xs text-gray-500 font-mono">
                      ✍️ All content
                      written by me, not AI.
                    </p>
                  </div>
                </div>

                {/* Status line */}
                <div className="font-mono text-xs text-gray-400 pt-4">
                  LAST_UPDATE:{" "}
                  <span className="text-gray-600">
                    {new Date().toISOString().split("T")[0]}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <HomeIdeasSection />
          <HomeProjectsSection />
        </div>
      </div>
    </div>
  );
}
