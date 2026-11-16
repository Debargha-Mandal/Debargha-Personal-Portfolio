import React, { useEffect, useRef, useState, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Sphere, Box, Cylinder, Torus, OrbitControls, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { frontendSkills, backendSkills } from '@/data/portfolioData';
import { CaretRight, Sparkle, TerminalWindow, Code } from 'phosphor-react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   ERROR BOUNDARY FOR 3D CANVAS
   Guarantees that the UI never turns blank if WebGL fails.
   ============================================================ */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('3D Canvas encountered an issue, falling back to backup visual:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/* ============================================================
   FALLBACK BACKUP VISUAL
   Sleek glassmorphic card with developer pod illustration
   ============================================================ */
function StudioFallbackVisual() {
  return (
    <div className="w-full h-full rounded-3xl glass border border-primary/30 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-glass">
      <div className="w-24 h-24 rounded-full bg-gradient-button p-1 shadow-neon mb-4 animate-pulse">
        <div className="w-full h-full rounded-full bg-[#0d1320] flex items-center justify-center text-4xl">
          👨‍💻
        </div>
      </div>
      <h4 className="text-lg font-bold text-white tracking-tight mb-1">
        Full-Stack Engineering Studio
      </h4>
      <p className="text-xs text-primary font-mono">
        Active 3D Developer Workspace
      </p>
    </div>
  );
}

/* ============================================================
   REALISTIC 3D DEVELOPER CHARACTER IN DESK ENVIRONMENT
   Consistent with the homepage's 3D developer workspace:
   - Developer character sitting in ergonomic mesh office chair
   - Natural typing & subtle breathing animations
   - Headphones with glowing cyan accent rings
   - Hoodie with illuminated tech crest
   ============================================================ */

function DeveloperFigure() {
  const charRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Natural idle breathing motion
    if (charRef.current) {
      charRef.current.position.y = Math.sin(t * 1.6) * 0.015;
    }
    // Subconscious head movement looking across dual displays
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.7) * 0.08;
      headRef.current.rotation.x = 0.06 + Math.cos(t * 0.9) * 0.03;
    }
    // Subtle typing micro-motion on mechanical keyboard
    if (leftHandRef.current && rightHandRef.current) {
      leftHandRef.current.position.y = -0.06 + Math.sin(t * 8.5) * 0.007;
      rightHandRef.current.position.y = -0.06 + Math.cos(t * 7.8) * 0.007;
    }
  });

  return (
    <group position={[0, -0.38, 0.42]}>
      {/* ── ERGONOMIC OFFICE CHAIR ── */}
      <group position={[0, -0.2, 0.14]}>
        {/* Star Base & Wheels */}
        <Cylinder args={[0.035, 0.035, 0.32, 12]} position={[0, -0.28, 0]}>
          <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.85} />
        </Cylinder>
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]}>
            <Box args={[0.34, 0.025, 0.035]} position={[0.17, -0.42, 0]}>
              <meshStandardMaterial color="#080c14" metalness={0.9} roughness={0.2} />
            </Box>
            <Sphere args={[0.03, 8, 8]} position={[0.32, -0.44, 0]}>
              <meshStandardMaterial color="#1a2030" roughness={0.6} />
            </Sphere>
          </group>
        ))}

        {/* Seat Cushion Pan with Cyan Accent Piping */}
        <Box args={[0.66, 0.08, 0.62]} position={[0, -0.08, 0]}>
          <meshStandardMaterial color="#111827" roughness={0.65} />
        </Box>
        <Box args={[0.68, 0.012, 0.64]} position={[0, -0.04, 0]}>
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.6} />
        </Box>

        {/* Curved Mesh Backrest */}
        <group position={[0, 0.34, 0.26]} rotation={[-0.1, 0, 0]}>
          <Box args={[0.58, 0.72, 0.07]}>
            <meshStandardMaterial color="#0b1120" roughness={0.6} />
          </Box>
          {/* Lumbar Spine Support */}
          <Box args={[0.5, 0.14, 0.09]} position={[0, -0.14, -0.02]}>
            <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.4} />
          </Box>
          {/* Headrest */}
          <Box args={[0.36, 0.16, 0.06]} position={[0, 0.46, -0.02]}>
            <meshStandardMaterial color="#111827" roughness={0.6} />
          </Box>
        </group>

        {/* Armrests */}
        {[-0.36, 0.36].map((x, i) => (
          <group key={i} position={[x, 0.06, 0]}>
            <Cylinder args={[0.018, 0.018, 0.26, 8]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#080c14" metalness={0.85} />
            </Cylinder>
            <Box args={[0.08, 0.028, 0.32]} position={[0, 0.13, -0.02]}>
              <meshStandardMaterial color="#1e293b" roughness={0.4} />
            </Box>
          </group>
        ))}
      </group>

      {/* ── DEVELOPER BOY FIGURE ── */}
      <group ref={charRef}>
        {/* Legs sitting */}
        <Box args={[0.18, 0.16, 0.46]} position={[-0.15, -0.16, -0.1]}>
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </Box>
        <Box args={[0.18, 0.16, 0.46]} position={[0.15, -0.16, -0.1]}>
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </Box>
        {/* Calves & Shoes */}
        <Box args={[0.13, 0.36, 0.13]} position={[-0.15, -0.4, -0.28]}>
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </Box>
        <Box args={[0.13, 0.36, 0.13]} position={[0.15, -0.4, -0.28]}>
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </Box>
        {/* Modern Sneakers with subtle cyan rim */}
        <Box args={[0.14, 0.09, 0.25]} position={[-0.15, -0.58, -0.23]}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </Box>
        <Box args={[0.14, 0.09, 0.25]} position={[0.15, -0.58, -0.23]}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </Box>

        {/* Torso & Tech Hoodie */}
        <group position={[0, 0.15, 0.08]} rotation={[-0.08, 0, 0]}>
          <Box args={[0.54, 0.5, 0.3]}>
            <meshStandardMaterial color="#161f33" roughness={0.6} />
          </Box>
          {/* Hoodie Pocket */}
          <Box args={[0.36, 0.15, 0.04]} position={[0, -0.11, -0.155]}>
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </Box>
          {/* Glowing Engineering Crest */}
          <Sphere args={[0.038, 16, 16]} position={[0, 0.08, -0.155]}>
            <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={2.0} />
          </Sphere>

          {/* Shoulders & Arms Typing on Desk */}
          {/* Left Arm */}
          <group position={[-0.3, 0.15, -0.04]} rotation={[0.65, 0.15, -0.15]}>
            <Cylinder args={[0.065, 0.06, 0.3, 10]} position={[0, -0.12, 0]}>
              <meshStandardMaterial color="#161f33" roughness={0.6} />
            </Cylinder>
            <group position={[0, -0.26, 0]} rotation={[-0.88, -0.2, 0]}>
              <Cylinder args={[0.055, 0.05, 0.3, 10]} position={[0, -0.12, 0]}>
                <meshStandardMaterial color="#161f33" roughness={0.6} />
              </Cylinder>
              <group ref={leftHandRef} position={[0, -0.27, 0]}>
                <Box args={[0.085, 0.038, 0.1]}>
                  <meshStandardMaterial color="#f6c8a2" roughness={0.5} />
                </Box>
              </group>
            </group>
          </group>

          {/* Right Arm */}
          <group position={[0.3, 0.15, -0.04]} rotation={[0.65, -0.15, 0.15]}>
            <Cylinder args={[0.065, 0.06, 0.3, 10]} position={[0, -0.12, 0]}>
              <meshStandardMaterial color="#161f33" roughness={0.6} />
            </Cylinder>
            <group position={[0, -0.26, 0]} rotation={[-0.88, 0.2, 0]}>
              <Cylinder args={[0.055, 0.05, 0.3, 10]} position={[0, -0.12, 0]}>
                <meshStandardMaterial color="#161f33" roughness={0.6} />
              </Cylinder>
              <group ref={rightHandRef} position={[0, -0.27, 0]}>
                <Box args={[0.085, 0.038, 0.1]}>
                  <meshStandardMaterial color="#f6c8a2" roughness={0.5} />
                </Box>
              </group>
            </group>
          </group>
        </group>

        {/* Neck & Head */}
        <group ref={headRef} position={[0, 0.52, 0.05]}>
          <Cylinder args={[0.065, 0.075, 0.11, 12]} position={[0, -0.05, 0]}>
            <meshStandardMaterial color="#f6c8a2" roughness={0.5} />
          </Cylinder>
          {/* Head Sphere */}
          <Sphere args={[0.17, 20, 20]}>
            <meshStandardMaterial color="#f6c8a2" roughness={0.5} />
          </Sphere>
          {/* Stylized Modern Haircut */}
          <group position={[0, 0.05, 0.02]}>
            <Sphere args={[0.18, 16, 16]} position={[0, 0.04, -0.02]}>
              <meshStandardMaterial color="#1a1109" roughness={0.8} />
            </Sphere>
            <Box args={[0.2, 0.08, 0.17]} position={[0, 0.11, -0.04]}>
              <meshStandardMaterial color="#1a1109" roughness={0.8} />
            </Box>
          </group>
          {/* Over-Ear Studio Headphones */}
          <Torus args={[0.19, 0.024, 8, 24]} rotation={[0, 0, Math.PI / 2]} position={[0, 0.04, 0]}>
            <meshStandardMaterial color="#0f172a" metalness={0.85} />
          </Torus>
          {[-0.19, 0.19].map((x, i) => (
            <group key={i} position={[x, 0.02, 0]}>
              <Cylinder args={[0.055, 0.055, 0.045, 16]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#1e293b" />
              </Cylinder>
              <Cylinder args={[0.038, 0.038, 0.05, 16]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.4} />
              </Cylinder>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
}

/* ============================================================
   ADVANCED DEVELOPER WORKSPACE WITH DUAL MONITORS & ACCESSORIES
   ============================================================ */
function DeveloperWorkspaceStudio() {
  const masterGroupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // 1. Continuous smooth 360° rotation around vertical axis (at calm, uniform speed)
    if (masterGroupRef.current) {
      masterGroupRef.current.rotation.y += delta * 0.45;
    }
    // 2. Counter-rotating holographic base accent
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <group ref={masterGroupRef} position={[0, -0.15, 0]}>
      {/* ── THE DEVELOPER BOY CHARACTER SITTING AT WORKSTATION ── */}
      <DeveloperFigure />

      {/* ── THE MODERN WORKING DESK ── */}
      <group position={[0, -0.46, -0.24]}>
        {/* Desktop Surface */}
        <Box args={[2.9, 0.07, 1.35]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#111625" roughness={0.3} metalness={0.7} />
        </Box>
        {/* Glowing Front Edge LED Strip (Cyan) */}
        <Box args={[2.9, 0.012, 0.012]} position={[0, 0.038, 0.67]}>
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.8} />
        </Box>
        {/* Heavy-Duty Metal Desk Legs */}
        {[[-1.25, -0.44, -0.45], [1.25, -0.44, -0.45], [-1.25, -0.44, 0.45], [1.25, -0.44, 0.45]].map((pos, i) => (
          <Box key={i} args={[0.07, 0.88, 0.07]} position={pos as [number, number, number]}>
            <meshStandardMaterial color="#080c14" roughness={0.35} metalness={0.9} />
          </Box>
        ))}
        {/* Footrest Stretcher Bar */}
        <Cylinder args={[0.022, 0.022, 2.5, 8]} position={[0, -0.66, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#090d16" metalness={0.9} />
        </Cylinder>
      </group>

      {/* ── MAIN ULTRAWIDE CURVED MONITOR WITH LIVE IDE CODE ── */}
      <group position={[0, 0.34, -0.68]} rotation={[-0.04, 0, 0]}>
        {/* Display Chassis */}
        <Box args={[1.9, 1.05, 0.05]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.9} />
        </Box>
        {/* Screen Glass Panel */}
        <Box args={[1.82, 0.96, 0.01]} position={[0, 0, 0.028]}>
          <meshStandardMaterial color="#030814" emissive="#011020" emissiveIntensity={1.5} />
        </Box>
        {/* Active Syntax Highlighted Code Lines */}
        {[
          { y: 0.32, w: 0.85, x: -0.3, color: '#00f5ff' },
          { y: 0.22, w: 0.6, x: -0.15, color: '#a855f7' },
          { y: 0.12, w: 0.95, x: -0.25, color: '#10b981' },
          { y: 0.02, w: 0.45, x: -0.1, color: '#00f5ff' },
          { y: -0.08, w: 0.75, x: -0.22, color: '#38bdf8' },
          { y: -0.18, w: 0.55, x: -0.08, color: '#f59e0b' },
          { y: -0.28, w: 0.8, x: -0.2, color: '#a855f7' },
        ].map((line, i) => (
          <Box key={i} args={[line.w, 0.024, 0.008]} position={[line.x, line.y, 0.035]}>
            <meshStandardMaterial color={line.color} emissive={line.color} emissiveIntensity={1.5} />
          </Box>
        ))}
        {/* Terminal Window on Right Half of Screen */}
        <Box args={[0.65, 0.75, 0.008]} position={[0.5, 0, 0.033]}>
          <meshStandardMaterial color="#020712" emissive="#001828" emissiveIntensity={1.1} />
        </Box>
        {[-0.2, -0.08, 0.04, 0.16, 0.28].map((y, i) => (
          <Box key={i} args={[0.48 - (i % 2) * 0.12, 0.016, 0.008]} position={[0.5, y, 0.04]}>
            <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.6} />
          </Box>
        ))}
        {/* Screen Rear Halo Bias Light */}
        <Box args={[1.88, 1.02, 0.01]} position={[0, 0, -0.028]}>
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.5} />
        </Box>
        {/* Heavy-Duty Monitor Stand */}
        <Box args={[0.09, 0.42, 0.07]} position={[0, -0.6, -0.03]}>
          <meshStandardMaterial color="#0a0f1a" roughness={0.3} metalness={0.8} />
        </Box>
        <Cylinder args={[0.22, 0.24, 0.025, 20]} position={[0, -0.78, 0]}>
          <meshStandardMaterial color="#0a0f1a" roughness={0.2} metalness={0.9} />
        </Cylinder>
      </group>

      {/* ── SECONDARY VERTICAL CODING MONITOR (PORTRAIT) ── */}
      <group position={[1.18, 0.38, -0.52]} rotation={[-0.04, -0.35, 0]}>
        <Box args={[0.56, 0.95, 0.04]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#080c14" roughness={0.2} metalness={0.9} />
        </Box>
        <Box args={[0.52, 0.9, 0.01]} position={[0, 0, 0.022]}>
          <meshStandardMaterial color="#040212" emissive="#0d041c" emissiveIntensity={1.4} />
        </Box>
        {/* Vertical server logs */}
        {[-0.35, -0.22, -0.09, 0.04, 0.17, 0.3].map((y, i) => (
          <Box key={i} args={[0.4 - (i % 2) * 0.08, 0.018, 0.008]} position={[0, y, 0.03]}>
            <meshStandardMaterial
              color={i % 2 === 0 ? '#a855f7' : '#00f5ff'}
              emissive={i % 2 === 0 ? '#a855f7' : '#00f5ff'}
              emissiveIntensity={1.6}
            />
          </Box>
        ))}
      </group>

      {/* ── MECHANICAL KEYBOARD & MOUSE ON DESK ── */}
      <group position={[0, -0.4, 0.02]}>
        {/* Large Felt/Leather Deskmat */}
        <Box args={[1.5, 0.006, 0.62]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#090d16" roughness={0.9} />
        </Box>
        <Box args={[1.51, 0.002, 0.63]} position={[0, -0.002, 0]}>
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.6} />
        </Box>

        {/* 75% Mechanical Keyboard */}
        <Box args={[0.84, 0.025, 0.3]} position={[-0.12, 0.016, 0.02]}>
          <meshStandardMaterial color="#111827" roughness={0.4} metalness={0.7} />
        </Box>
        {/* Backlit Keycaps Grid */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
            <Box
              key={`${row}-${col}`}
              args={[0.07, 0.018, 0.065]}
              position={[-0.42 + col * 0.088, 0.032, -0.08 + row * 0.085]}
            >
              <meshStandardMaterial
                color="#1b2439"
                roughness={0.6}
                emissive="#00f5ff"
                emissiveIntensity={0.2}
              />
            </Box>
          ))
        )}

        {/* Precision Wireless Mouse */}
        <Box args={[0.1, 0.034, 0.17]} position={[0.54, 0.02, 0.04]}>
          <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.6} />
        </Box>
        <Cylinder args={[0.012, 0.012, 0.022, 12]} position={[0.54, 0.038, -0.01]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={2.0} />
        </Cylinder>
      </group>

      {/* ── DESK ACCESSORIES: COFFEE, TASK LAMP, PLANT ── */}
      {/* Insulated Coffee Tumbler */}
      <group position={[-0.92, -0.34, -0.08]}>
        <Cylinder args={[0.075, 0.065, 0.18, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </Cylinder>
        <Torus args={[0.065, 0.014, 8, 20]} position={[0.075, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#1e293b" />
        </Torus>
      </group>

      {/* Modern Desk Task Lamp */}
      <group position={[1.15, -0.42, -0.45]}>
        <Cylinder args={[0.11, 0.12, 0.025, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#090d16" metalness={0.8} />
        </Cylinder>
        <Cylinder args={[0.016, 0.016, 0.65, 8]} position={[0, 0.32, 0]} rotation={[0, 0, -0.15]}>
          <meshStandardMaterial color="#090d16" metalness={0.8} />
        </Cylinder>
        <Box args={[0.28, 0.05, 0.1]} position={[-0.18, 0.62, 0.08]} rotation={[0.2, 0, 0.3]}>
          <meshStandardMaterial color="#141a29" metalness={0.7} />
        </Box>
      </group>

      {/* Minimalist Potted Desk Succulent */}
      <group position={[-1.15, -0.38, 0.2]}>
        <Cylinder args={[0.065, 0.05, 0.09, 6]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
        </Cylinder>
        <Sphere args={[0.05, 8, 8]} position={[0, 0.06, 0]}>
          <meshStandardMaterial color="#10b981" roughness={0.6} />
        </Sphere>
      </group>

      {/* ── HIGH-TECH FLOATING PEDESTAL STAGE ── */}
      <group position={[0, -0.92, -0.1]}>
        <Cylinder args={[1.9, 2.05, 0.07, 48]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#080c14" roughness={0.3} metalness={0.85} />
        </Cylinder>
        {/* Glowing Perimeter Ring */}
        <Torus args={[2.02, 0.014, 12, 64]} position={[0, 0.035, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.4} />
        </Torus>
        {/* Outer Concentric Purple Stage Ring */}
        <group ref={ringRef} position={[0, 0.045, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <Torus args={[2.22, 0.008, 8, 64]}>
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.8} />
          </Torus>
        </group>
      </group>

      {/* ── FLOATING HOLOGRAPHIC ARCHITECTURE BADGES ── */}
      <Float speed={2.2} rotationIntensity={0.25} floatIntensity={0.4}>
        <group position={[-1.65, 0.75, 0.15]} rotation={[0, 0.35, 0]}>
          <Box args={[0.55, 0.35, 0.01]}>
            <meshStandardMaterial
              color="#00f5ff"
              emissive="#00f5ff"
              emissiveIntensity={0.6}
              transparent
              opacity={0.35}
            />
          </Box>
          <Box args={[0.38, 0.024, 0.015]} position={[0, 0.06, 0.01]}>
            <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={2.0} />
          </Box>
          <Box args={[0.26, 0.02, 0.015]} position={[-0.06, -0.04, 0.01]}>
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.8} />
          </Box>
        </group>
      </Float>

      <Float speed={1.9} rotationIntensity={0.2} floatIntensity={0.35}>
        <group position={[1.65, 0.85, 0.1]} rotation={[0, -0.35, 0]}>
          <Box args={[0.52, 0.34, 0.01]}>
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={0.5}
              transparent
              opacity={0.32}
            />
          </Box>
          <Box args={[0.36, 0.024, 0.015]} position={[0, 0.05, 0.01]}>
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2.0} />
          </Box>
          <Box args={[0.24, 0.02, 0.015]} position={[0.05, -0.04, 0.01]}>
            <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={1.8} />
          </Box>
        </group>
      </Float>
    </group>
  );
}

/* ============================================================
   INTERACTIVE TECHNOLOGY PANEL WITH REVEAL PILLS
   ============================================================ */
interface TechItem {
  name: string;
  icon: string;
  desc: string;
}

function TechnologyPanel({
  title,
  subtitle,
  categoryLabel,
  technologies,
  accentColor,
}: {
  title: string;
  subtitle: string;
  categoryLabel: string;
  technologies: TechItem[];
  accentColor: 'cyan' | 'purple';
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const isCyan = accentColor === 'cyan';
  const colorHex = isCyan ? '#00f5ff' : '#a855f7';

  return (
    <div
      className="glass rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded((prev) => !prev)}
      style={{
        boxShadow: isHovered
          ? isCyan
            ? '0 12px 40px hsl(180 100% 50% / 0.18)'
            : '0 12px 40px hsl(271 81% 56% / 0.18)'
          : 'var(--shadow-glass)',
        borderColor: isHovered ? `${colorHex}60` : undefined,
      }}
    >
      {/* Top Accent Stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl transition-opacity duration-300"
        style={{
          background: isCyan ? 'var(--gradient-button)' : 'var(--gradient-purple)',
          opacity: isHovered ? 1 : 0.7,
        }}
      />

      {/* Ambient background glow */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
        style={{
          background: colorHex,
          opacity: isHovered ? 0.15 : 0.05,
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase block mb-1"
            style={{ color: colorHex }}
          >
            {categoryLabel}
          </span>
          <h3
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            {title}
          </h3>
        </div>

        {/* Status indicator / expand icon */}
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center glass border transition-transform duration-300 group-hover:scale-110"
          style={{
            borderColor: `${colorHex}40`,
            color: colorHex,
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          <CaretRight size={20} weight="bold" />
        </div>
      </div>

      <p className="text-sm text-muted-foreground font-light mb-6">{subtitle}</p>

      {/* Interactive Pills */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3 transition-all duration-300">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="group/pill inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: `${colorHex}30`,
              backgroundColor: isHovered ? `${colorHex}10` : 'hsl(var(--glass))',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
            title={tech.desc}
          >
            {/* Tech Logo */}
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Tech Name */}
            <span className="text-xs sm:text-sm font-medium text-foreground/90 group-hover/pill:text-primary transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile touch hint */}
      <div className="mt-4 text-[11px] text-muted-foreground/60 font-light flex items-center gap-1.5 sm:hidden">
        <Sparkle size={12} style={{ color: colorHex }} />
        <span>Tap to reveal & toggle details</span>
      </div>
    </div>
  );
}

/* ============================================================
   DEVELOPMENT EXPERTISE MAIN SECTION
   ============================================================ */

const DevelopmentExpertise: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle GSAP fade-in without hardcoding initial opacity-0
      gsap.from('.expertise-header', {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.expertise-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.expertise-3d-col', {
        opacity: 0,
        x: -30,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.expertise-content',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.expertise-panel', {
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.expertise-content',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="expertise" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background Orbs */}
      <div
        className="absolute top-1/3 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(180 100% 50% / 0.05), transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(271 81% 56% / 0.05), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="expertise-header text-center mb-16">
          <div className="section-label mb-3">Development Capabilities</div>
          <h2
            className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Engineering <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground font-light mt-4 max-w-xl mx-auto">
            From modern responsive interfaces to scalable backends, here are the technologies that power my work.
          </p>
        </div>

        {/* Content: Left 3D Studio Workspace + Right Stacked Panels */}
        <div className="expertise-content grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* ── LEFT: 3D ANIMATED DEVELOPER WORKSPACE POD ── */}
          <div className="expertise-3d-col lg:col-span-5 relative h-[380px] sm:h-[460px] lg:h-[540px] flex items-center justify-center">
            {/* Ambient Backdrop Glow */}
            <div
              className="absolute inset-4 rounded-3xl blur-3xl opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #00f5ff 0%, #a855f7 60%, transparent 80%)' }}
            />

            <CanvasErrorBoundary fallback={<StudioFallbackVisual />}>
              <Canvas
                className="rounded-3xl"
                style={{ width: '100%', height: '100%', background: 'transparent' }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
              >
                <PerspectiveCamera makeDefault position={[0, 0.9, 4.2]} fov={44} />
                <ambientLight intensity={0.6} />
                {/* Key Light */}
                <directionalLight position={[3.5, 5, 3.5]} intensity={2.2} color="#ffffff" />
                {/* Purple Back Rim Light */}
                <pointLight position={[-3, 2, -2.5]} intensity={1.8} color="#a855f7" />
                {/* Cyan Studio Screen Light */}
                <pointLight position={[0, 0.5, 0.6]} intensity={2.2} color="#00f5ff" />
                {/* Warm Domestic Desk Accent */}
                <pointLight position={[1.2, 0.3, -0.2]} intensity={1.2} color="#fed7aa" />

                {/* Main Continuously Rotating Workspace Scene */}
                <DeveloperWorkspaceStudio />

                {/* Smooth User Orbit Controls */}
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 3.4}
                  maxPolarAngle={Math.PI / 1.85}
                />
              </Canvas>
            </CanvasErrorBoundary>

            {/* Bottom Floating Status Badge */}
            <div className="absolute bottom-4 left-6 glass px-3.5 py-1.5 rounded-xl text-xs text-muted-foreground flex items-center gap-2 pointer-events-none">
              <TerminalWindow size={16} className="text-primary" />
              <span>Developer Engineering Studio</span>
            </div>
          </div>

          {/* ── RIGHT: VERTICALLY STACKED TECH PANELS (PRESERVED) ── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Panel 1: FRONTEND DEVELOPMENT */}
            <div className="expertise-panel">
              <TechnologyPanel
                categoryLabel="Interactive UI & Design Systems"
                title="FRONTEND DEVELOPMENT"
                subtitle="Crafting pixel-perfect, accessible, and high-performance digital interfaces."
                technologies={frontendSkills}
                accentColor="cyan"
              />
            </div>

            {/* Panel 2: BACKEND DEVELOPMENT */}
            <div className="expertise-panel">
              <TechnologyPanel
                categoryLabel="Server Architectures & APIs"
                title="BACKEND DEVELOPMENT"
                subtitle="Engineering robust APIs, database structures, and high-throughput server backends."
                technologies={backendSkills}
                accentColor="purple"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentExpertise;
