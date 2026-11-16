import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sphere, Box, Cylinder, Torus, Stars } from '@react-three/drei';
import { gsap } from 'gsap';
import { GithubLogo, LinkedinLogo, ArrowRight, ArrowDown } from 'phosphor-react';
import { personalInfo } from '@/data/portfolioData';
import * as THREE from 'three';

/* ============================================================
   HERO KINETIC TYPOGRAPHY COMPONENT
   Strict Timing & Smooth Transition Architecture:
   - Visible duration: 4000ms (fully visible, resting at y: 0)
   - Exit transition: 500ms (smooth glide up to y: -40, opacity 1 -> 0, soft blur)
   - Outgoing text disappears completely before incoming appears
   - Entry transition: 500ms (smooth glide from y: 40 to y: 0, opacity 0 -> 1, blur clears)
   - Total cycle: 5.0 seconds per rotation, repeated continuously
   ============================================================ */
/* ============================================================
   HERO KINETIC TYPOGRAPHY COMPONENT
   Strict 12-Second Master Timeline & Alternating Text Engine:
   - 0–4 sec:   First text fully visible (4.0s)
   - 4–5 sec:   First text smoothly exits upward (1.0s)
   - 5–6 sec:   Next text smoothly enters from below (1.0s)
   - 6–10 sec:  Second text fully visible (4.0s)
   - 10–11 sec: Second text smoothly exits upward (1.0s)
   - 11–12 sec: Next text smoothly enters from below (1.0s)
   - Repeats continuously (12-second loop)
   - CSS Grid 1/1 overlap prevents text jumping across varying word lengths
   ============================================================ */
interface MoncyTextSegment {
  text: string;
  isCyan?: boolean;
}

interface MoncyRollingLineProps {
  segments: MoncyTextSegment[];
  alternateSegments?: MoncyTextSegment[];
  initialDelay?: number;
  className?: string;
}

const MoncyRollingLine: React.FC<MoncyRollingLineProps> = ({
  segments,
  alternateSegments,
  initialDelay = 0,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);

  const layer2Segments = alternateSegments || segments;

  useEffect(() => {
    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;
    if (!layer1 || !layer2) return;

    const chars1 = layer1.querySelectorAll<HTMLElement>('.char');
    const chars2 = layer2.querySelectorAll<HTMLElement>('.char');
    if (!chars1.length || !chars2.length) return;

    // Respect reduced-motion preferences
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      gsap.set(chars1, { opacity: 1, y: 0, filter: 'blur(0px)' });
      gsap.set(chars2, { opacity: 0, y: 40, filter: 'blur(0px)' });
      return;
    }

    // Initial state: Layer 1 is immediately fully visible; Layer 2 waits below
    gsap.set(chars1, { opacity: 1, y: 0, filter: 'blur(0px)' });
    gsap.set(chars2, { opacity: 0, y: 40, filter: 'blur(4px)' });

    // Micro-stagger calculations so exit and entry each take precisely 1.0s (1000ms)
    const calcTiming = (charCount: number) => {
      const stagger = charCount > 1 ? Math.min(0.02, 0.15 / (charCount - 1)) : 0;
      const duration = 1.0 - (charCount - 1) * stagger;
      return { duration, stagger };
    };

    const timing1 = calcTiming(chars1.length);
    const timing2 = calcTiming(chars2.length);

    // Continuous 12-second cycle timeline:
    // 0–4s (visible) -> 4–5s (exit 1s) -> 5–6s (entry 1s) -> 6–10s (visible) -> 10–11s (exit 1s) -> 11–12s (entry 1s)
    const tl = gsap.timeline({
      repeat: -1,
      delay: initialDelay,
    });

    // ── 0–4 sec: First text fully visible (4s) ──
    tl.to({}, { duration: 4.0 })

      // ── 4–5 sec: First text smoothly exits upward over 1.0s ──
      .to(chars1, {
        y: -40,
        opacity: 0,
        filter: 'blur(4px)',
        duration: timing1.duration,
        stagger: timing1.stagger,
        ease: 'power2.inOut',
      })

      // ── 5–6 sec: Next text smoothly enters from below over 1.0s ──
      .fromTo(
        chars2,
        {
          y: 40,
          opacity: 0,
          filter: 'blur(4px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: timing2.duration,
          stagger: timing2.stagger,
          ease: 'power2.out',
          immediateRender: false,
        }
      )

      // ── 6–10 sec: Second text fully visible (4s) ──
      .to({}, { duration: 4.0 })

      // ── 10–11 sec: Second text smoothly exits upward over 1.0s ──
      .to(chars2, {
        y: -40,
        opacity: 0,
        filter: 'blur(4px)',
        duration: timing2.duration,
        stagger: timing2.stagger,
        ease: 'power2.inOut',
      })

      // ── 11–12 sec: Next text smoothly enters from below over 1.0s ──
      .fromTo(
        chars1,
        {
          y: 40,
          opacity: 0,
          filter: 'blur(4px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: timing1.duration,
          stagger: timing1.stagger,
          ease: 'power2.out',
          immediateRender: false,
        }
      );

    return () => {
      tl.kill();
      gsap.killTweensOf(chars1);
      gsap.killTweensOf(chars2);
    };
  }, [initialDelay]);

  // Interactive hover cascade
  const handleMouseEnter = () => {
    const chars1 = layer1Ref.current?.querySelectorAll<HTMLElement>('.char');
    if (!chars1 || !chars1.length) return;
    gsap.to(chars1, {
      y: -8,
      duration: 0.2,
      stagger: 0.02,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
    });
  };

  const renderSegments = (segs: MoncyTextSegment[]) => {
    return segs.map((seg, sIdx) => {
      const isCyan = seg.isCyan;
      const chars = seg.text.split('');
      return (
        <span
          key={sIdx}
          className={`inline-flex items-baseline font-black tracking-tight ${
            isCyan
              ? 'text-[#00f5ff] drop-shadow-[0_0_24px_rgba(0,245,255,0.7)]'
              : 'text-white drop-shadow-[0_2px_14px_rgba(255,255,255,0.22)]'
          }`}
          style={{
            color: isCyan ? '#00f5ff' : '#ffffff',
          }}
        >
          {chars.map((char, cIdx) => (
            <span
              key={`${sIdx}-${cIdx}`}
              className="char inline-block will-change-transform"
              style={{
                display: 'inline-block',
                color: isCyan ? '#00f5ff' : '#ffffff',
                lineHeight: '1.15',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`relative inline-grid grid-cols-1 grid-rows-1 overflow-hidden select-none cursor-pointer py-1 ${className}`}
      style={{ lineHeight: 1.15 }}
    >
      {/* Layer 1: Primary visible line */}
      <div
        ref={layer1Ref}
        className="flex items-baseline whitespace-nowrap"
        style={{ gridArea: '1 / 1' }}
      >
        {renderSegments(segments)}
      </div>

      {/* Layer 2: Alternate line occupying exact same grid cell to prevent any layout shifts */}
      <div
        ref={layer2Ref}
        className="flex items-baseline whitespace-nowrap pointer-events-none"
        style={{ gridArea: '1 / 1' }}
        aria-hidden="true"
      >
        {renderSegments(layer2Segments)}
      </div>
    </div>
  );
};

/* ============================================================
   3D DEVELOPER CHARACTER & WORKSPACE SCENE
   Preserves the existing center 3D boy sitting at modern desk
   ============================================================ */

function DeveloperCharacter() {
  const charGroupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Breathing & subtle typing
    if (charGroupRef.current) {
      charGroupRef.current.position.y = Math.sin(t * 1.5) * 0.015;
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.6) * 0.05;
      headRef.current.rotation.x = 0.08 + Math.cos(t * 0.8) * 0.03;
    }
    if (leftHandRef.current && rightHandRef.current) {
      leftHandRef.current.position.y = -0.08 + Math.sin(t * 8) * 0.008;
      rightHandRef.current.position.y = -0.08 + Math.cos(t * 7.5) * 0.008;
    }
  });

  return (
    <group position={[0, -0.4, 0.45]}>
      {/* ── ERGONOMIC OFFICE CHAIR ── */}
      <group position={[0, -0.2, 0.15]}>
        {/* Star Base & Wheels */}
        <Cylinder args={[0.04, 0.04, 0.35, 12]} position={[0, -0.3, 0]}>
          <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.8} />
        </Cylinder>
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]}>
            <Box args={[0.36, 0.03, 0.04]} position={[0.18, -0.46, 0]}>
              <meshStandardMaterial color="#080c14" metalness={0.9} roughness={0.2} />
            </Box>
            <Sphere args={[0.035, 8, 8]} position={[0.34, -0.49, 0]}>
              <meshStandardMaterial color="#1a2030" roughness={0.5} />
            </Sphere>
          </group>
        ))}

        {/* Seat Cushion */}
        <Box args={[0.7, 0.09, 0.65]} position={[0, -0.1, 0]}>
          <meshStandardMaterial color="#141a29" roughness={0.6} />
        </Box>
        <Box args={[0.72, 0.015, 0.67]} position={[0, -0.06, 0]}>
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.6} />
        </Box>

        {/* Curved Backrest */}
        <group position={[0, 0.35, 0.28]} rotation={[-0.1, 0, 0]}>
          <Box args={[0.62, 0.75, 0.08]}>
            <meshStandardMaterial color="#111625" roughness={0.5} />
          </Box>
          {/* Lumbar support */}
          <Box args={[0.54, 0.16, 0.1]} position={[0, -0.15, -0.02]}>
            <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.4} />
          </Box>
          {/* Headrest */}
          <Box args={[0.4, 0.18, 0.07]} position={[0, 0.48, -0.02]}>
            <meshStandardMaterial color="#141a29" roughness={0.6} />
          </Box>
        </group>

        {/* Armrests */}
        {[-0.38, 0.38].map((x, i) => (
          <group key={i} position={[x, 0.05, 0]}>
            <Cylinder args={[0.02, 0.02, 0.28, 8]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#080c14" metalness={0.8} />
            </Cylinder>
            <Box args={[0.08, 0.03, 0.36]} position={[0, 0.14, -0.03]}>
              <meshStandardMaterial color="#1e2638" roughness={0.4} />
            </Box>
          </group>
        ))}
      </group>

      {/* ── DEVELOPER BOY FIGURE ── */}
      <group ref={charGroupRef}>
        {/* Legs sitting */}
        <Box args={[0.18, 0.16, 0.48]} position={[-0.16, -0.18, -0.12]}>
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </Box>
        <Box args={[0.18, 0.16, 0.48]} position={[0.16, -0.18, -0.12]}>
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </Box>
        {/* Calves & Shoes */}
        <Box args={[0.14, 0.38, 0.14]} position={[-0.16, -0.42, -0.32]}>
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </Box>
        <Box args={[0.14, 0.38, 0.14]} position={[0.16, -0.42, -0.32]}>
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </Box>
        {/* Stylish Sneakers */}
        <Box args={[0.15, 0.1, 0.26]} position={[-0.16, -0.62, -0.27]}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </Box>
        <Box args={[0.15, 0.1, 0.26]} position={[0.16, -0.62, -0.27]}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </Box>

        {/* Torso & Hoodie */}
        <group position={[0, 0.15, 0.08]} rotation={[-0.08, 0, 0]}>
          <Box args={[0.55, 0.52, 0.32]}>
            <meshStandardMaterial color="#172033" roughness={0.6} />
          </Box>
          {/* Hoodie pocket */}
          <Box args={[0.38, 0.16, 0.05]} position={[0, -0.12, -0.16]}>
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </Box>
          {/* Glowing logo / chest accent */}
          <Sphere args={[0.04, 16, 16]} position={[0, 0.08, -0.165]}>
            <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={2} />
          </Sphere>

          {/* Shoulders & Arms typing on desk */}
          {/* Left Arm */}
          <group position={[-0.32, 0.16, -0.05]} rotation={[0.65, 0.15, -0.15]}>
            <Cylinder args={[0.07, 0.065, 0.32, 12]} position={[0, -0.13, 0]}>
              <meshStandardMaterial color="#172033" roughness={0.6} />
            </Cylinder>
            <group position={[0, -0.28, 0]} rotation={[-0.9, -0.2, 0]}>
              <Cylinder args={[0.06, 0.055, 0.32, 12]} position={[0, -0.13, 0]}>
                <meshStandardMaterial color="#172033" roughness={0.6} />
              </Cylinder>
              <group ref={leftHandRef} position={[0, -0.29, 0]}>
                <Box args={[0.09, 0.04, 0.11]}>
                  <meshStandardMaterial color="#f6c8a2" roughness={0.5} />
                </Box>
              </group>
            </group>
          </group>

          {/* Right Arm */}
          <group position={[0.32, 0.16, -0.05]} rotation={[0.65, -0.15, 0.15]}>
            <Cylinder args={[0.07, 0.065, 0.32, 12]} position={[0, -0.13, 0]}>
              <meshStandardMaterial color="#172033" roughness={0.6} />
            </Cylinder>
            <group position={[0, -0.28, 0]} rotation={[-0.9, 0.2, 0]}>
              <Cylinder args={[0.06, 0.055, 0.32, 12]} position={[0, -0.13, 0]}>
                <meshStandardMaterial color="#172033" roughness={0.6} />
              </Cylinder>
              <group ref={rightHandRef} position={[0, -0.29, 0]}>
                <Box args={[0.09, 0.04, 0.11]}>
                  <meshStandardMaterial color="#f6c8a2" roughness={0.5} />
                </Box>
              </group>
            </group>
          </group>
        </group>

        {/* Neck & Head */}
        <group ref={headRef} position={[0, 0.54, 0.05]}>
          <Cylinder args={[0.07, 0.08, 0.12, 12]} position={[0, -0.06, 0]}>
            <meshStandardMaterial color="#f6c8a2" roughness={0.5} />
          </Cylinder>
          <Sphere args={[0.18, 24, 24]}>
            <meshStandardMaterial color="#f6c8a2" roughness={0.5} />
          </Sphere>
          {/* Haircut */}
          <group position={[0, 0.06, 0.02]}>
            <Sphere args={[0.19, 16, 16]} position={[0, 0.04, -0.02]}>
              <meshStandardMaterial color="#22150c" roughness={0.8} />
            </Sphere>
            <Box args={[0.22, 0.09, 0.18]} position={[0, 0.12, -0.04]}>
              <meshStandardMaterial color="#22150c" roughness={0.8} />
            </Box>
          </group>
          {/* Headphones */}
          <Torus args={[0.2, 0.025, 8, 24]} rotation={[0, 0, Math.PI / 2]} position={[0, 0.05, 0]}>
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </Torus>
          {[-0.2, 0.2].map((x, i) => (
            <group key={i} position={[x, 0.02, 0]}>
              <Cylinder args={[0.06, 0.06, 0.05, 16]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#1e293b" />
              </Cylinder>
              <Cylinder args={[0.04, 0.04, 0.055, 16]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.2} />
              </Cylinder>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
}

function WorkspaceScene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle continuous natural rotation + smooth mouse parallax
    groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.18 + mouseRef.current.x * 0.12;
    groupRef.current.rotation.x = 0.08 + Math.cos(t * 0.25) * 0.04 + mouseRef.current.y * 0.06;
    groupRef.current.position.y = -0.15 + Math.sin(t * 0.5) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* ── THE DEVELOPER BOY SITTING ON CHAIR ── */}
      <DeveloperCharacter />

      {/* ── THE MODERN WORKING DESK ── */}
      <group position={[0, -0.48, -0.25]}>
        {/* Desk Surface */}
        <Box args={[3.2, 0.08, 1.4]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#131724" roughness={0.3} metalness={0.7} />
        </Box>
        {/* Subtle glowing edge strip */}
        <Box args={[3.2, 0.015, 0.015]} position={[0, 0.042, 0.7]}>
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.8} />
        </Box>
        {/* Sturdy Minimalist Metal Legs */}
        {[[-1.4, -0.46, -0.5], [1.4, -0.46, -0.5], [-1.4, -0.46, 0.5], [1.4, -0.46, 0.5]].map((pos, i) => (
          <Box key={i} args={[0.07, 0.92, 0.07]} position={pos as [number, number, number]}>
            <meshStandardMaterial color="#090d16" roughness={0.4} metalness={0.9} />
          </Box>
        ))}
        {/* Desk Footrest Bar */}
        <Cylinder args={[0.025, 0.025, 2.8, 8]} position={[0, -0.7, -0.2]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#090d16" metalness={0.9} />
        </Cylinder>
      </group>

      {/* ── CURVED MAIN MONITOR ── */}
      <group position={[0, 0.32, -0.72]} rotation={[-0.05, 0, 0]}>
        <Box args={[2.0, 1.15, 0.06]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#0a0e18" roughness={0.2} metalness={0.9} />
        </Box>
        <Box args={[1.9, 1.05, 0.01]} position={[0, 0, 0.035]}>
          <meshStandardMaterial color="#040914" emissive="#021422" emissiveIntensity={1.6} />
        </Box>
        {/* Dynamic Code Lines */}
        {[0.36, 0.22, 0.08, -0.06, -0.2, -0.34].map((y, i) => (
          <Box
            key={i}
            args={[0.65 + (i % 3) * 0.35, 0.028, 0.012]}
            position={[-0.4 + (i % 2) * 0.2, y, 0.042]}
          >
            <meshStandardMaterial
              color={i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#a855f7' : '#10b981'}
              emissive={i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#a855f7' : '#10b981'}
              emissiveIntensity={1.2}
            />
          </Box>
        ))}
        <Box args={[1.95, 1.1, 0.01]} position={[0, 0, -0.035]}>
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.5} />
        </Box>
        <Box args={[0.1, 0.45, 0.08]} position={[0, -0.65, -0.04]}>
          <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.8} />
        </Box>
        <Cylinder args={[0.26, 0.28, 0.03, 20]} position={[0, -0.84, 0]}>
          <meshStandardMaterial color="#0b0f19" roughness={0.2} metalness={0.9} />
        </Cylinder>
      </group>

      {/* ── MECHANICAL KEYBOARD & MOUSE ── */}
      <group position={[0, -0.42, 0.02]}>
        <Box args={[1.1, 0.035, 0.38]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#101524" roughness={0.4} metalness={0.7} />
        </Box>
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
            <Box
              key={`${row}-${col}`}
              args={[0.08, 0.025, 0.075]}
              position={[-0.45 + col * 0.1, 0.024, -0.11 + row * 0.11]}
            >
              <meshStandardMaterial
                color="#1b2439"
                roughness={0.6}
                emissive="#00f5ff"
                emissiveIntensity={0.15}
              />
            </Box>
          ))
        )}
        <Box args={[0.34, 0.005, 0.32]} position={[0.78, -0.01, 0]}>
          <meshStandardMaterial color="#080c14" roughness={0.9} />
        </Box>
        <Box args={[0.12, 0.04, 0.18]} position={[0.78, 0.02, 0]}>
          <meshStandardMaterial color="#131929" roughness={0.3} metalness={0.6} />
        </Box>
        <Cylinder args={[0.012, 0.012, 0.04, 12]} position={[0.78, 0.04, -0.04]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={2} />
        </Cylinder>
      </group>

      {/* ── ACCESSORIES: MUG, LAMP ── */}
      <group position={[-0.95, -0.36, -0.1]}>
        <Cylinder args={[0.085, 0.075, 0.18, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#172033" roughness={0.4} />
        </Cylinder>
        <Torus args={[0.07, 0.018, 8, 20]} position={[0.085, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#172033" />
        </Torus>
      </group>

      <group position={[1.15, -0.44, -0.55]}>
        <Cylinder args={[0.12, 0.13, 0.03, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#090d16" metalness={0.8} />
        </Cylinder>
        <Cylinder args={[0.018, 0.018, 0.7, 8]} position={[0, 0.35, 0]} rotation={[0, 0, -0.15]}>
          <meshStandardMaterial color="#090d16" metalness={0.8} />
        </Cylinder>
        <Box args={[0.3, 0.06, 0.12]} position={[-0.2, 0.68, 0.1]} rotation={[0.2, 0, 0.3]}>
          <meshStandardMaterial color="#141a29" metalness={0.7} />
        </Box>
        <pointLight position={[-0.2, 0.6, 0.1]} intensity={1.8} color="#fed7aa" distance={2.5} />
      </group>
    </group>
  );
}

/* ============================================================
   THREE-COLUMN HERO SECTION (REFINED MONCY.DEV INSPIRATION)
   ============================================================ */
const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. "hello, i'm" gentle reveal
      tl.fromTo(
        '.hero-greeting',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
        // 2. Center 3D Workspace smooth scale and fade-in
        .fromTo(
          '.hero-center-3d',
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
          '-=0.3'
        )
        // 3. Buttons, social row, and supporting description fade-ins
        .fromTo(
          '.hero-fade-item',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-background pointer-events-none" />
      <div
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(180 100% 50% / 0.07), transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(271 81% 56% / 0.07), transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">
        {/* ── THREE-COLUMN COMPOSITION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* ════════ COLUMN 1: LEFT – PERSONAL INTRODUCTION & ACTIONS ════════ */}
          <div
            ref={leftColRef}
            className="lg:col-span-3 space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            {/* "hello, i'm" minimal greeting */}
            <div className="space-y-1.5">
              <p className="hero-greeting text-sm sm:text-base font-normal text-slate-300/90 tracking-wide font-sans">
                hello, i'm
              </p>

              {/* Animated Name: DEBARGHA MONDAL */}
              <h1
                className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-tight select-none"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                <div className="flex flex-col items-center lg:items-start">
                  <MoncyRollingLine
                    segments={[{ text: 'DEBARGHA', isCyan: true }]}
                  />
                  <MoncyRollingLine
                    segments={[{ text: 'MONDAL', isCyan: false }]}
                  />
                </div>
              </h1>
            </div>

            {/* Side-by-Side Pill-Shaped Action Buttons */}
            <div className="hero-fade-item flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              {/* Button 1: View Work */}
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-neon pulse-glow group"
                style={{ background: 'var(--gradient-button)' }}
              >
                <span>View Work</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: Contact Me */}
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-white border border-white/20 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/[0.1] hover:border-primary/60 hover:text-primary"
              >
                <span>Contact Me</span>
              </button>
            </div>

            {/* Follow Me Social Links Row */}
            <div className="hero-fade-item flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs pt-1 flex-wrap">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-400">
                FOLLOW ME
              </span>
              <span className="text-slate-600 font-light select-none">—</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-primary transition-colors duration-200 group"
              >
                <GithubLogo size={16} weight="bold" className="text-slate-400 group-hover:text-primary transition-colors" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-600 select-none">|</span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-primary transition-colors duration-200 group"
              >
                <LinkedinLogo size={16} weight="bold" className="text-slate-400 group-hover:text-primary transition-colors" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* ════════ COLUMN 2: CENTER – 3D DEVELOPER WORKSPACE (PRESERVED) ════════ */}
          <div className="lg:col-span-6 hero-center-3d relative h-[420px] sm:h-[500px] lg:h-[620px] w-full order-1 lg:order-2 flex items-center justify-center">
            {/* Subtle glow backdrop */}
            <div
              className="absolute inset-8 rounded-full pointer-events-none blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, #00f5ff 0%, #a855f7 60%, transparent 80%)' }}
            />

            <Canvas
              className="rounded-2xl"
              style={{ width: '100%', height: '100%', background: 'transparent' }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              dpr={[1, 1.5]}
            >
              <PerspectiveCamera makeDefault position={[0, 0.9, 4.3]} fov={45} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 5, 4]} intensity={2.2} color="#ffffff" />
              <pointLight position={[-3, 2, -2]} intensity={1.8} color="#a855f7" />
              <pointLight position={[0, 0.4, 0.6]} intensity={2.0} color="#00f5ff" />
              <pointLight position={[0, -0.6, 1]} intensity={0.8} color="#10b981" />
              <Stars radius={70} depth={30} count={600} factor={2.5} fade />
              <WorkspaceScene />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3.2}
                maxPolarAngle={Math.PI / 1.9}
                autoRotate
                autoRotateSpeed={1.0}
              />
            </Canvas>

            {/* Interactive hint */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 glass px-3.5 py-1 rounded-full text-[11px] text-muted-foreground font-light pointer-events-none flex items-center gap-1.5 opacity-70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              <span>3D Developer Workspace · Drag or observe rotation</span>
            </div>
          </div>

          {/* ════════ COLUMN 3: RIGHT – PROFESSIONAL IDENTITY & INTRODUCTION ════════ */}
          <div
            ref={rightColRef}
            className="lg:col-span-3 space-y-6 text-center lg:text-left order-3"
          >
            {/* Subtitle / Kicker */}
            <div className="space-y-1.5">
              <span className="hero-fade-item text-xs font-semibold tracking-[0.2em] uppercase block text-primary font-mono">
                A Creative
              </span>

              {/* Animated Designation: Developer / Designer Alternating */}
              <h2
                className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight leading-tight select-none"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                <div className="flex flex-col items-center lg:items-start">
                  <MoncyRollingLine
                    segments={[{ text: 'Developer', isCyan: true }]}
                    alternateSegments={[{ text: 'Designer', isCyan: true }]}
                  />
                </div>
              </h2>
            </div>

            {/* Supporting Description */}
            <div className="hero-fade-item">
              <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
                I design and develop scalable web applications, intuitive interfaces, and robust backend systems with modern technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 text-center hidden md:flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest"
          >
            <span>Explore More</span>
            <ArrowDown size={14} className="text-primary animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
