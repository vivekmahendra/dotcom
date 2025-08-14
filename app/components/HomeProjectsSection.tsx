import { Link } from "react-router";
import { getProjects } from "../utils/content";

const projects = getProjects();

export function HomeProjectsSection() {
  return (
    <section className="py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-light mb-2">Recent Projects</h2>
        <p className="text-gray-600">Selected work and experiments</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {projects.map((project) => (
          <div
            key={project.slug}
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
      
      <Link 
        to="/projects"
        className="text-black hover:text-gray-600 transition-colors inline-flex items-center"
      >
        View all projects →
      </Link>
    </section>
  );
}