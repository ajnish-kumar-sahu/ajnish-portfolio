import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Code2,
  Globe,
  Trophy,
  BookOpen,
  Zap,
  Star,
} from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  tags?: string[];
  highlight?: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: 'Aug 2023',
    title: 'Started BCA at Vinoba Bhave University',
    description: 'Began my Bachelor of Computer Applications journey with a focus on Computer Science fundamentals, programming, and software development.',
    icon: <GraduationCap size={20} />,
    accentColor: '#53ddfc',
    glowColor: 'rgba(83,221,252,0.2)',
    tags: ['Education', 'BCA', 'CS'],
    highlight: true,
  },
  {
    id: '2',
    date: 'Oct 2023',
    title: 'Mastered Java Programming',
    description: 'Developed strong foundations in Java — OOP, data structures, threading, and Java Swing for GUI applications.',
    icon: <Code2 size={20} />,
    accentColor: '#ff86c3',
    glowColor: 'rgba(255,134,195,0.2)',
    tags: ['Java', 'OOP', 'GUI'],
  },
  {
    id: '3',
    date: 'Jan 2024',
    title: 'Built My First Web Projects',
    description: 'Created several responsive websites using HTML5, CSS3, and JavaScript including the Assignment Cover Generator which became publicly available.',
    icon: <Globe size={20} />,
    accentColor: '#53ddfc',
    glowColor: 'rgba(83,221,252,0.2)',
    tags: ['HTML', 'CSS', 'JavaScript'],
    highlight: true,
  },
  {
    id: '4',
    date: 'Mar 2024',
    title: 'C++ DSA Deep Dive',
    description: 'Completed an intensive study of Data Structures & Algorithms in C++ including AVL trees, graphs, heaps, and dynamic programming techniques.',
    icon: <BookOpen size={20} />,
    accentColor: '#ba9eff',
    glowColor: 'rgba(186,158,255,0.2)',
    tags: ['C++', 'DSA', 'Algorithms'],
  },
  {
    id: '5',
    date: 'Jun 2024',
    title: 'Monthly Item Management System',
    description: 'Built a full-featured C++ inventory system with CRUD operations, file-based persistence, and a clean terminal UI. Published on GitHub.',
    icon: <Zap size={20} />,
    accentColor: '#ffd580',
    glowColor: 'rgba(255,213,128,0.2)',
    tags: ['C++', 'CLI', 'CRUD'],
    highlight: true,
  },
  {
    id: '6',
    date: 'Sep 2024',
    title: 'Earned Multiple Certifications',
    description: 'Completed courses in Web Development, Java Programming, and Computer Networks — building strong theoretical and practical knowledge.',
    icon: <Trophy size={20} />,
    accentColor: '#ff86c3',
    glowColor: 'rgba(255,134,195,0.2)',
    tags: ['Certificate', 'Networking', 'Web Dev'],
  },
  {
    id: '7',
    date: 'Mar 2025',
    title: 'Launched Premium React Portfolio',
    description: 'Designed and built this full-stack portfolio with React, TypeScript, Framer Motion, Supabase, and an AI-powered chatbot from scratch.',
    icon: <Star size={20} />,
    accentColor: '#ba9eff',
    glowColor: 'rgba(186,158,255,0.2)',
    tags: ['React', 'TypeScript', 'Supabase'],
    highlight: true,
  },
];

export const Journey: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="journey" className="py-32 bg-[#0e0e0e] relative overflow-hidden">
      {/* Ambient orb */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ba9eff]/6 rounded-full blur-[140px]" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#131313] border border-[#262626] text-[#53ddfc] text-xs font-bold font-mono tracking-widest uppercase mb-6"
          >
            <Star size={14} />
            My Journey
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-display mb-6"
          >
            The{' '}
            <span className="italic text-[#53ddfc]">Timeline</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-[#adaaaa] font-sans max-w-2xl mx-auto"
          >
            Key milestones in my academic and development journey — from first lines of code to full-stack applications.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical glow line */}
          <div className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-8 w-px"
            style={{ background: 'linear-gradient(to bottom, #53ddfc, #ba9eff, #ff86c3)', opacity: 0.3 }}
          />

          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <TimelineCard
                key={event.id}
                event={event}
                index={index}
                isVisible={isVisible}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>

          {/* End marker */}
          <div className="relative flex justify-center mt-12 sm:ml-0 ml-6">
            <div
              className="flex items-center gap-2 px-5 py-2.5 text-[#0e0e0e] rounded-md text-xs font-bold font-mono uppercase tracking-widest animate-pulse shadow-lg"
              style={{ background: 'linear-gradient(135deg, #53ddfc, #ba9eff)', boxShadow: '0 0 24px rgba(83,221,252,0.3)' }}
            >
              <Zap size={14} />
              And the journey continues...
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
  isVisible: boolean;
  isLeft: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, index, isVisible, isLeft }) => {
  const [cardRef, isCardVisible] = useIntersectionObserver({ threshold: 0.2 });

  const cardContent = (
    <div
      className="relative bg-[#131313] border border-[#262626] rounded-2xl p-6 hover:border-[#494847] transition-all duration-500 group overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at top left, ${event.glowColor}, transparent 60%)` }}
      />
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: event.accentColor, boxShadow: `0 0 8px ${event.accentColor}` }}
      />

      <div className="relative z-10">
        {/* Date + highlight badge */}
        <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'sm:justify-end' : 'justify-start'}`}>
          <span className="text-[10px] font-mono font-bold text-[#494847] uppercase tracking-wider">
            {event.date}
          </span>
          {event.highlight && (
            <span
              className="px-2 py-0.5 text-[#0e0e0e] text-[10px] font-black rounded-sm uppercase tracking-wider"
              style={{ background: event.accentColor }}
            >
              Key
            </span>
          )}
        </div>

        <h3
          className={`font-display font-bold text-white text-base mb-2 group-hover:transition-colors duration-300 ${isLeft ? 'sm:text-right' : 'text-left'}`}
          style={{ color: 'white' }}
        >
          {event.title}
        </h3>

        <p className={`text-sm text-[#adaaaa] leading-relaxed mb-4 ${isLeft ? 'sm:text-right' : 'text-left'}`}>
          {event.description}
        </p>

        {event.tags && (
          <div className={`flex flex-wrap gap-1.5 ${isLeft ? 'sm:justify-end' : 'justify-start'}`}>
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-[#0e0e0e] border border-[#262626] text-[#adaaaa] text-[11px] font-mono font-medium rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isCardVisible && isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative flex items-start gap-6 sm:flex-row ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
    >
      {/* Desktop: card half */}
      <div className={`hidden sm:block flex-1 ${isLeft ? 'pr-8' : 'pl-8'}`}>
        <div className={`${isLeft ? 'ml-auto' : 'mr-auto'} max-w-sm`}>
          {cardContent}
        </div>
      </div>

      {/* Timeline node */}
      <div className="relative z-10 flex-shrink-0">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#0e0e0e] shadow-lg transition-all duration-300 hover:scale-110"
          style={{
            background: event.accentColor,
            boxShadow: `0 0 20px ${event.glowColor}, 0 4px 16px rgba(0,0,0,0.4)`,
          }}
        >
          {event.icon}
        </div>
      </div>

      {/* Mobile: card */}
      <div className="flex-1 sm:hidden">
        {cardContent}
      </div>

      {/* Desktop: right spacer */}
      <div className="hidden sm:block flex-1" />
    </motion.div>
  );
};
