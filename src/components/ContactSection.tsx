import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  House,
  EnvelopeSimple,
  Info,
  GithubLogo,
  LinkedinLogo,
  PaperPlaneTilt,
  CheckCircle,
  WarningCircle,
  MapPin,
} from 'phosphor-react';
import { XLogoIcon, GmailIcon } from '@/components/icons/BrandIcons';
import { personalInfo } from '@/data/portfolioData';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(8, 'Message must be at least 8 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-main-card',
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-main-card',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    try {
      // Simulate submission or connect to email service
      await new Promise((resolve) => setTimeout(resolve, 1400));
      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        className="absolute top-1/3 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(180 100% 50% / 0.05), transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(271 81% 56% / 0.05), transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ════════ MAIN CONTACT CONTAINER (MATCHING REFERENCE IMAGE) ════════ */}
        <div className="contact-main-card opacity-0 relative bg-[#090d16] border-2 border-[#161f33] rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* Subtle Dark Faceted Crystal/Polygonal Texture Background */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 1000 700"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 350,150 150,450 0,600" fill="#0f172a" opacity="0.6" />
              <polygon points="350,150 700,50 550,400 150,450" fill="#131e33" opacity="0.4" />
              <polygon points="700,50 1000,0 900,350 550,400" fill="#0f172a" opacity="0.5" />
              <polygon points="150,450 550,400 450,700 0,600" fill="#16233d" opacity="0.3" />
              <polygon points="550,400 900,350 1000,700 450,700" fill="#0b111e" opacity="0.7" />
            </svg>
          </div>

          {/* ── TOP RIGHT: SOCIAL ICONS (MATCHING REFERENCE) ── */}
          <div className="relative z-20 flex justify-end gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            {[
              { icon: <GithubLogo size={18} weight="bold" />, url: personalInfo.github, label: 'GitHub' },
              { icon: <LinkedinLogo size={18} weight="bold" />, url: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: <XLogoIcon size={16} />, url: 'https://x.com/Debargha_DM', label: 'X (formerly Twitter)' },
              { icon: <GmailIcon size={18} />, url: `mailto:${personalInfo.email}`, label: 'Gmail' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-primary hover:border-primary/50"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* ── FAR LEFT: FLOATING QUICK NAVIGATION STRIP (MATCHING REFERENCE) ── */}
            <div className="hidden lg:flex lg:col-span-1 flex-col items-center gap-4 py-8">
              {/* Home */}
              <button
                onClick={() => scrollTo('home')}
                className="w-11 h-11 rounded-full bg-[#151c2c] hover:bg-[#1e283d] text-slate-300 hover:text-primary flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110"
                aria-label="Scroll to top"
              >
                <House size={20} weight="fill" />
              </button>

              {/* Active Message Icon (Highlighted in Cyan Gradient Accent) */}
              <div className="w-12 h-12 rounded-full bg-gradient-button flex items-center justify-center text-primary-foreground shadow-[0_0_20px_hsl(180_100%_50%/0.5)] cursor-default">
                <GmailIcon size={21} />
              </div>

              {/* Info / About */}
              <button
                onClick={() => scrollTo('about')}
                className="w-11 h-11 rounded-full bg-[#151c2c] hover:bg-[#1e283d] text-slate-300 hover:text-primary flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110"
                aria-label="About section"
              >
                <Info size={20} weight="bold" />
              </button>
            </div>

            {/* ── LEFT COLUMN: FORM CONTENT (MATCHING REFERENCE) ── */}
            <div className="lg:col-span-6 space-y-6">
              {/* Heading */}
              <div>
                <h3
                  className="text-4xl sm:text-5xl font-black text-white tracking-tight"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  Let's <span className="text-gradient">talk</span>
                </h3>
                <p className="text-sm text-slate-400 font-light mt-3 leading-relaxed max-w-md">
                  To request a quote or want to meet up for coffee, contact me directly or fill out the form and I will get back to you soon.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md" noValidate>
                {/* Your Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Rahul Sen"
                    className="w-full h-12 rounded-2xl bg-[#141b2a] border border-[#202a40] focus:border-primary px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
                  />
                  {errors.name && (
                    <span className="text-xs text-rose-400 block ml-1">{errors.name.message}</span>
                  )}
                </div>

                {/* Your Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 block">
                    Your Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="example@gmail.com"
                    className="w-full h-12 rounded-2xl bg-[#141b2a] border border-[#202a40] focus:border-primary px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
                  />
                  {errors.email && (
                    <span className="text-xs text-rose-400 block ml-1">{errors.email.message}</span>
                  )}
                </div>

                {/* Your Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 block">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    {...register('message')}
                    placeholder="Type your message here..."
                    className="w-full rounded-2xl bg-[#141b2a] border border-[#202a40] focus:border-primary p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all resize-none"
                  />
                  {errors.message && (
                    <span className="text-xs text-rose-400 block ml-1">{errors.message.message}</span>
                  )}
                </div>

                {/* Submit Button (Matching Reference layout & styling) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-neon disabled:opacity-50"
                    style={{ background: 'var(--gradient-button)' }}
                  >
                    {submitStatus === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <PaperPlaneTilt size={16} weight="bold" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Feedback Alerts */}
                {submitStatus === 'success' && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle size={18} weight="fill" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                    <WarningCircle size={18} weight="fill" />
                    <span>Failed to send. Please reach out via email directly.</span>
                  </div>
                )}
              </form>
            </div>

            {/* ── RIGHT COLUMN: CONTACT PHOTO ── */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-4">
              <div className="relative w-full max-w-[420px] sm:max-w-[460px] flex items-center justify-center">
                <img
                  src="/img/contact-photo.png"
                  alt={personalInfo.name}
                  className="w-full h-auto object-contain rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
