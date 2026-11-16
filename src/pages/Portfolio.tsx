import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation           from '@/components/Navigation';
import HeroSection          from '@/components/HeroSection';
import AboutSection         from '@/components/AboutSection';
import DevelopmentExpertise from '@/components/DevelopmentExpertise';
import TechStack            from '@/components/TechStack';
import EducationSection     from '@/components/EducationSection';
import ProjectsSection      from '@/components/ProjectsSection';
import ResumeSection        from '@/components/ResumeSection';
import TestimonialsSection  from '@/components/TestimonialsSection';
import ContactSection       from '@/components/ContactSection';
import Footer               from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Portfolio: React.FC = () => {
  useEffect(() => {
    // Immediate refresh on mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-background">
      {/* ── Global ambient background ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(180 100% 50% / 0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 80%, hsl(271 81% 56% / 0.04) 0%, transparent 60%)',
        }}
      />

      {/* ── Grid texture ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(180 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(180 100% 50%) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Floating micro-particles ── */}
      <div className="fixed top-10 left-10 w-1.5 h-1.5 bg-primary rounded-full opacity-50 animate-pulse pointer-events-none z-0" />
      <div className="fixed top-24 right-16 w-1 h-1 bg-accent rounded-full opacity-30 animate-pulse pointer-events-none z-0"
           style={{ animationDelay: '1.2s' }} />
      <div className="fixed bottom-32 left-24 w-1.5 h-1.5 rounded-full opacity-40 animate-pulse pointer-events-none z-0"
           style={{ background: 'hsl(var(--neon-cyan))', animationDelay: '2.4s' }} />
      <div className="fixed bottom-16 right-12 w-1 h-1 rounded-full opacity-30 animate-pulse pointer-events-none z-0"
           style={{ background: 'hsl(var(--neon-purple))', animationDelay: '3.6s' }} />

      {/* ── Navigation ── */}
      <Navigation />

      {/* ── Page Sections ── */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <DevelopmentExpertise />
        <TechStack />
        <EducationSection />
        <ProjectsSection />
        <ResumeSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default Portfolio;
