import type { Route } from "./+types/about";
import { PageHeader } from "../components/layouts";
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function RotatingCube() {
  const meshRef = useRef<any>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Vivek Mahendra" },
    { name: "description", content: "Learn more about Vivek Mahendra" },
  ];
}

export default function About() {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <PageHeader title="About" />
          </div>
          
          <div className="prose prose-lg max-w-none mb-12">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 float-right ml-6 mb-4 mt-2">
              <img 
                src="https://picsum.photos/200?random=profile" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              I'm Vivek. I like building things, hiking, and researching businesses.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              I read "One Up On Wall Street" in 7th grade and bought AMD stock at $1.80. Sold it at $25. It's now $180. That got me interested in Warren Buffett and Charlie Munger's approach to investing.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              This site is where I put my projects and write about things I'm thinking about. Mostly tech, business stuff, and whatever else seems worth sharing.
            </p>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-light mb-6 text-gray-900">Gallery</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'image', src: 'https://picsum.photos/300' },
                { type: '3d', content: '3D Model' },
                { type: 'image', src: 'https://picsum.photos/300?random=2' },
                { type: 'image', src: 'https://picsum.photos/300?random=3' },
                { type: '3d', content: '3D Print' },
                { type: 'image', src: 'https://picsum.photos/300?random=4' },
                { type: '3d', content: '3D Model' },
                { type: 'image', src: 'https://picsum.photos/300?random=5' },
                { type: 'image', src: 'https://picsum.photos/300?random=6' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-50 rounded hover:bg-gray-100 transition-colors overflow-hidden shadow-sm"
                >
                  {item.type === 'image' ? (
                    <img 
                      src={item.src} 
                      alt={`Gallery item ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white">
                      <Canvas camera={{ position: [2, 2, 2] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[2, 2, 5]} intensity={1} />
                        <RotatingCube />
                      </Canvas>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}