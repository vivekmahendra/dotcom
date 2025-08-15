import { Link } from "react-router";
import { getProjects } from "../utils/content";

const projects = getProjects();

export function HomeProjectsSection() {
  return (
    <section className="py-16">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-3xl font-light">Recent Projects</h2>
          <Link 
            to="/projects"
            className="group px-4 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            View all <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <p className="text-gray-600">Selected work and experiments</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </section>
  );
}