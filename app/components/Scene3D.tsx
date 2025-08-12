import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function DesertModel() {
  const { scene } = useGLTF("/models/scene.gltf");
  const group = useRef<THREE.Group>(null);

  // Enhanced floating animation
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        Math.cos(t / 2) / 20 + 0.25,
        0.1
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t / 4) / 20,
        0.1
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        Math.sin(t / 8) / 20,
        0.1
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        (-2 + Math.sin(t / 2)) / 2,
        0.1
      );
    }
  });

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={[0.1, 0.1, 0.1]}
        position={[3.1, 1, 0]}
      />
    </group>
  );
}

// Preload the GLTF model
useGLTF.preload("/models/scene.gltf");

export function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [5, 2, 6], fov: 60 }}>
        {/* Warm desert lighting */}
        <ambientLight intensity={0.4} color="#fff5e6" />
        <directionalLight
          position={[5, 8, 2]}
          intensity={1.2}
          color="#ffebb3"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <DesertModel />
        </Suspense>
        {/* OrbitControls temporarily disabled - uncomment to re-enable */}
        {/* <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
        /> */}
      </Canvas>
    </div>
  );
}
