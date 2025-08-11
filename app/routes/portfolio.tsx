import type { Route } from "./+types/portfolio";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio - Vivek Mahendra" },
    { name: "description", content: "Projects and work by Vivek Mahendra" },
  ];
}

const projects = [
  {
    name: "Project One",
    description: "A brief description of this project and what it accomplishes.",
    link: "#",
  },
  {
    name: "Project Two",
    description: "Another project showcasing different skills and technologies.",
    link: "#",
  },
  {
    name: "Project Three",
    description: "Third project demonstrating various capabilities and solutions.",
    link: "#",
  },
  {
    name: "Project Four",
    description: "Fourth project highlighting innovative approaches and results.",
    link: "#",
  },
];

export default function Portfolio() {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-light mb-16">Portfolio</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border border-gray-200 p-6 hover:border-gray-400 transition-colors group"
              >
                <h3 className="text-xl font-medium mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="text-black hover:text-gray-600 transition-colors inline-flex items-center"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}