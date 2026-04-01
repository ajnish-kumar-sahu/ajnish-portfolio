import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
  initials: string;
  accentColor: string;
  glowColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    role: 'Associate Professor — CS',
    organization: 'Vinoba Bhave University',
    content: 'Ajnish demonstrates exceptional aptitude in programming and computer science fundamentals. His dedication to learning and problem-solving skills set him apart as a standout student — rare clarity of thought for his year.',
    rating: 5,
    initials: 'PS',
    accentColor: '#ba9eff',
    glowColor: 'rgba(186,158,255,0.25)',
  },
  {
    id: '2',
    name: 'Rohan Mehta',
    role: 'Senior Fellow Student',
    organization: 'BCA Program, 2024',
    content: 'Working with Ajnish on various projects has been a great experience. His technical skills — especially in Java and web development — combined with his collaborative approach and clean code instincts, make him an invaluable team member.',
    rating: 5,
    initials: 'RM',
    accentColor: '#53ddfc',
    glowColor: 'rgba(83,221,252,0.25)',
  },
  {
    id: '3',
    name: 'Ananya Singh',
    role: 'Study Group Lead',
    organization: 'Hazaribagh College',
    content: 'Ajnish\'s commitment to mastering DSA is impressive. He consistently helps others understand complex concepts and contributes meaningfully to our study sessions. One of the most consistent contributors in our batch.',
    rating: 5,
    initials: 'AS',
    accentColor: '#ff86c3',
    glowColor: 'rgba(255,134,195,0.25)',
  },
  {
    id: '4',
    name: 'Vikram Jha',
    role: 'Project Collaborator',
    organization: 'Open Source — GitHub',
    content: 'We collaborated on an HTML/CSS project and Ajnish\'s attention to detail and pixel-perfect execution was extraordinary. He pushes the bar on frontend quality and is never satisfied with "good enough".',
    rating: 5,
    initials: 'VJ',
    accentColor: '#ffd580',
    glowColor: 'rgba(255,213,128,0.25)',
  },
  {
    id: '5',
    name: 'Kavya Nair',
    role: 'Lab Partner',
    organization: 'C++ & DSA Module',
    content: 'Ajnish\'s grasp of data structures is well beyond his academic year. He debugs complex pointer and memory issues effortlessly. A genuine go-to resource for the entire class whenever things get tricky.',
    rating: 5,
    initials: 'KN',
    accentColor: '#6ee7b7',
    glowColor: 'rgba(110,231,183,0.25)',
  },
];

// Duplicate for seamless scroll loop
const allTestimonials = [...testimonials, ...testimonials];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div
    className="relative flex-shrink-0 w-[380px] bg-[#131313] border border-[#262626] rounded-2xl p-8 mx-4 group hover:border-[#494847] transition-all duration-500 overflow-hidden"
    style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.4)' }}
  >
    {/* Hover ambient glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
      style={{ background: `radial-gradient(circle at top left, ${testimonial.glowColor}, transparent 60%)` }}
    />

    {/* Left accent bar */}
    <div
      className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: testimonial.accentColor, boxShadow: `0 0 10px ${testimonial.accentColor}` }}
    />

    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        {/* Monogram avatar */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-[#0e0e0e] shadow-lg shrink-0"
          style={{ background: testimonial.accentColor, boxShadow: `0 4px 16px ${testimonial.glowColor}` }}
        >
          {testimonial.initials}
        </div>
        {/* Stars */}
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={14} className="fill-current" style={{ color: testimonial.accentColor }} />
          ))}
        </div>
      </div>

      {/* Quote icon */}
      <div className="mb-4">
        <Quote size={20} style={{ color: testimonial.accentColor, opacity: 0.4 }} />
      </div>

      {/* Content */}
      <p className="text-[#adaaaa] text-sm leading-relaxed mb-6 font-sans italic">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="border-t border-[#262626] pt-5">
        <h4
          className="font-bold text-white text-sm mb-0.5 group-hover:transition-colors duration-300"
          style={{ color: 'white' }}
        >
          {testimonial.name}
        </h4>
        <p className="text-[#adaaaa] text-xs">{testimonial.role}</p>
        <p className="text-xs font-mono mt-0.5" style={{ color: testimonial.accentColor, opacity: 0.7 }}>
          {testimonial.organization}
        </p>
      </div>
    </div>
  </div>
);

export const Testimonials: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const scrollPos = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const speed = 0.6; // px per frame
    const step = () => {
      if (!trackRef.current) { animFrameRef.current = requestAnimationFrame(step); return; }
      if (!isPaused.current) {
        scrollPos.current += speed;
        const half = trackRef.current.scrollWidth / 2;
        if (scrollPos.current >= half) scrollPos.current = 0;
        trackRef.current.style.transform = `translateX(-${scrollPos.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <section id="testimonials" className="py-32 bg-[#0e0e0e] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#ba9eff]/8 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#53ddfc]/8 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#131313] border border-[#262626] text-[#ff86c3] text-xs font-bold font-mono tracking-widest uppercase mb-6"
          >
            <Quote size={14} />
            Peer Feedback
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-display mb-6"
          >
            What People{' '}
            <span className="italic text-[#ba9eff]">Say</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-[#adaaaa] font-sans"
          >
            Feedback from professors, peers, and collaborators who have witnessed my growth and contributions firsthand.
          </motion.p>
        </div>
      </div>

      {/* Auto-scroll carousel (full width, outside max-w container) */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
      >
        {/* Edge fade masks */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#0e0e0e] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#0e0e0e] to-transparent z-10 pointer-events-none" />

        {/* Track */}
        <div
          ref={trackRef}
          className="flex py-4 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {allTestimonials.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Bottom label */}
      <div className="text-center mt-16 px-6">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#494847]">
          Hover to pause · Scroll for more
        </p>
      </div>
    </section>
  );
};
