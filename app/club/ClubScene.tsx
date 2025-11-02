"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { useColorScheme } from "../ColorContext";

function CloudParticle({ 
  texture, 
  position,
  rotationZ,
  colorHex
}: { 
  texture: THREE.Texture; 
  position: [number, number, number];
  rotationZ: number;
  colorHex: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z -= 0.002;
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

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("https://raw.githubusercontent.com/navin-navi/codepen-assets/master/images/smoke.png", (loadedTexture) => {
      setTexture(loadedTexture);
    });
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
        color={colorScheme.leftLightColor || colorScheme.hex}
        intensity={1000}
        distance={1000}
        decay={2}
      />
      
      {/* Bottom Right Corner */}
      <pointLight 
        position={[200, -100, 200]} 
        color={colorScheme.rightLightColor || colorScheme.hex}
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
          colorHex={colorScheme.hex}
        />
      ))}
    </>
  );
}

export default function ClubScene() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
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

