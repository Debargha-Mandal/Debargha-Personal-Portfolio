import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, Trophy, CalendarBlank, MapPin } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   EDUCATION / JOURNEY TIMELINE COMPONENT
   Features physical character images leaning backward against
   the outer edges of alternating milestone cards.
   ============================================================ */

interface MilestoneItem {
  id: string;
  title: string;
  institution: string;
  year: string;
  grade: string;
  description: string;
  badge: string;
  side: 'left' | 'right';
  color: string;
  icon: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageHeightDesktop: string;
  imageWidthDesktop?: string;
  leanTransform: string;
  extraCardPadding: string;
}

const EducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        '.edu-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.edu-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Central line draw animation
      gsap.fromTo(
        '.timeline-center-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );

      // Milestones staggered reveals
      gsap.fromTo(
        '.timeline-milestone',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Ordered education milestones:
  // Milestone 1: 10th Secondary School -> RIGHT SIDE (character leans on outer right edge)
  // Milestone 2: 12th Higher Secondary -> LEFT SIDE (character leans on outer left edge)
  // Milestone 3: B.Tech College -> RIGHT SIDE (character leans on outer right edge)
  const milestones: MilestoneItem[] = [
    {
      id: 'secondary-10th',
      title: 'Secondary Education (10th)',
      institution: 'Your School Name',
      year: '2019 – 2021',
      grade: '92% Distinction',
      description:
        'Completed foundational schooling with excellence in mathematics, physical sciences, and computer literacy.',
      badge: 'Secondary Stage',
      side: 'right', // Milestone 1 on RIGHT
      color: '#00f5ff',
      icon: <Trophy size={20} weight="bold" />,
      imageSrc: '/img/School.png',
      imageAlt: 'Secondary school student with backpack and books leaning against card',
      imageHeightDesktop: 'h-64 sm:h-72 md:h-80 lg:h-96',
      leanTransform: 'rotate(-3.5deg)',
      extraCardPadding: 'md:pr-14 lg:pr-20',
    },
    {
      id: 'higher-secondary-12th',
      title: 'Higher Secondary (12th)',
      institution: 'Your School Name',
      year: '2021 – 2023',
      grade: '88% First Class',
      description:
        'Science stream focusing on Mathematics, Physics, Chemistry, and Computer Science with hands-on coding.',
      badge: 'High School Stage',
      side: 'left', // Milestone 2 on LEFT
      color: '#a855f7',
      icon: <BookOpen size={20} weight="bold" />,
      imageSrc: '/img/High%20School.png',
      imageAlt: 'High school student coding on laptop leaning backward against card',
      imageHeightDesktop: 'h-48 sm:h-56 md:h-64 lg:h-72',
      leanTransform: 'rotate(2deg)',
      extraCardPadding: 'md:pl-14 lg:pl-20',
    },
    {
      id: 'college-btech',
      title: 'B.Tech in Data Science',
      institution: 'Your University Name',
      year: '2023 – Present',
      grade: 'CGPA: 8.5/10',
      description:
        'Pursuing advanced full-stack software development, data science algorithms, database systems, and modern AI pipelines.',
      badge: 'Undergraduate Stage',
      side: 'right', // Milestone 3 on RIGHT
      color: '#10b981',
      icon: <GraduationCap size={20} weight="bold" />,
      imageSrc: '/img/College.png',
      imageAlt: 'College developer student sitting on stool with laptop leaning against card',
      imageHeightDesktop: 'h-56 sm:h-64 md:h-72 lg:h-84',
      leanTransform: 'rotate(-2.5deg)',
      extraCardPadding: 'md:pr-14 lg:pr-20',
    },
  ];

  return (
    <section id="journey" ref={sectionRef} className="py-28 relative overflow-hidden overflow-x-clip">
      {/* Background Ambience */}
      <div
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(180 100% 50% / 0.05), transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(271 81% 56% / 0.05), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="edu-header text-center mb-16 opacity-0">
          <div className="section-label mb-3">Academic Roadmap</div>
          <h2
            className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground font-light mt-4 max-w-xl mx-auto">
            An illustrated educational timeline tracing my path from school to full-stack engineering with milestone characters.
          </p>
        </div>

        {/* ════════ TIMELINE CONTAINER ════════ */}
        <div className="timeline-container relative max-w-5xl mx-auto">
          {/* Continuous Central Vertical Line */}
          <div
            className="timeline-center-line absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, #00f5ff 0%, #a855f7 50%, #10b981 100%)',
              boxShadow: '0 0 12px rgba(0,245,255,0.4)',
            }}
          />

          <div className="space-y-16 sm:space-y-24">
            {milestones.map((item) => {
              const isRight = item.side === 'right';

              return (
                <div
                  key={item.id}
                  className="timeline-milestone opacity-0 relative flex flex-col md:flex-row items-center"
                >
                  {/* Central Node Indicator */}
                  <div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full glass border-2 flex items-center justify-center z-30 shadow-neon"
                    style={{
                      borderColor: item.color,
                      backgroundColor: '#0b0f19',
                    }}
                  >
                    <span
                      className="w-3 h-3 rounded-full animate-ping"
                      style={{ background: item.color }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full absolute"
                      style={{ background: item.color }}
                    />
                  </div>

                  {/* ── ALTERNATING ROW CONTAINER ── */}
                  <div
                    className={`w-full flex ${
                      isRight ? 'md:justify-end' : 'md:justify-start'
                    }`}
                  >
                    {/* ── CARD + LEANING CHARACTER CONTAINER ── */}
                    <div
                      className={`w-full md:w-[48%] pl-12 md:pl-0 ${
                        isRight ? 'md:pl-8' : 'md:pr-8'
                      }`}
                    >
                      {/* Relative Card Group for Physical Leaning Overlap */}
                      <div className="relative group">
                        {/* ── GLASS CARD CONTENT ── */}
                        <div
                          className={`glass rounded-3xl p-6 sm:p-7 relative overflow-hidden group-hover:shadow-neon transition-all duration-300 ${item.extraCardPadding}`}
                          style={{
                            borderColor: `${item.color}35`,
                          }}
                        >
                          {/* Top Accent Strip */}
                          <div
                            className="absolute top-0 left-0 right-0 h-[2px]"
                            style={{ background: item.color }}
                          />

                          {/* Header Details */}
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className="text-xs px-3 py-1 rounded-full font-semibold"
                              style={{
                                background: `${item.color}20`,
                                color: item.color,
                                border: `1px solid ${item.color}40`,
                              }}
                            >
                              {item.badge}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                              <CalendarBlank size={14} />
                              <span>{item.year}</span>
                            </div>
                          </div>

                          {/* Degree / Standard */}
                          <h3
                            className="text-xl sm:text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors"
                            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                          >
                            {item.title}
                          </h3>

                          {/* Institution */}
                          <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-3 font-light">
                            <MapPin size={15} className="text-primary flex-shrink-0" />
                            <span>{item.institution}</span>
                          </div>

                          <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                            {item.description}
                          </p>

                          {/* Grade Badge */}
                          <div className="flex items-center justify-between pt-3 border-t border-glass-border">
                            <span className="text-xs text-muted-foreground">Achievement</span>
                            <span
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                              style={{
                                background: `${item.color}15`,
                                color: item.color,
                              }}
                            >
                              {item.grade}
                            </span>
                          </div>
                        </div>

                        {/* ── CHARACTER IMAGE: PHYSICALLY LEANING AGAINST CARD OUTER EDGE ── */}
                        <div
                          className={`absolute z-20 pointer-events-none select-none transition-transform duration-500 group-hover:scale-105 ${
                            isRight
                              ? '-right-6 sm:-right-8 md:-right-12 lg:-right-16 -bottom-3 sm:-bottom-4 md:-bottom-5'
                              : '-left-6 sm:-left-8 md:-left-12 lg:-left-16 -bottom-3 sm:-bottom-4 md:-bottom-5'
                          }`}
                          style={{
                            transform: item.leanTransform,
                            transformOrigin: isRight ? 'bottom left' : 'bottom right',
                          }}
                        >
                          {/* Ambient Character Glow */}
                          <div
                            className="absolute inset-4 rounded-full blur-2xl opacity-20 pointer-events-none"
                            style={{ background: item.color }}
                          />

                          <img
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            className={`${item.imageHeightDesktop} w-auto object-contain max-h-[85vh]`}
                            style={{
                              filter: `drop-shadow(0 16px 28px ${item.color}30) drop-shadow(0 6px 12px rgba(0,0,0,0.75))`,
                            }}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
