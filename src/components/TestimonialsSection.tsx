import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/data/portfolioData';
import { Quotes, User } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

function CompactWhiteTestimonialCard({ item }: { item: typeof testimonials[0] }) {
  const initials = item.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const avatarGradients = [
    'bg-gradient-to-tr from-cyan-500 to-blue-600',
    'bg-gradient-to-tr from-purple-500 to-indigo-600',
    'bg-gradient-to-tr from-emerald-500 to-teal-600',
    'bg-gradient-to-tr from-rose-500 to-pink-600',
    'bg-gradient-to-tr from-amber-500 to-orange-600',
  ];
  const gradientClass = avatarGradients[item.name.charCodeAt(0) % avatarGradients.length];

  return (
    <div
      className="flex-shrink-0 w-72 sm:w-80 bg-white rounded-2xl p-5 mx-3 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-default border border-slate-100 flex flex-col justify-between"
      style={{ height: '175px' }}
    >
      {/* Top Header with Avatar & Name */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {item.avatar ? (
            <img
              src={item.avatar}
              alt={item.name}
              className="w-9 h-9 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ${gradientClass}`}
            >
              {initials}
            </div>
          )}
          <div>
            <div className="text-sm font-bold text-slate-900 leading-tight">
              {item.name}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {item.role}
            </div>
          </div>
        </div>

        {/* Subtle quote glyph */}
        <Quotes size={20} weight="fill" className="text-slate-300" />
      </div>

      {/* Testimonial quote text */}
      <p className="text-xs text-slate-700 leading-relaxed font-normal line-clamp-3 my-2">
        "{item.text}"
      </p>

      {/* Card bottom footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400">
        <span className="font-medium text-cyan-600">Verified Peer</span>
        <span>Colleague Feedback</span>
      </div>
    </div>
  );
}

function TestimonialTrack({
  items,
  direction,
}: {
  items: typeof testimonials;
  direction: 'left' | 'right';
}) {
  // Tripled for seamless infinite looping
  const extended = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        className={direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {extended.map((item, i) => (
          <CompactWhiteTestimonialCard key={`${item.name}-${direction}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.test-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.test-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.test-tracks-wrapper',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.test-tracks-wrapper',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  return (
    <section id="testimonials" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(180 100% 50% / 0.04), transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(271 81% 56% / 0.04), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        {/* Header */}
        <div className="test-header text-center opacity-0">
          <div className="section-label mb-3">Recommendations & Feedback</div>
          <h2
            className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            What My <span className="text-gradient">Colleagues</span> Say
          </h2>
          <p className="text-muted-foreground font-light mt-4 max-w-xl mx-auto">
            Real peer testimonials and collaborative feedback from classmates, teammates, and project partners.
          </p>
        </div>
      </div>

      {/* Dual Opposite Direction Sliding Tracks */}
      <div className="test-tracks-wrapper opacity-0 space-y-4">
        <TestimonialTrack items={row1.length > 0 ? row1 : testimonials} direction="left" />
        <TestimonialTrack items={row2.length > 0 ? row2 : testimonials} direction="right" />
      </div>

      <div className="text-center mt-8">
        <p className="text-xs text-muted-foreground/60 font-light">
          Hover over any card to pause the slider and read
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
