import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, aboutMe } from '@/data/portfolioData';
import { Code, Briefcase, Lightbulb, Rocket } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo('.about-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-header', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo('.about-title',
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-header', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      );

      // Left column
      gsap.fromTo('.about-left',
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-cols', start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      // Right column
      gsap.fromTo('.about-right',
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-cols', start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      // Stat cards
      gsap.fromTo('.about-stat',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.about-stats', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      // Interest pills
      gsap.fromTo('.interest-pill',
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2)',
          scrollTrigger: { trigger: '.interests-row', start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'Projects Built', value: '15+', icon: <Rocket size={20} weight="bold" />, color: '#00f5ff' },
    { label: 'Technologies', value: '20+', icon: <Code size={20} weight="bold" />, color: '#a855f7' },
    { label: 'Academic CGPA', value: '8.5', icon: <Briefcase size={20} weight="bold" />, color: '#10b981' },
    { label: 'Open Source', value: 'Active', icon: <Lightbulb size={20} weight="bold" />, color: '#f59e0b' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, hsl(271 81% 56% / 0.06), transparent 70%)' }} />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full blur-2xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, hsl(180 100% 50% / 0.05), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="about-header text-center mb-20">
          <div className="about-label section-label mb-4 opacity-0">About Me</div>
          <h2 className="about-title text-4xl md:text-5xl xl:text-6xl font-black opacity-0"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            Crafting Digital{' '}
            <span className="text-gradient">Experiences</span>
          </h2>
        </div>

        {/* Two-column */}
        <div className="about-cols grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left – Visual */}
          <div className="about-left opacity-0">
            <div className="relative">
              {/* Profile visual */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
                {/* Ambient glow behind avatar */}
                <div
                  className="absolute inset-4 rounded-full blur-2xl opacity-30 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #00f5ff 0%, #a855f7 60%, transparent 100%)' }}
                />

                {/* Outer concentric rotating tech rings */}
                <div className="absolute inset-0 rounded-full border border-primary/25 animate-rotate-slow" />
                <div
                  className="absolute inset-3 rounded-full border border-dashed border-accent/30"
                  style={{ animation: 'rotate-slow 35s linear infinite reverse' }}
                />

                {/* Profile Photo Circular Container */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1.5 bg-gradient-to-tr from-primary via-accent to-primary/40 shadow-neon group">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#0c1220] relative border-2 border-background">
                    <img
                      src="/img/profile.jpg"
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090d16]/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Floating badge – Open to Work */}
                <div className="absolute -top-1 -right-1 sm:top-2 sm:right-2 glass rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-neon border border-primary/30 z-10 backdrop-blur-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span className="text-xs text-foreground font-semibold">Open to Work</span>
                </div>

                {/* Floating badge – Location */}
                <div className="absolute -bottom-2 -left-2 sm:bottom-2 sm:left-2 glass rounded-2xl px-3.5 py-2 border border-white/10 z-10 backdrop-blur-md shadow-lg">
                  <span className="text-xs text-muted-foreground">Based in </span>
                  <span className="text-xs text-foreground font-semibold">🇮🇳 India</span>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute top-0 left-0 grid grid-cols-5 gap-3 opacity-20">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-primary" />
                ))}
              </div>
            </div>
          </div>

          {/* Right – Bio */}
          <div className="about-right opacity-0 space-y-6">
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              {aboutMe.intro}
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              {aboutMe.paragraph2}
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              {aboutMe.paragraph3}
            </p>

            {/* Goal callout */}
            <div className="relative p-5 rounded-2xl glass border-l-2 border-primary mt-2">
              <p className="text-sm text-muted-foreground italic font-light">
                "{aboutMe.goal}"
              </p>
            </div>

            {/* Interests */}
            <div className="interests-row pt-2">
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3">Interests</p>
              <div className="flex flex-wrap gap-2">
                {aboutMe.interests.map((interest) => (
                  <span
                    key={interest}
                    className="interest-pill opacity-0 px-4 py-1.5 rounded-full text-xs font-medium border border-primary/30 text-primary hover:bg-primary/10 transition-colors cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="about-stat opacity-0 glass rounded-2xl p-6 text-center glow-hover group"
            >
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: `${stat.color}20`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="text-2xl font-black text-foreground mb-1"
                   style={{ fontFamily: 'Space Grotesk, Inter, sans-serif', color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
