import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlaceholderCubeProps {
  color?: string;
  size?: number;
}

export function PlaceholderCube({ 
  color = "#ffffff", 
  size = 1 
}: PlaceholderCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Floating animation
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.cos(t / 2) / 20 + 0.25;
      meshRef.current.rotation.y = Math.sin(t / 4) / 20;
      meshRef.current.rotation.z = Math.sin(t / 8) / 20;
      meshRef.current.position.y = Math.sin(t / 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}