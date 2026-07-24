"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─── Jellyfish Bell (dome body) ─────────────────────────────── */
function JellyfishBell() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      // Gentle breathing scale
      const pulse = 1 + Math.sin(t * 1.8) * 0.06;
      meshRef.current.scale.set(pulse, 0.85 + Math.sin(t * 1.8) * 0.05, pulse);
    }
    if (matRef.current) {
      // Pulsing emissive glow
      const glow = 0.4 + Math.sin(t * 1.8) * 0.25;
      matRef.current.emissiveIntensity = glow;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.3, 0]}>
      <sphereGeometry args={[1, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
      <meshStandardMaterial
        ref={matRef}
        color="#1C7293"
        emissive="#2EB093"
        emissiveIntensity={0.4}
        transparent
        opacity={0.75}
        side={THREE.DoubleSide}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

/* ─── Inner bell rim (lip) ───────────────────────────────────── */
function BellRim() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      const pulse = 1 + Math.sin(t * 1.8) * 0.06;
      meshRef.current.scale.set(pulse, 1, pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.12, 0]} rotation={[0, 0, 0]}>
      <torusGeometry args={[0.88, 0.06, 12, 32]} />
      <meshStandardMaterial
        color="#2EB093"
        emissive="#2EB093"
        emissiveIntensity={0.6}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

/* ─── Single tentacle (curved tube) ──────────────────────────── */
function Tentacle({ angle, length, delay }: { angle: number; length: number; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const r = 0.5;
    const points: THREE.Vector3[] = [];
    const startX = Math.cos(angle) * r;
    const startZ = Math.sin(angle) * r;

    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const drift = Math.sin(t * Math.PI * 1.5) * 0.15;
      points.push(
        new THREE.Vector3(
          startX + drift * Math.cos(angle + 1),
          -t * length,
          startZ + drift * Math.sin(angle + 1)
        )
      );
    }
    return new THREE.CatmullRomCurve3(points);
  }, [angle, length]);

  const tubeGeo = useMemo(
    () => new THREE.TubeGeometry(curve, 16, 0.025, 6, false),
    [curve]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    if (meshRef.current) {
      // Gentle sway
      meshRef.current.rotation.x = Math.sin(t * 0.8) * 0.08;
      meshRef.current.rotation.z = Math.cos(t * 0.6) * 0.06;
    }
  });

  return (
    <mesh ref={meshRef} geometry={tubeGeo} position={[0, -0.15, 0]}>
      <meshStandardMaterial
        color="#2EB093"
        emissive="#1C7293"
        emissiveIntensity={0.35}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

/* ─── Jellyfish group (bell + rim + tentacles) ───────────────── */
function Jellyfish() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Slow bob + rotation
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.25;
      groupRef.current.rotation.y = t * 0.15;
    }
  });

  const tentacles = useMemo(() => {
    const count = 6;
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      length: 1.4 + (i % 2) * 0.5,
      delay: i * 0.4,
    }));
  }, []);

  return (
    <group ref={groupRef}>
      <JellyfishBell />
      <BellRim />
      {tentacles.map((t, i) => (
        <Tentacle key={i} angle={t.angle} length={t.length} delay={t.delay} />
      ))}
    </group>
  );
}

/* ─── Scene (exported as default) ────────────────────────────── */
export default function JellyfishScene() {
  return (
    <div
      className="pointer-events-none"
      style={{ width: 280, height: 280 }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "low-power", alpha: true }}
        camera={{ position: [0, 0.5, 4], fov: 40 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 3, 4]} intensity={0.6} color="#38bdf8" />
        <pointLight position={[-2, -1, 2]} intensity={0.3} color="#2EB093" />

        <Jellyfish />

        {/* Bioluminescent plankton particles */}
        <Sparkles
          count={40}
          scale={5}
          size={1.5}
          speed={0.3}
          color="#2EB093"
          opacity={0.5}
        />
      </Canvas>
    </div>
  );
}
