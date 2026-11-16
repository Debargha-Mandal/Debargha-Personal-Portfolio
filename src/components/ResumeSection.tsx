import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  DownloadSimple,
  CalendarBlank,
  MapPin,
  EnvelopeSimple,
  Phone,
  Globe,
  GithubLogo,
  LinkedinLogo,
  ArrowSquareOut,
  CaretLeft,
  CaretRight,
} from 'phosphor-react';
import { XLogoIcon } from '@/components/icons/BrandIcons';
import { personalInfo } from '@/data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const ResumeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [penDocked, setPenDocked] = useState<boolean>(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.resume-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.resume-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.resume-left-col',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.resume-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.resume-doc-preview',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.resume-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const resumeUrl = personalInfo.resumeUrl || '/resume.pdf';

  return (
    <section id="resume" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        className="absolute top-1/4 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(180 100% 50% / 0.05), transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(271 81% 56% / 0.05), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="resume-header text-center mb-16 opacity-0">
          <div className="section-label mb-3">Professional Credentials</div>
          <h2
            className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            My <span className="text-gradient">Resume</span>
          </h2>
        </div>

        {/* Content: Left Profile Card + Right Real Document Preview */}
        <div className="resume-content grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          
          {/* ── LEFT SIDE: PROFILE CV CARD (MATCHING USER REFERENCE) ── */}
          <div className="order-2 lg:order-1 resume-left-col lg:col-span-5 flex justify-center opacity-0 pt-12 sm:pt-16">
            <div className="relative w-full max-w-[340px] sm:max-w-[350px]">
              
              {/* White Profile Card */}
              <div className="relative bg-white text-slate-800 rounded-[2.5rem] pt-6 pb-6 px-5 sm:px-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] border border-slate-100 flex flex-col items-center">
                
                {/* Profile Photo Arch with Fluid Amber Aura (Matching Reference) */}
                <div className="relative -mt-16 sm:-mt-20 mb-4 flex items-center justify-center">
                  {/* Organic Amber Aura behind top curve */}
                  <div className="absolute -inset-1 rounded-t-[36px] rounded-b-[26px] bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-300 opacity-90 blur-[2px] transform -rotate-1" />
                  
                  <div className="relative w-[130px] h-[156px] sm:w-[140px] sm:h-[168px] rounded-t-[32px] rounded-b-[24px] overflow-hidden border-[3.5px] border-white shadow-lg bg-gradient-to-b from-sky-100 to-sky-200">
                    <img
                      src="/img/profile.jpg"
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-[center_15%]"
                    />
                  </div>
                </div>

                {/* Name (Editorial Serif style matching reference) */}
                <h3 className="text-[23px] sm:text-2xl font-serif text-slate-800 text-center tracking-tight leading-snug">
                  Debargha <span className="font-bold text-slate-950 font-serif">Mandal</span>
                </h3>

                {/* Role Pill */}
                <div className="mt-1.5 mb-3">
                  <span className="px-4 py-1 rounded-full bg-[#f1f5f9] text-[#64748b] text-[11px] sm:text-xs font-medium tracking-wide">
                    {personalInfo.role}
                  </span>
                </div>

                {/* Social Icons Row (Minimalist matching reference: f, X, in) */}
                <div className="flex items-center justify-center gap-6 text-slate-700 mb-5">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <GithubLogo size={18} weight="bold" />
                  </a>
                  <a
                    href="https://x.com/Debargha_DM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                    aria-label="X (Twitter)"
                    title="X"
                  >
                    <XLogoIcon size={16} />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <LinkedinLogo size={18} weight="bold" />
                  </a>
                </div>

                {/* Lower Section Panel with Soft Background Tint (Matching Reference) */}
                <div className="w-full bg-[#f4f7fb] rounded-[1.8rem] p-5 sm:p-6 space-y-4">
                  {/* Contact Information List */}
                  <div className="space-y-3.5 text-xs text-slate-600 font-normal">
                    <div className="flex items-center gap-3.5">
                      <CalendarBlank size={17} className="text-slate-500 shrink-0" />
                      <span className="text-slate-600 text-[12.5px]">March 12, 2004</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <MapPin size={17} className="text-slate-500 shrink-0" />
                      <span className="text-slate-600 text-[12.5px]">Kolkata, West Bengal, India</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <EnvelopeSimple size={17} className="text-slate-500 shrink-0" />
                      <span className="text-slate-600 text-[12.5px] truncate">{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <Phone size={17} className="text-slate-500 shrink-0" />
                      <span className="text-slate-600 text-[12.5px]">{personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <Globe size={17} className="text-slate-500 shrink-0" />
                      <span className="text-slate-600 text-[12.5px] truncate">debargha-mandal.github.io</span>
                    </div>
                  </div>

                  {/* Download CV Button */}
                  <div className="w-full pt-1.5">
                    <a
                      href={resumeUrl}
                      download="Debargha_Mandal_Resume.pdf"
                      className="w-full py-3.5 px-6 rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(37,99,235,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <DownloadSimple size={18} weight="bold" />
                      <span>Download CV</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating Bottom-Left Badge (Pop/Zoom on Hover) */}
              <div className="group absolute -bottom-10 -left-3 sm:-left-5 bg-[#0e1626] border border-white/10 hover:border-cyan-400/50 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex flex-col gap-1.5 z-20 cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(0,245,255,0.35)] active:scale-95">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-300 group-hover:text-cyan-300 whitespace-nowrap transition-colors duration-200">
                  Worked with more than 100 people
                </span>
                <div className="flex items-center -space-x-1.5 group-hover:space-x-1 transition-all duration-300">
                  <div className="w-5 h-5 rounded-full bg-cyan-400 border border-[#0e1626] flex items-center justify-center text-[9px] font-bold text-slate-900 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200">DM</div>
                  <div className="w-5 h-5 rounded-full bg-purple-400 border border-[#0e1626] flex items-center justify-center text-[9px] font-bold text-slate-900 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-200">AK</div>
                  <div className="w-5 h-5 rounded-full bg-emerald-400 border border-[#0e1626] flex items-center justify-center text-[9px] font-bold text-slate-900 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200">RS</div>
                  <div className="w-5 h-5 rounded-full bg-amber-400 border border-[#0e1626] flex items-center justify-center text-[9px] font-bold text-slate-900 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-200">+</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE: ACTUAL RESUME PDF DOCUMENT PREVIEW (MATCHING USER REFERENCE) ── */}
          <div className="order-1 lg:order-2 resume-doc-preview lg:col-span-7 flex flex-col items-center opacity-0 w-full">

            {/* ── THE DISPLAYED CV PAPER CONTAINER (WITH CLEAN GLOW ON EDGES, NO SOLID CYAN BORDER) ── */}
            <div
              className="relative w-full max-w-[620px] select-none transition-all duration-300"
              style={{
                filter:
                  'drop-shadow(0 0 10px rgba(0, 245, 255, 0.75)) drop-shadow(0 0 25px rgba(0, 245, 255, 0.4)) drop-shadow(0 25px 60px rgba(0, 0, 0, 0.95))',
              }}
            >
              {/* The Actual Clipped Paper Sheet with Non-Rounded Sharp Corners */}
              <div
                className="relative w-full bg-white rounded-none overflow-hidden"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)',
                }}
              >
                {/* Document Page Display */}
                <div className="relative w-full bg-white select-none">
                  <img
                    src={currentPage === 1 ? '/img/resume-preview.png' : '/img/resume-preview-page2.png'}
                    alt={`Debargha Mandal Resume Page ${currentPage}`}
                    className="w-full h-auto object-contain rounded-none block"
                  />
                </div>
              </div>

              {/* ── ULTRA-REALISTIC 3D FOLDED PAPER CORNER (CLEAN & NATURAL FOLD, NO BORDERS) ── */}
              <div className="absolute top-0 right-0 w-[40px] h-[40px] pointer-events-none z-30 overflow-visible select-none">
                <svg
                  viewBox="0 0 40 40"
                  className="w-[40px] h-[40px] overflow-visible block"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Soft realistic cast shadow under the fold onto the page */}
                    <filter id="ultraCurlShadow" x="-60%" y="-60%" width="220%" height="220%">
                      <feDropShadow dx="-3" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.65" />
                    </filter>

                    {/* 3D Paper Curvature Gradient - Natural Underside without stark white edge */}
                    <linearGradient id="ultraPaperCurl3D" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#7a889b" />
                      <stop offset="18%" stopColor="#9cb0c5" />
                      <stop offset="42%" stopColor="#c5d1de" />
                      <stop offset="75%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#d5dfea" />
                    </linearGradient>

                    {/* Specular sheen on paper curvature */}
                    <linearGradient id="ultraSheenGloss" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                      <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
                      <stop offset="85%" stopColor="#000000" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* 1. Cast shadow onto the paper beneath the curled flap */}
                  <path
                    d="M 0 0
                       C 3 15, 2 27, 0 40
                       C 13 38, 25 39, 40 40
                       L 0 0
                       Z"
                    fill="#000000"
                    filter="url(#ultraCurlShadow)"
                  />

                  {/* 2. The 3D Curled Paper Flap (Natural paper shading, no borders) */}
                  <path
                    d="M 0 0
                       C 3 15, 2 27, 0 40
                       C 13 38, 25 39, 40 40
                       L 0 0
                       Z"
                    fill="url(#ultraPaperCurl3D)"
                    stroke="none"
                  />

                  {/* 3. Specular surface sheen overlay on the paper curve */}
                  <path
                    d="M 0 0
                       C 3 15, 2 27, 0 40
                       C 13 38, 25 39, 40 40
                       L 0 0
                       Z"
                    fill="url(#ultraSheenGloss)"
                  />

                  {/* 4. Natural Fold Crease hairline shadow */}
                  <line x1="0" y1="0" x2="40" y2="40" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" strokeLinecap="round" />
                </svg>
              </div>

              {/* ── REALISTIC 3D LUXURY SIGNATURE PEN IN THE MIDDLE ── */}
              <div
                className="absolute z-40 cursor-pointer select-none transition-all duration-700 ease-out group"
                style={{
                  top: penDocked ? '86%' : '50%',
                  left: penDocked ? '80%' : '50%',
                  transform: penDocked
                    ? 'translate(-50%, -50%) rotate(-18deg) scale(0.85)'
                    : 'translate(-50%, -50%) rotate(-34deg)',
                }}
                onClick={() => setPenDocked(!penDocked)}
                title={penDocked ? 'Click to place pen back in the middle' : 'Click to move pen to the side'}
              >
                <div className="relative transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1.5">
                  {/* Micro Tooltip */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-900/90 text-[10px] text-cyan-300 font-mono tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-cyan-500/30">
                    {penDocked ? 'Click to center pen' : 'Click to move pen'}
                  </div>

                  <svg
                    viewBox="0 0 260 60"
                    className="w-[200px] sm:w-[250px] md:w-[275px] h-auto overflow-visible block"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Soft realistic cast shadow of the pen on the paper */}
                      <filter id="penCastShadow" x="-30%" y="-30%" width="180%" height="200%">
                        <feDropShadow dx="3" dy="10" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
                        <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.6" />
                      </filter>

                      {/* 24K Luxury Gold Metallic Gradient */}
                      <linearGradient id="penGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d4af37" />
                        <stop offset="20%" stopColor="#fef08a" />
                        <stop offset="40%" stopColor="#eab308" />
                        <stop offset="70%" stopColor="#ca8a04" />
                        <stop offset="100%" stopColor="#854d0e" />
                      </linearGradient>

                      {/* Polished Rhodium / Chrome Metallic Gradient */}
                      <linearGradient id="penChromeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#94a3b8" />
                        <stop offset="22%" stopColor="#ffffff" />
                        <stop offset="45%" stopColor="#cbd5e1" />
                        <stop offset="75%" stopColor="#64748b" />
                        <stop offset="100%" stopColor="#334155" />
                      </linearGradient>

                      {/* Piano-Black Obsidian Lacquer Body Gradient */}
                      <linearGradient id="penLacquerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0f172a" />
                        <stop offset="14%" stopColor="#334155" />
                        <stop offset="30%" stopColor="#64748b" />
                        <stop offset="42%" stopColor="#1e293b" />
                        <stop offset="80%" stopColor="#020617" />
                        <stop offset="100%" stopColor="#000000" />
                      </linearGradient>

                      {/* Ambient Cyan Glow Reflection bouncing onto the pen from the page edges */}
                      <linearGradient id="penCyanBounce" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00f5ff" stopOpacity="0" />
                        <stop offset="65%" stopColor="#00f5ff" stopOpacity="0.05" />
                        <stop offset="90%" stopColor="#00f5ff" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>

                    {/* 1. Realistic Cast Shadow onto Paper */}
                    <path
                      d="M 14 30 L 50 24 L 242 24 C 248 24, 252 27, 252 30 C 252 33, 248 36, 242 36 L 50 36 Z"
                      fill="#000000"
                      filter="url(#penCastShadow)"
                    />

                    {/* 2. Nib (Two-tone Gold & Rhodium Fountain Pen Nib) */}
                    <path
                      d="M 12 30 C 18 27, 28 22, 38 22 L 50 22 L 50 38 L 38 38 C 28 38, 18 33, 12 30 Z"
                      fill="url(#penGoldGrad)"
                    />
                    {/* Inner Rhodium Inlay */}
                    <path
                      d="M 20 30 C 24 28, 30 25, 38 25 L 48 25 L 48 35 L 38 35 C 30 35, 24 32, 20 30 Z"
                      fill="url(#penChromeGrad)"
                    />
                    {/* Nib Ink Slit */}
                    <line x1="12" y1="30" x2="36" y2="30" stroke="#1e293b" strokeWidth="0.8" />
                    {/* Breather Hole */}
                    <circle cx="36" cy="30" r="1.4" fill="#0f172a" />
                    {/* Scrollwork Engravings on Nib */}
                    <path d="M 28 27 C 32 27, 34 28, 36 29" fill="none" stroke="#ca8a04" strokeWidth="0.5" />
                    <path d="M 28 33 C 32 33, 34 32, 36 31" fill="none" stroke="#ca8a04" strokeWidth="0.5" />
                    {/* Nib Tip (Iridium sphere point) */}
                    <circle cx="12" cy="30" r="1.2" fill="#f8fafc" stroke="#475569" strokeWidth="0.3" />

                    {/* 3. Collar Ring */}
                    <rect x="50" y="21.5" width="4" height="17" rx="1" fill="url(#penGoldGrad)" />

                    {/* 4. Ergonomic Section / Grip */}
                    <path d="M 54 22 L 98 20 L 98 40 L 54 38 Z" fill="url(#penLacquerGrad)" />
                    {/* Subtle grip rings */}
                    <line x1="68" y1="21.5" x2="68" y2="38.5" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
                    <line x1="82" y1="20.8" x2="82" y2="39.2" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />

                    {/* 5. Luxury Center Band (Gold Ring with Inlay) */}
                    <rect x="98" y="19" width="10" height="22" rx="1.5" fill="url(#penGoldGrad)" />
                    <rect x="102" y="19.5" width="2" height="21" fill="#0f172a" opacity="0.65" />
                    <line x1="98" y1="23" x2="108" y2="23" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.9" />

                    {/* 6. Pen Barrel / Cap Body */}
                    <path
                      d="M 108 19.5 L 236 19.5 C 242 19.5, 244 24, 244 30 C 244 36, 242 40.5, 236 40.5 L 108 40.5 Z"
                      fill="url(#penLacquerGrad)"
                    />

                    {/* 7. Cyan Edge Bounce Light along lower barrel curve */}
                    <path
                      d="M 108 34 L 236 34 C 240 34, 243 36, 244 38 L 244 40.5 L 108 40.5 Z"
                      fill="url(#penCyanBounce)"
                    />

                    {/* 8. Specular Cylinder Highlight along body */}
                    <line x1="108" y1="23.5" x2="236" y2="23.5" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.8" />
                    <line x1="108" y1="25" x2="236" y2="25" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.35" />

                    {/* 9. Pocket Clip with Ball Terminal */}
                    {/* Clip Shadow on Barrel */}
                    <path d="M 230 19 L 160 19 L 160 21.5 L 230 21.5 Z" fill="#000000" opacity="0.4" />
                    {/* Clip Body */}
                    <path
                      d="M 234 19 C 234 16, 232 15, 228 15 L 164 16 C 160 16, 158 17, 158 19 C 158 21, 160 22, 164 22 L 228 23 C 232 23, 234 22, 234 19 Z"
                      fill="url(#penGoldGrad)"
                    />
                    {/* Clip End Ball */}
                    <circle cx="158" cy="19" r="3.2" fill="url(#penGoldGrad)" />
                    <circle cx="157.5" cy="18" r="1" fill="#ffffff" opacity="0.95" />

                    {/* 10. Rear Finial Jewel */}
                    <path d="M 236 21 C 243 21, 244 26, 244 30 C 244 34, 243 39, 236 39 Z" fill="url(#penGoldGrad)" />
                    <circle cx="240" cy="27" r="1.3" fill="#ffffff" opacity="0.85" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Info Strip */}
            <div className="w-full max-w-[620px] mt-2.5 flex items-center justify-between text-xs text-muted-foreground px-1">
              <span className="font-mono text-[11px] text-slate-500">2 Pages · High-Resolution PDF</span>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold flex items-center gap-1 text-[11px]"
              >
                <span>View Full CV</span>
                <ArrowSquareOut size={12} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
