import type { Route } from "./+types/home";
import { Scene3D } from "../components/Scene3D";
import { Suspense } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vivek Mahendra - Portfolio" },
    { name: "description", content: "Welcome to Vivek Mahendra's portfolio" },
  ];
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      {/* Full-screen 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Suspense
          fallback={<div className="w-full h-full bg-gray-50 animate-pulse" />}
        >
          <Scene3D />
        </Suspense>
      </div>

      {/* Text Overlay */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-4 md:mb-6">
                Hey there 👋
                <br />
                I'm Vivek
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                Welcome to my digital space where I explore technology,
                investments, and creative pursuits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
