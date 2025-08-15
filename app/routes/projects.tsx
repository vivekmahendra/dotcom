import type { Route } from "./+types/projects";
import { PageHeader } from "../components/PageHeader";
import { getProjects } from "../utils/content";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects - Vivek Mahendra" },
    { name: "description", content: "Projects and work by Vivek Mahendra" },
  ];
}

const projects = getProjects();

export default function Projects() {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <PageHeader title="Projects" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="border border-gray-200 p-6 hover:border-gray-400 transition-colors group"
              >
                <h3 className="text-xl font-medium mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="group text-sm text-gray-600 hover:text-black transition-colors inline-block"
                >
                  View Project <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}