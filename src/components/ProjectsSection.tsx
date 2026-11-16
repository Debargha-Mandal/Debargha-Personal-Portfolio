import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData, personalInfo } from '@/data/portfolioData';
import { GithubLogo, ArrowUpRight, Globe } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const categoryColors: Record<string, string> = {
  'Web Application':                '#00f5ff',
  'Full-Stack Development':         '#a855f7',
  'Artificial Intelligence & ML':   '#10b981',
  'Data Science & Analytics':       '#f59e0b',
  'Other':                          '#6366f1',
};

// Comprehensive authentic brand logos mapping
interface TechEntry {
  icon?: string;
  isDark?: boolean;
  isBcrypt?: boolean;
  isJWT?: boolean;
  isML?: boolean;
}

const TECH_MAP: Record<string, TechEntry> = {
  // Web core
  'html': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  'html5': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  'css': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  'css3': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  'javascript': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  'js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  'typescript': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  'ts': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },

  // Frontend frameworks & styling
  'react': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  'react.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  'reactjs': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  'vite': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  'vite.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  'tailwindcss': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  'tailwind css': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  'tailwind': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  'three.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', isDark: true },
  'threejs': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', isDark: true },
  'gsap': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gsap/gsap-original.svg' },

  // Backend, servers & realtime
  'node.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  'nodejs': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  'node': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  'express': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', isDark: true },
  'express.js': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', isDark: true },
  'fastapi': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
  'uvicorn': { icon: 'https://raw.githubusercontent.com/Kludex/uvicorn/main/docs/uvicorn.png' },
  'socket.io': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg', isDark: true },
  'socketio': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg', isDark: true },
  'django': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  'rest apis': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
  'rest api': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },

  // Databases & BaaS
  'postgresql': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  'postgres': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  'supabase': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
  'mongodb': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  'mysql': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  'sqlite': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },

  // Auth, Cryptography & Security
  'jwt': { isJWT: true },
  'json web token': { isJWT: true },
  'bcrypt': { isBcrypt: true },
  'bcrypt.js': { isBcrypt: true },

  // AI, Data Science & Machine Learning
  'python': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  'machine learning': { isML: true },
  'ml': { isML: true },
  'data science': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
  'numpy': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  'pandas': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  'scikit-learn': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },
  'scikitlearn': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },
  'sklearn': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },

  // Languages & Version Control
  'git': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  'github': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', isDark: true },
  'c': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  'c++': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  'cpp': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  'java': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
};

function renderTechLogo(tech: string) {
  const normalized = tech.trim().toLowerCase();
  const entry = TECH_MAP[normalized];

  if (entry?.isBcrypt) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3.5 h-3.5 shrink-0 text-emerald-400 drop-shadow-sm"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#10b981" fillOpacity="0.25" />
        <circle cx="12" cy="11" r="2" fill="currentColor" />
        <path d="M12 13v3" />
      </svg>
    );
  }

  if (entry?.isJWT) {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" className="w-3.5 h-3.5 shrink-0 drop-shadow-sm" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#d63aff" strokeWidth="2" fill="#140f28" />
        <path d="M12 2a10 10 0 0 1 8.66 15L12 12Z" fill="#fb015b" />
        <path d="M20.66 17a10 10 0 0 1-17.32 0L12 12Z" fill="#00b9f1" />
        <path d="M3.34 17A10 10 0 0 1 12 2v10Z" fill="#d63aff" />
        <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
      </svg>
    );
  }

  if (entry?.isML) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3.5 h-3.5 shrink-0 text-cyan-400 drop-shadow-sm"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="2.5" fill="#00f5ff" fillOpacity="0.3" />
        <circle cx="18" cy="6" r="2.5" fill="#00f5ff" fillOpacity="0.3" />
        <circle cx="6" cy="18" r="2.5" fill="#00f5ff" fillOpacity="0.3" />
        <circle cx="18" cy="18" r="2.5" fill="#00f5ff" fillOpacity="0.3" />
        <circle cx="12" cy="12" r="3" fill="#a855f7" fillOpacity="0.4" />
        <path d="M8.2 7.2l2.3 3.3M15.8 7.2l-2.3 3.3M8.2 16.8l2.3-3.3M15.8 16.8l-2.3-3.3" stroke="#00f5ff" strokeWidth="1.2" />
      </svg>
    );
  }

  const iconUrl = entry?.icon || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg';
  const isDark = Boolean(entry?.isDark);

  return (
    <img
      src={iconUrl}
      alt={tech}
      className={`w-3.5 h-3.5 object-contain shrink-0 filter drop-shadow-sm ${
        isDark ? 'brightness-0 invert' : ''
      }`}
      onError={(e) => {
        (e.target as HTMLElement).style.display = 'none';
      }}
    />
  );
}

function getProjectVisualIcon(title: string, category: string) {
  return '🌐';
}

function ProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const color = categoryColors[project.category] ?? '#00f5ff';

  const gradients = [
    'from-cyan-500/20 via-blue-500/10 to-transparent',
    'from-purple-500/20 via-pink-500/10 to-transparent',
    'from-emerald-500/20 via-teal-500/10 to-transparent',
    'from-amber-500/20 via-orange-500/10 to-transparent',
    'from-indigo-500/20 via-violet-500/10 to-transparent',
  ];

  // A valid live site URL must be present, non-empty, not "#", and start with http/https
  const hasLiveSite = Boolean(
    project.liveUrl &&
    project.liveUrl.trim() !== '' &&
    project.liveUrl.trim() !== '#' &&
    project.liveUrl.startsWith('http')
  );

  // GitHub repo URL fallback to personal profile if project repo isn't explicitly set
  const repoUrl = project.githubUrl && project.githubUrl.trim() !== '' ? project.githubUrl : personalInfo.github;

  // Clicking on the project card directly opens the website if a live URL exists
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If the click is inside an interactive anchor/button, let it handle itself
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }

    if (hasLiveSite && project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`project-card opacity-0 glass rounded-3xl overflow-hidden glow-hover group relative flex flex-col h-full transition-all duration-300 ease-out select-none ${
        hovered ? 'z-30' : 'z-10'
      } ${hasLiveSite ? 'cursor-pointer hover:border-primary/60' : ''}`}
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role={hasLiveSite ? 'link' : undefined}
      tabIndex={hasLiveSite ? 0 : undefined}
      onKeyDown={(e) => {
        if (hasLiveSite && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
        }
      }}
      title={hasLiveSite ? `Click to visit ${project.title}` : undefined}
      style={{
        transform: hovered ? 'translateY(-10px) scale(1.04)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? `0 25px 60px -10px ${color}55, 0 0 35px ${color}35`
          : 'var(--shadow-glass)',
        borderColor: hovered ? `${color}80` : undefined,
      }}
    >
      {/* Thumbnail */}
      <div className={`relative h-44 sm:h-48 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center overflow-hidden`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="text-center select-none transform transition-transform duration-300 group-hover:scale-110">
            <div className="text-5xl mb-2 filter drop-shadow-md">
              {getProjectVisualIcon(project.title, project.category)}
            </div>
            <span
              className="text-xs font-mono opacity-50 tracking-wider"
              style={{ color }}
            >
              {'{ '}
              {project.technologies[0]}
              {' }'}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/30 to-transparent pointer-events-none" />

        {/* Category */}
        <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 glass rounded-lg text-[10px] font-medium text-slate-200 z-10 border border-white/10 backdrop-blur-md">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors flex items-center justify-between"
          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
        >
          <span>{project.title}</span>
          {hasLiveSite && (
            <ArrowUpRight
              size={16}
              className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-70 group-hover:opacity-100"
            />
          )}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags with accurate authentic original logos */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] font-mono font-medium transition-all duration-200 hover:scale-105"
              style={{
                background: `${color}0D`,
                borderColor: `${color}35`,
                color: '#e2e8f0',
              }}
              title={tech}
            >
              {renderTechLogo(tech)}
              <span className="leading-none">{tech}</span>
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          {hasLiveSite ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-neon group/btn z-10"
              style={{ background: 'var(--gradient-button)' }}
              title={`View ${project.title} live site`}
            >
              <Globe size={15} weight="bold" />
              <span>View Site</span>
              <ArrowUpRight
                size={13}
                weight="bold"
                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
              />
            </a>
          ) : (
            <div
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium glass border border-white/10 select-none cursor-default"
              title="Live site coming soon"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
              <span className="text-slate-200 font-semibold tracking-wide">Coming Soon</span>
            </div>
          )}

          {/* GitHub Repo button - always positioned beside View Site / Coming Soon */}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-xl glass border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-neon transition-all duration-300 flex items-center justify-center shrink-0 z-10"
            aria-label={`${project.title} GitHub Repository`}
            title={
              project.githubUrl && project.githubUrl.trim() !== ''
                ? `View ${project.title} GitHub Repository`
                : "View Debargha's GitHub Profile"
            }
          >
            <GithubLogo size={18} weight="bold" />
          </a>
        </div>
      </div>
    </div>
  );
}

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-label', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.proj-header', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.proj-title', { opacity: 0, y: 40, filter: 'blur(8px)' }, {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9,
        scrollTrigger: { trigger: '.proj-header', start: 'top 82%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.project-card', { opacity: 0, y: 60, filter: 'blur(5px)' }, {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.15, ease: 'power2.out',
        clearProps: 'transform,filter',
        scrollTrigger: { trigger: '.proj-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const noProjects = projectsData.length === 0;

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, hsl(180 100% 50% / 0.05), transparent 70%)' }} />
      <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full blur-2xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, hsl(271 81% 56% / 0.05), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="proj-header text-center mb-16">
          <div className="proj-label section-label mb-4 opacity-0">My Work</div>
          <h2
            className="proj-title text-4xl md:text-5xl xl:text-6xl font-black opacity-0"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Featured{' '}
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground font-light mt-4 max-w-xl mx-auto">
            A showcase of my technical work, demonstrating creativity, problem-solving, and engineering skills.
          </p>
        </div>

        {/* Grid / Row: Column-wise on phone, single row on desktop */}
        {noProjects ? (
          <div className="proj-grid text-center py-20">
            <div className="glass rounded-3xl p-12 max-w-md mx-auto">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Projects Coming Soon</h3>
              <p className="text-sm text-muted-foreground font-light">
                Add your projects to <code className="text-primary">src/data/portfolioData.ts</code> to display them here.
              </p>
            </div>
          </div>
        ) : (
          <div className="proj-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
            {projectsData.map((project, index) => (
              <div
                key={project.title}
                className="w-full h-full"
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-medium border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-neon transition-all duration-300 group"
          >
            <GithubLogo size={18} />
            View All on GitHub
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
