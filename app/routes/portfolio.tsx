import type { Route } from "./+types/portfolio";
import { PageScene3D } from "../components/PageScene3D";
import { Suspense } from "react";

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
          {/* Header with 3D Scene */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-light mb-4">Portfolio</h1>
              <p className="text-lg text-gray-600">
                A collection of projects and experiments showcasing my work in software development,
                design, and technology.
              </p>
            </div>
            <div className="h-48 md:h-64">
              <Suspense fallback={<div className="w-full h-full bg-gray-50 animate-pulse rounded" />}>
                <PageScene3D modelType="portfolio" enableOrbitControls />
              </Suspense>
            </div>
          </div>
          
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