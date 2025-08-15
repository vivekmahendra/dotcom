import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { PlaceholderCube } from "../models/PlaceholderCube";

interface PageScene3DProps {
  modelType: 'about' | 'portfolio' | 'research';
  enableOrbitControls?: boolean;
}

const modelConfigs = {
  about: {
    color: "#10b981", // Green for Phoenix/cactus theme
    size: 1.5,
  },
  portfolio: {
    color: "#3b82f6", // Blue for tech/computer theme
    size: 1.5,
  },
  research: {
    color: "#eab308", // Gold for markets/money theme
    size: 1.5,
  },
};

export function PageScene3D({ 
  modelType, 
  enableOrbitControls = true 
}: PageScene3DProps) {
  const config = modelConfigs[modelType];

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <PlaceholderCube color={config.color} size={config.size} />
        </Suspense>
        
        {enableOrbitControls && (
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.5}
          />
        )}
      </Canvas>
    </div>
  );
}