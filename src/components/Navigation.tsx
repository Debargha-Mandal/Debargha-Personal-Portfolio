import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';
import { personalInfo, navItems } from '@/data/portfolioData';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled]             = useState(false);
  const [activeSection, setActiveSection]       = useState('home');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /* Scroll state + active section tracking */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      const sections = navItems.map((n) => n.href.replace('#', ''));
      let current = sections[0];

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Nav entrance animation */
  useEffect(() => {
    gsap.fromTo(
      '.nav-container',
      { opacity: 0, y: -20, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 0.1, ease: 'power3.out' }
    );
  }, []);

  const handleMobileToggle = () => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);
      gsap.fromTo(
        '.mobile-menu',
        { opacity: 0, x: '100%' },
        { opacity: 1, x: '0%', duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.mobile-nav-item',
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, delay: 0.1 }
      );
    } else {
      gsap.to('.mobile-menu', {
        opacity: 0,
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setIsMobileMenuOpen(false),
      });
    }
  };

  const handleNavClick = (href: string) => {
    if (isMobileMenuOpen) handleMobileToggle();
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`nav-container fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'glass-strong py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="relative group"
          >
            <span
              className="text-xl font-black tracking-tight text-gradient"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              DM
            </span>
            <span className="ml-2 text-sm font-light text-muted-foreground hidden sm:inline opacity-70 group-hover:opacity-100 transition-opacity">
              {personalInfo.firstName}
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`relative px-4 py-2 text-sm font-light rounded-lg transition-all duration-300 group ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-lg opacity-10"
                      style={{ background: 'var(--gradient-button)' }}
                    />
                  )}
                  {item.name}
                  <span
                    className={`absolute -bottom-0.5 left-4 right-4 h-px bg-primary transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="hidden md:flex items-center px-5 py-2 rounded-full text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-neon"
              style={{ background: 'var(--gradient-button)' }}
            >
              Hire Me
            </a>

            <button
              onClick={handleMobileToggle}
              className="md:hidden p-2 rounded-lg glass text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="mobile-menu fixed inset-0 z-30 glass-strong flex flex-col items-center justify-center md:hidden"
          style={{ transform: 'translateX(100%)', opacity: 0 }}
        >
          {/* Close tap-anywhere overlay background handled by X button */}
          <div className="flex flex-col items-center gap-6 w-full px-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`mobile-nav-item w-full text-center py-4 text-2xl font-light border-b border-glass-border transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                  style={{ opacity: 0 }}
                >
                  {item.name}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="mobile-nav-item mt-4 px-10 py-3 rounded-full font-medium text-primary-foreground text-lg hover:shadow-neon transition-all"
              style={{ background: 'var(--gradient-button)', opacity: 0 }}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
