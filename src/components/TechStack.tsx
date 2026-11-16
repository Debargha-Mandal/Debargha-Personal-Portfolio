import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkle, Cpu, Keyboard as KeyboardIcon, Cursor } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

interface TechKey {
  letter: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  color: string;
  isSpecial?: boolean;
  width?: string; // custom width for modifier keys
}

// Complete technology mapping with authentic official logos as primary keycap visual
const KEYBOARD_DATA: TechKey[][] = [
  // Row 1: Function / Number Row (Escape is standard 1u, properly proportioned)
  [
    { letter: 'ESC', name: 'Terminal / Bash', category: 'Core Environment', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', description: 'Command-line scripting & Unix environment control', color: '#00f5ff' },
    { letter: '1', name: 'TypeScript', category: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', description: 'Strict syntactical superset of JavaScript for scale', color: '#3178c6' },
    { letter: '2', name: 'Tailwind CSS', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', description: 'Utility-first CSS framework for modern responsive UI', color: '#06b6d4' },
    { letter: '3', name: 'Node.js', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', description: 'Chrome V8 JavaScript runtime for backend services', color: '#22c55e' },
    { letter: '4', name: 'REST APIs', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', description: 'RESTful architecture, endpoints, and JSON payloads', color: '#10b981' },
    { letter: '5', name: 'SQLite', category: 'Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', description: 'Lightweight, serverless embedded relational database', color: '#0284c7' },
    { letter: '6', name: 'GSAP', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gsap/gsap-original.svg', description: 'High-performance scroll-driven and timeline animations', color: '#84cc16' },
    { letter: '7', name: 'Linux', category: 'Platform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', description: 'Linux distributions, shell environments, and server ops', color: '#eab308' },
    { letter: '8', name: 'VS Code', category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', description: 'Primary IDE, debugging, and development workflow', color: '#0284c7' },
    { letter: '9', name: 'Figma', category: 'Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', description: 'UI/UX design systems, prototyping, and wireframing', color: '#f43f5e' },
    { letter: '0', name: 'Jupyter', category: 'Data Science', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', description: 'Interactive computing and exploratory data analysis', color: '#f97316' },
    { letter: 'DEL', name: 'Refactoring', category: 'Practice', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', description: 'Eliminating technical debt and optimizing code', color: '#ef4444', width: 'w-14 sm:w-16' },
  ],
  // Row 2: QWERTY Row
  [
    { letter: 'TAB', name: 'Architecture', category: 'Concept', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', description: 'Clean scalable full-stack software architecture', color: '#a855f7', width: 'w-14 sm:w-16' },
    { letter: 'Q', name: 'SQL', category: 'Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', description: 'Relational data query design, joins, and indexing', color: '#f59e0b' },
    { letter: 'W', name: 'Vite', category: 'Build Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', description: 'Next-generation frontend tooling and rapid HMR', color: '#8b5cf6' },
    { letter: 'E', name: 'Express', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', description: 'Fast, unopinionated minimalist web framework', color: '#94a3b8' },
    { letter: 'R', name: 'React Native', category: 'Mobile', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', description: 'Cross-platform native mobile application development', color: '#38bdf8' },
    { letter: 'T', name: 'TypeScript', category: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', description: 'Static type checking for large-scale codebases', color: '#3178c6' },
    { letter: 'Y', name: 'npm', category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg', description: 'Node package manager and dependency resolution', color: '#ef4444' },
    { letter: 'U', name: 'Ubuntu', category: 'OS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg', description: 'Debian-based server environment & administration', color: '#e11d48' },
    { letter: 'I', name: 'FastAPI', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', description: 'Modern, high-performance web APIs with Python', color: '#06b6d4' },
    { letter: 'O', name: 'OOP', category: 'Paradigm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', description: 'Encapsulation, inheritance, and polymorphic design', color: '#f59e0b' },
    { letter: 'P', name: 'Postman', category: 'Testing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', description: 'API endpoint validation, mock servers, and testing', color: '#f97316' },
    { letter: '\\', name: 'GitFlow', category: 'Workflow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', description: 'Release branching and continuous delivery', color: '#10b981', width: 'w-12 sm:w-14' },
  ],
  // Row 3: ASDF Row (Core User Requested Mapping: A, S, D, F, G, H, J, K, L)
  [
    { letter: 'CAPS', name: 'Linting', category: 'Quality', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg', description: 'Code analysis and automated styling rules', color: '#6366f1', width: 'w-16 sm:w-18' },
    { letter: 'A', name: 'HTML5', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', description: 'Semantic markup, web accessibility, and DOM structure', color: '#e34f26' },
    { letter: 'S', name: 'CSS3', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', description: 'Modern CSS layout models, Grid, Flexbox, and animations', color: '#1572b6' },
    { letter: 'D', name: 'JavaScript', category: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', description: 'Dynamic scripting, ES6+, promises, and async execution', color: '#f7df1e' },
    { letter: 'F', name: 'React.js', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', description: 'Declarative component-based reactive user interfaces', color: '#61dafb' },
    { letter: 'G', name: 'Python', category: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', description: 'General-purpose programming, data science, and scripting', color: '#3776ab' },
    { letter: 'H', name: 'Django', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', description: 'High-level Python web framework with ORM and admin', color: '#092e20' },
    { letter: 'J', name: 'C', category: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', description: 'Foundational systems programming and pointer arithmetic', color: '#a8b9cc' },
    { letter: 'K', name: 'C++', category: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', description: 'High-performance computing and complex data structures', color: '#00599c' },
    { letter: 'L', name: 'Java', category: 'Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', description: 'Enterprise object-oriented programming & JVM applications', color: '#f89820' },
    { letter: 'ENTER', name: 'Deploy', category: 'Production', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', description: 'Shipping code to production and automated releases', color: '#00f5ff', width: 'w-20 sm:w-24', isSpecial: true },
  ],
  // Row 4: ZXCV Row (Core User Requested Mapping: Z, X, C, V, B, N, M)
  [
    { letter: 'SHIFT', name: 'Security', category: 'DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', description: 'Authentication, CORS, and protected environments', color: '#ec4899', width: 'w-20 sm:w-22' },
    { letter: 'Z', name: 'Git', category: 'Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', description: 'Distributed version control, commits, and branching', color: '#f05032' },
    { letter: 'X', name: 'GitHub', category: 'Collaboration', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', description: 'Repository hosting, collaboration, and CI/CD workflows', color: '#e5e7eb' },
    { letter: 'C', name: 'MongoDB', category: 'Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', description: 'Scalable NoSQL document database with flexible JSON/BSON', color: '#47a248' },
    { letter: 'V', name: 'MySQL', category: 'Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', description: 'Relational database management system with ACID guarantees', color: '#4479a1' },
    { letter: 'B', name: 'Power BI', category: 'Analytics', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', description: 'Data visualization, interactive dashboards, and business insights', color: '#f2c811' },
    { letter: 'N', name: 'NumPy', category: 'Data Science', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', description: 'Multi-dimensional arrays and mathematical computing', color: '#013243' },
    { letter: 'M', name: 'Pandas', category: 'Data Science', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', description: 'Data structures, DataFrame transformations, and tabular analytics', color: '#150458' },
    { letter: '<', name: 'JSON', category: 'Format', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', description: 'Lightweight structured data serialization standard', color: '#94a3b8' },
    { letter: '>', name: 'Markdown', category: 'Docs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg', description: 'Formatted documentation and README architecture', color: '#94a3b8' },
    { letter: 'UP', name: 'Up', category: 'Nav', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', description: 'Ascend code callstack', color: '#00f5ff', width: 'w-11 sm:w-12.5' },
  ],
  // Row 5: Spacebar Row
  [
    { letter: 'CTRL', name: 'DevTools', category: 'Debug', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg', description: 'Network inspection, DOM auditing, and runtime metrics', color: '#00f5ff', width: 'w-14 sm:w-16' },
    { letter: 'WIN', name: 'OS', category: 'Platform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg', description: 'Windows subsystem & development cross-compilation', color: '#0284c7', width: 'w-12 sm:w-13' },
    { letter: 'ALT', name: 'Design', category: 'Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', description: 'Design systems, tokens, and component spec', color: '#a855f7', width: 'w-12 sm:w-13' },
    {
      letter: 'SPACE',
      name: 'DEBARGHA MANDAL · FULL STACK WEB DEVELOPER',
      category: 'Developer Identity',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      description: 'Building modern, scalable, and interactive digital experiences by combining creative frontend design with powerful backend engineering.',
      color: '#00f5ff',
      width: 'flex-1 min-w-[200px] max-w-[420px]',
      isSpecial: true,
    },
    { letter: 'ALT', name: 'Clean Code', category: 'Standard', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', description: 'Modularity, maintainability, and clean code principles', color: '#a855f7', width: 'w-12 sm:w-13' },
    { letter: 'FN', name: 'Async', category: 'Runtime', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', description: 'Non-blocking I/O and asynchronous event-driven design', color: '#10b981', width: 'w-12 sm:w-13' },
    { letter: 'LEFT', name: 'Back', category: 'Nav', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', description: 'Navigate revision history', color: '#94a3b8', width: 'w-11 sm:w-12.5' },
    { letter: 'DOWN', name: 'Down', category: 'Nav', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', description: 'Inspect deeper call frames', color: '#94a3b8', width: 'w-11 sm:w-12.5' },
    { letter: 'RIGHT', name: 'Next', category: 'Nav', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', description: 'Commit & push forward', color: '#00f5ff', width: 'w-11 sm:w-12.5' },
  ],
];

const TechStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // Default selected key: "F" (React.js)
  const [activeKey, setActiveKey] = useState<TechKey>(KEYBOARD_DATA[2][4]);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tech-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.keyboard-chassis',
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.keyboard-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleKeyInteraction = (key: TechKey) => {
    setActiveKey(key);
    setPressedKey(key.letter);
    setTimeout(() => {
      setPressedKey(null);
    }, 180);
  };

  return (
    <section id="techstack" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        className="absolute top-1/4 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(180 100% 50% / 0.05), transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(271 81% 56% / 0.05), transparent 70%)' }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="tech-header text-center mb-10 opacity-0">
          <div className="section-label mb-3">Interactive Technology Ecosystem</div>
          <h2
            className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            My Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground font-light mt-4 max-w-2xl mx-auto">
            A premium mechanical developer keyboard where each keycap features the authentic technology logo. Press or hover over any key to inspect.
          </p>
        </div>

        {/* ════════ INTERACTIVE KEYBOARD CONTAINER ════════ */}
        <div className="keyboard-container relative">
          {/* ── OLED DISPLAY / HUD STATUS BAR ── */}
          <div className="mb-6 max-w-4xl mx-auto glass rounded-2xl p-5 border border-glass-border flex flex-col md:flex-row items-center justify-between gap-4 shadow-glass">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center p-2.5 glass border transition-transform duration-300"
                style={{
                  borderColor: `${activeKey.color}50`,
                  boxShadow: `0 0 20px ${activeKey.color}30`,
                }}
              >
                <img
                  src={activeKey.icon}
                  alt={activeKey.name}
                  className="w-full h-full object-contain filter drop-shadow"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                    style={{
                      background: `${activeKey.color}20`,
                      color: activeKey.color,
                      border: `1px solid ${activeKey.color}40`,
                    }}
                  >
                    Key [{activeKey.letter}]
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {activeKey.category}
                  </span>
                </div>
                <h4
                  className="text-xl sm:text-2xl font-bold text-foreground"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  {activeKey.name}
                </h4>
              </div>
            </div>

            {/* Description */}
            <div className="text-sm text-muted-foreground font-light max-w-md text-center md:text-right">
              {activeKey.description}
            </div>
          </div>

          {/* ── MECHANICAL KEYBOARD CHASSIS ── */}
          <div className="keyboard-chassis opacity-0 rounded-[2.5rem] p-4 sm:p-6 lg:p-8 bg-[#0b0f19] border-2 border-[#192236] shadow-[0_30px_90px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.06)] relative overflow-hidden">
            {/* Ambient Chassis LED Underglow */}
            <div
              className="absolute -inset-1 opacity-20 blur-2xl pointer-events-none rounded-[2.5rem]"
              style={{ background: 'radial-gradient(ellipse at center, #00f5ff 0%, #a855f7 50%, transparent 80%)' }}
            />

            {/* Top Keyboard Bezel Details */}
            <div className="flex items-center justify-between px-3 mb-4 select-none">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-[11px] font-mono text-muted-foreground tracking-widest uppercase">
                  DM-CUSTOM // MECHANICAL TECH KEYBOARD
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-primary/80">
                <KeyboardIcon size={14} />
                <span>HOT-SWAP // AUTHENTIC TECH LOGOS</span>
              </div>
            </div>

            {/* Scroll wrapper for mobile to guarantee zero layout overflow */}
            <div className="overflow-x-auto pb-4 pt-1 px-1 custom-scrollbar">
              <div className="min-w-[860px] flex flex-col gap-2.5 sm:gap-3 select-none">
                {KEYBOARD_DATA.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-2 sm:gap-2.5 justify-center">
                    {row.map((k) => {
                      const isPressed = pressedKey === k.letter;
                      const isCurrent = activeKey.letter === k.letter;
                      // Default 1u key size: w-11 sm:w-12.5 (Escape key uses standard 1u size!)
                      const widthClass = k.width || 'w-11 sm:w-12.5';

                      return (
                        <button
                          key={`${k.letter}-${k.name}`}
                          onClick={() => handleKeyInteraction(k)}
                          onMouseEnter={() => handleKeyInteraction(k)}
                          className={`group relative h-13 sm:h-14 ${widthClass} rounded-xl font-mono flex flex-col items-center justify-between p-1.5 transition-all duration-150 cursor-pointer`}
                          style={{
                            /* Realistic mechanical keycap styling with 3D step */
                            backgroundColor: isCurrent ? '#172235' : '#121724',
                            transform: isPressed ? 'translateY(4px)' : isCurrent ? 'translateY(1px)' : 'translateY(0)',
                            boxShadow: isPressed
                              ? `0 1px 0 #070a10, 0 0 16px ${k.color}50`
                              : isCurrent
                              ? `0 3px 0 #060910, 0 0 16px ${k.color}40, inset 0 1px 1px rgba(255,255,255,0.18)`
                              : '0 5px 0 #070a11, 0 6px 10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.08)',
                            border: `1px solid ${isCurrent ? k.color : '#1f293d'}`,
                          }}
                        >
                          {/* Top Row: Sub-Legend Letter in the corner */}
                          <div className="w-full flex justify-between items-center px-0.5 leading-none">
                            <span
                              className={`text-[9px] sm:text-[10px] font-bold font-mono transition-colors ${
                                isCurrent ? 'text-primary' : 'text-slate-400 group-hover:text-slate-200'
                              }`}
                              style={{ color: isCurrent ? k.color : undefined }}
                            >
                              {k.letter}
                            </span>
                            {/* Tiny LED indicator dot */}
                            <span
                              className="w-1.5 h-1.5 rounded-full transition-opacity"
                              style={{
                                background: k.color,
                                opacity: isCurrent ? 1 : 0.35,
                                boxShadow: isCurrent ? `0 0 6px ${k.color}` : 'none',
                              }}
                            />
                          </div>

                          {/* ── KEYCAP CENTER: AUTHENTIC TECH LOGO ── */}
                          <div className="flex-1 flex items-center justify-center w-full my-0.5">
                            {k.letter === 'SPACE' ? (
                              <div className="flex items-center justify-center gap-2 px-2 w-full">
                                <img
                                  src={k.icon}
                                  alt={k.name}
                                  className="w-4 h-4 object-contain filter drop-shadow"
                                />
                                <span className="text-[10px] sm:text-[11px] font-sans tracking-widest text-slate-200 font-bold truncate">
                                  {k.name}
                                </span>
                              </div>
                            ) : (
                              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                                <img
                                  src={k.icon}
                                  alt={k.name}
                                  className="w-full h-full object-contain filter drop-shadow transition-transform duration-200 group-hover:scale-115"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          {/* Subtle Bottom LED Glow Line */}
                          <div
                            className="w-3/4 h-[2px] rounded-full transition-all duration-200"
                            style={{
                              background: k.color,
                              opacity: isCurrent ? 0.9 : 0.15,
                              boxShadow: isCurrent ? `0 0 8px ${k.color}` : 'none',
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Keyboard Lip */}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground/60 font-mono">
              <Cursor size={14} className="text-primary" />
              <span>Click or hover over any technology key to trigger realistic mechanical press & inspect stack details</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
