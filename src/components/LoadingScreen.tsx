import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate background orbs
    gsap.to('.glow-orb', {
      y: -25,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.6,
    });

    // Entrance
    gsap.fromTo(
      '.loading-name',
      { opacity: 0, y: 40, filter: 'blur(12px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo(
      '.loading-role',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.7 }
    );
    gsap.fromTo(
      '.loading-bar-wrapper',
      { opacity: 0, scaleX: 0.5 },
      { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out', delay: 1 }
    );

    // Progress counter
    tl.to({}, {
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: function () {
        setProgress(Math.round(this.progress() * 100));
      },
    });

    // Letter-by-letter shimmer on name (optional feel)
    gsap.to('.loading-name span', {
      color: '#00f5ff',
      stagger: { each: 0.05, yoyo: true, repeat: 1 },
      duration: 0.3,
      delay: 1.2,
    });

    // Exit
    tl.to('.preloader', {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
      duration: 0.9,
      ease: 'power2.inOut',
      onStart: () => setPhase('done'),
      onComplete: onComplete,
    });
  }, [onComplete]);

  const nameLetters = 'Debargha'.split('');

  return (
    <div className="preloader fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Background orbs */}
      <div className="glow-orb absolute top-1/4 left-1/4 w-40 h-40 rounded-full opacity-20 blur-3xl"
           style={{ background: 'radial-gradient(circle, hsl(180 100% 50% / 0.6), transparent)' }} />
      <div className="glow-orb absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full opacity-15 blur-2xl"
           style={{ background: 'radial-gradient(circle, hsl(271 81% 56% / 0.6), transparent)' }} />
      <div className="glow-orb absolute top-1/2 right-1/3 w-24 h-24 rounded-full opacity-20 blur-xl"
           style={{ background: 'radial-gradient(circle, hsl(180 100% 50% / 0.4), transparent)' }} />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{
             backgroundImage: 'linear-gradient(hsl(180 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(180 100% 50%) 1px, transparent 1px)',
             backgroundSize: '80px 80px',
           }} />

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 px-6">
        {/* Name */}
        <div className="loading-name mb-2">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tight" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            {nameLetters.map((letter, i) => (
              <span
                key={i}
                style={{ display: 'inline-block', background: 'var(--gradient-button)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        <div className="loading-role">
          <p className="text-muted-foreground text-sm sm:text-base font-light tracking-[0.3em] uppercase">
            Full Stack Developer
          </p>
        </div>

        {/* Progress bar */}
        <div className="loading-bar-wrapper w-72 sm:w-96 mx-auto mt-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-3 font-mono">
            <span className="tracking-widest">INITIALIZING</span>
            <span>{progress}%</span>
          </div>
          <div className="h-[2px] bg-muted rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full transition-all duration-200 ease-out relative"
              style={{ width: `${progress}%`, background: 'var(--gradient-button)' }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-neon" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom dots */}
      <div className="absolute bottom-10 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: 'var(--gradient-button)',
              animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
