import { Link } from "react-router";
import { getProjects } from "../../utils/content";
import { TEXT_CONFIG } from "../../config/text";
import { GitHubIcon } from "../ui/icons";

const projects = getProjects();

export function HomeProjectsSection() {
  return (
    <section className="py-16">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-3xl font-light">{TEXT_CONFIG.home.sections.projects.title}</h2>
          <Link 
            to="/projects"
            className="group px-4 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            {TEXT_CONFIG.home.sections.projects.viewAllText} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <p className="text-gray-600">{TEXT_CONFIG.home.sections.projects.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="border border-gray-200 p-6 hover:border-gray-400 transition-colors group"
          >
            <h3 className="text-xl font-medium mb-3">{project.name}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex items-center justify-between">
              <Link
                to={`/projects/${project.slug}`}
                className="group text-sm text-gray-600 hover:text-black transition-colors inline-block"
              >
                {TEXT_CONFIG.ui.buttons.learnMore} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              {project.link && project.link.includes('github.com') && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 text-gray-500 hover:text-gray-900 transition-colors"
                  title="View on GitHub"
                >
                  <GitHubIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}