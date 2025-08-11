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
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6">
        <div className="flex items-center min-h-[calc(100vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6">
                Hello,<br />
                I'm Vivek<br />
                Mahendra
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Welcome to my digital space where I explore technology, investments, and creative pursuits.
              </p>
            </div>
            
            <div className="flex items-center justify-center">
              <Suspense fallback={<div className="w-full h-64 bg-gray-50 animate-pulse" />}>
                <Scene3D />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
