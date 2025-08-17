import type { Route } from "./+types/_index";
import {
  HomeIdeasSection,
  HomeProjectsSection,
  HomeBlogSection,
} from "../components/home";
import { DecryptedText, LetterGlitch } from "../components/react-bits";
import { TEXT_CONFIG } from "../config/text";

export function meta({}: Route.MetaArgs) {
  return [
    { title: TEXT_CONFIG.site.title },
    { name: "description", content: TEXT_CONFIG.site.description },
  ];
}

export default function Home() {
  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* Full-width Header Section with LetterGlitch Background */}
      <div className="relative overflow-hidden" style={{overflowX: 'hidden'}}>
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
                    <DecryptedText
                      text={TEXT_CONFIG.home.hero.greeting}
                      animateOn="view"
                      revealDirection="start"
                      speed={100}
                    />
                  </h1>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-gray-600 mt-4">
                    {TEXT_CONFIG.home.hero.roles.map((role, index) => (
                      <span key={index} className="flex items-center">
                        <span className="text-green-600 mr-1">{role.prefix}</span> {role.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4 max-w-3xl">
                  <p 
                    className="text-lg text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: TEXT_CONFIG.home.hero.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                    }}
                  />
                </div>

                {/* Status line */}
                <div className="font-mono text-xs text-gray-400 pt-4">
                  {TEXT_CONFIG.home.hero.lastUpdateLabel}{" "}
                  <span className="text-gray-600">
                    <DecryptedText
                      text={new Date().toISOString().split("T")[0]}
                      animateOn="view"
                      speed={50}
                      useOriginalCharsOnly={false}
                    />
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
          <HomeBlogSection />
        </div>
      </div>
    </div>
  );
}
