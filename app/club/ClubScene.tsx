"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { useColorScheme } from "../ColorContext";

function CloudParticle({ 
  texture, 
  position,
  rotationZ,
  mousePos,
  colorHex
}: { 
  texture: THREE.Texture; 
  position: [number, number, number];
  rotationZ: number;
  mousePos: THREE.Vector2;
  colorHex: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const basePosition = useRef(new THREE.Vector3(...position));
  const targetPosition = useRef(new THREE.Vector3(...position));
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z -= 0.002;
      
      // Convert mouse position to world space
      const mouseWorldX = mousePos.x * 400;
      const mouseWorldY = mousePos.y * 400;
      
      // Calculate distance from mouse to particle
      const dx = basePosition.current.x - mouseWorldX;
      const dy = basePosition.current.y - mouseWorldY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Apply displacement based on distance
      const maxDistance = 300;
      const force = Math.max(0, 1 - distance / maxDistance);
      
      if (distance < maxDistance) {
        targetPosition.current.x = basePosition.current.x + (dx / distance) * force * 150;
        targetPosition.current.y = basePosition.current.y + (dy / distance) * force * 150;
      } else {
        targetPosition.current.x = basePosition.current.x;
        targetPosition.current.y = basePosition.current.y;
      }
      
      // Smooth interpolation
      meshRef.current.position.x += (targetPosition.current.x - meshRef.current.position.x) * 0.1;
      meshRef.current.position.y += (targetPosition.current.y - meshRef.current.position.y) * 0.1;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      rotation={[1.16, -0.12, rotationZ]}
    >
      <planeGeometry args={[500, 500]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
        emissive={new THREE.Color(colorHex)}
        emissiveIntensity={1}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function Scene() {
  const colorScheme = useColorScheme();
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const mousePos = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("https://raw.githubusercontent.com/navin-navi/codepen-assets/master/images/smoke.png", (loadedTexture) => {
      setTexture(loadedTexture);
    });

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cloudParticles = useMemo(() => {
    return [...Array(25)].map(() => ({
      position: [
        Math.random() * 800 - 400,
        Math.random() * 1800 + 50, // Spread clouds vertically between 50-450
        Math.random() * 500 - 500,
      ] as [number, number, number],
      rotationZ: Math.random() * 2 * Math.PI
    }));
  }, []);

  if (!texture) return null;

  return (
    <>
      <color attach="background" args={[0x0a0a0f]} />
      <fogExp2 attach="fog" args={[0x0a0a0f, 0.0008]} />
      
      {/* Ambient Light */}
      <ambientLight intensity={0.8} color={colorScheme.hex} />
      
      {/* Point Lights from bottom corners */}
      {/* Bottom Left Corner */}
      <pointLight 
        position={[-200, -100, 200]} 
        color={colorScheme.hex}
        intensity={1000}
        distance={1000}
        decay={2}
      />
      
      {/* Bottom Right Corner */}
      <pointLight 
        position={[200, -100, 200]} 
        color={colorScheme.hex}
        intensity={1000}
        distance={1000}
        decay={2}
      />
      
      {/* Center lights for extra brightness */}
      <pointLight 
        position={[0, -50, 100]} 
        color={colorScheme.hex}
        intensity={1000}
        distance={800}
        decay={2}
      />
      
      {/* Smoke Clouds */}
      {cloudParticles.map((cloud, i) => (
        <CloudParticle
          key={i}
          texture={texture}
          position={cloud.position}
          rotationZ={cloud.rotationZ}
          mousePos={mousePos.current}
          colorHex={colorScheme.hex}
        />
      ))}
    </>
  );
}

export default function ClubScene() {
  return (
    <Canvas
      camera={{ 
        position: [0, 0, 1], 
        fov: 60,
        near: 1,
        far: 1000
      }}
      onCreated={({ camera }) => {
        camera.rotation.x = 1.16;
        camera.rotation.y = -0.12;
        camera.rotation.z = 0.27;
      }}
    >
      <Scene />
    </Canvas>
  );
}

