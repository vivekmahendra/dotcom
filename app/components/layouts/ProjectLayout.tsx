import { PageScene3D } from "../ui";
import { DecryptedText } from "../react-bits";

interface ProjectLayoutProps {
  name: string;
  description: string;
  date: string;
  link?: string;
  technologies?: string[];
  children?: React.ReactNode;
}

export function ProjectLayout({ 
  name, 
  description, 
  date, 
  link, 
  technologies, 
  children 
}: ProjectLayoutProps) {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              <DecryptedText text={name} animateOn="view" revealDirection="start" speed={100} />
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>
            
            {/* Project Meta */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-8">
              {date && (
                <div className="flex items-center gap-2">
                  <span className="font-mono">Date:</span>
                  <time>{new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</time>
                </div>
              )}
              
              {link && (
                <div className="flex items-center gap-2">
                  <span className="font-mono">Link:</span>
                  <a 
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-gray-600 transition-colors underline underline-offset-2"
                  >
                    View Project
                  </a>
                </div>
              )}
            </div>
            
            {/* Technologies */}
            {technologies && technologies.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-mono text-gray-500 mb-3">Technologies:</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Project Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}