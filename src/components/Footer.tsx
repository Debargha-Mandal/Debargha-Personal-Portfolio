import React from 'react';
import { GithubLogo, LinkedinLogo, ArrowUp } from 'phosphor-react';
import { XLogoIcon, GmailIcon } from '@/components/icons/BrandIcons';
import { personalInfo, navItems } from '@/data/portfolioData';
import { Home } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: <GithubLogo size={18} weight="bold" />, url: personalInfo.github, label: 'GitHub' },
    { icon: <LinkedinLogo size={18} weight="bold" />, url: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: <XLogoIcon size={18} />, url: 'https://x.com/Debargha_DM', label: 'X' },
  ];

  return (
    <footer className="relative py-16 overflow-hidden border-t border-glass-border">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
           style={{ background: 'var(--gradient-button)', opacity: 0.4 }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]"
           style={{
             backgroundImage: 'linear-gradient(hsl(180 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(180 100% 50%) 1px, transparent 1px)',
             backgroundSize: '80px 80px',
           }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div
              className="text-3xl font-black text-gradient mb-1"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              {personalInfo.firstName}
            </div>
            <p className="text-sm text-muted-foreground font-light">
              Full Stack Web Developer · {personalInfo.location}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-light"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 glass rounded-xl text-muted-foreground hover:text-primary hover:shadow-neon transition-all duration-300 hover:-translate-y-1 flex items-center justify-center shrink-0"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-glass-border mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-light">
            © {year} {personalInfo.name}. Built with React, Three.js .
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
            <span>Designed & Developed by</span>
            <span className="text-gradient font-medium">{personalInfo.firstName}</span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 glass rounded-xl text-muted-foreground hover:text-primary hover:shadow-neon transition-all duration-300 hover:-translate-y-1 flex items-center justify-center shrink-0 group"
            aria-label="Back to top"
          >
            <Home size={18} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
