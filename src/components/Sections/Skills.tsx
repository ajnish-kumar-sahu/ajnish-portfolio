import React from 'react';
import { Code, Zap, Globe, Brain, Target, BookOpen } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { skills } from '../../data/portfolio';

const skillIcons: Record<string, React.ReactNode> = {
  java: <Code className="w-6 h-6" />,
  cpp: <Zap className="w-6 h-6" />,
  web: <Globe className="w-6 h-6" />,
  dsa: <Brain className="w-6 h-6" />,
  'problem-solving': <Target className="w-6 h-6" />,
  'cs-fundamentals': <BookOpen className="w-6 h-6" />,
};

export const Skills: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="skills" className="py-32 bg-[#0e0e0e] relative overflow-hidden">
      {/* Decorative Core Light */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#53ddfc]/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div ref={ref} className="text-center mb-20 max-w-3xl mx-auto">
          {/* Section Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#131313] border border-[#262626] text-[#ff86c3] text-xs font-bold font-mono tracking-widest uppercase mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Code size={14} />
            System Capabilities
          </div>

          {/* Section Title */}
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-display mb-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Technical{' '}
            <span className="italic text-[#ba9eff]">Matrix</span>
          </h2>

          <p
            className={`text-lg text-[#adaaaa] font-sans transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            A breakdown of my technical proficiencies, built on a strong foundation of computer science fundamentals and modern framework implementations.
          </p>
        </div>

        {/* Infinite Tech Marquee in Obsidian Style */}
        <div className="mb-24 overflow-hidden relative w-full flex">
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0e0e0e] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0e0e0e] to-transparent z-10" />

          <div className="animate-marquee gap-6 items-center py-4 flex">
            {[
              "React", "TypeScript", "Node.js", "Tailwind CSS", "Next.js", 
              "Java", "C++", "Python", "SQL", "Git", "MongoDB", "Figma",
              "React", "TypeScript", "Node.js", "Tailwind CSS", "Next.js", 
              "Java", "C++", "Python", "SQL", "Git", "MongoDB", "Figma"
            ].map((tech, i) => (
              <div 
                key={i} 
                className="px-6 py-3 bg-[#131313] border border-[#262626] rounded-md mx-3 whitespace-nowrap text-sm font-mono font-bold text-[#adaaaa] hover:text-[#53ddfc] hover:border-[#53ddfc]/50 transition-colors duration-300 cursor-default select-none shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grid - Obsidian Synth Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              icon={skillIcons[skill.id]}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillCardProps {
  skill: typeof skills[0];
  icon: React.ReactNode;
  index: number;
  isVisible: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, icon, index, isVisible }) => {
  const [cardRef, isCardVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div
      ref={cardRef}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group relative bg-[#131313] border border-[#262626] rounded-2xl p-8 hover:bg-[#1a1919] hover:border-[#494847] transition-all duration-500 overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Subtle Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ba9eff]/0 to-transparent group-hover:from-[#ba9eff]/5 transition-colors duration-700 pointer-events-none" />

      {/* Decorative vertical bar for "learning" appearance */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-12 bg-[#ff86c3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#ff86c3]" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon & Title row */}
        <div className="flex flex-row items-center gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-[#1a1919] border border-[#262626] rounded-xl flex items-center justify-center text-[#53ddfc] group-hover:text-[#ba9eff] group-hover:border-[#ba9eff]/50 group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-display font-bold text-white group-hover:text-[#ba9eff] transition-colors duration-300">
            {skill.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[#adaaaa] text-sm leading-relaxed mb-8 flex-grow font-sans">
          {skill.description}
        </p>

        {/* Progress System */}
        <div className="space-y-3 mt-auto">
          <div className="flex justify-between items-end">
            <span className="text-xs font-mono tracking-wider text-[#494847] uppercase">
              System Cap.
            </span>
            <span className="text-sm font-mono font-bold text-[#ff86c3]">
              {skill.proficiency}%
            </span>
          </div>
          
          <div className="w-full bg-[#0e0e0e] border border-[#262626] rounded-sm h-1.5 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-[#ba9eff] to-[#53ddfc] relative transition-all duration-1000 ease-out`}
              style={{ width: isCardVisible ? `${skill.proficiency}%` : '0%' }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0)_100%)] animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};