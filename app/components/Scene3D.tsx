import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";

function RotatingCube() {
  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="black" wireframe />
      </mesh>
    </Float>
  );
}

export function Scene3D() {
  return (
    <div className="w-full h-64">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <RotatingCube />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}