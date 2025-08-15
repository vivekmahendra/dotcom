import type { Route } from "./+types/projects";
import { Link } from "react-router";
import { PageHeader } from "../components/layouts";
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
                <div className="mb-4">
                  <h3 className="text-xl font-medium mb-2">{project.name}</h3>
                  {project.date && (
                    <time className="text-sm text-gray-500">
                      {new Date(project.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </time>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group text-sm text-gray-600 hover:text-black transition-colors inline-block"
                >
                  View Details <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}