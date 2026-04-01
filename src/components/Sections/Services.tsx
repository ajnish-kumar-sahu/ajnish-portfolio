import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code2, Zap, Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { services } from '../../data/portfolio';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code2': return <Code2 size={24} />;
    case 'Zap': return <Zap size={24} />;
    case 'Sparkles': return <Sparkles size={24} />;
    case 'GraduationCap': return <GraduationCap size={24} />;
    default: return <Briefcase size={24} />;
  }
};

const SERVICE_ACCENTS = [
  { color: '#53ddfc', glow: 'rgba(83,221,252,0.2)' },
  { color: '#ba9eff', glow: 'rgba(186,158,255,0.2)' },
  { color: '#ff86c3', glow: 'rgba(255,134,195,0.2)' },
  { color: '#ffd580', glow: 'rgba(255,213,128,0.2)' },
];

export const Services: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="services" className="py-32 bg-[#0e0e0e] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#53ddfc]/6 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#ba9eff]/6 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#131313] border border-[#262626] text-[#53ddfc] text-xs font-bold font-mono tracking-widest uppercase mb-6"
          >
            <Briefcase size={14} />
            What I Offer
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-display mb-6"
          >
            Services &{' '}
            <span className="italic text-[#ba9eff]">Expertise</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-[#adaaaa] font-sans"
          >
            Whether you need a dynamic web app, robust system architecture, or focused mentorship — I bring dedication and precision to every engagement.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const accent = SERVICE_ACCENTS[index % SERVICE_ACCENTS.length];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative bg-[#131313] border border-[#262626] rounded-2xl p-8 hover:border-[#494847] transition-all duration-500 overflow-hidden"
                style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.4)' }}
              >
                {/* Hover ambient glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at top left, ${accent.glow}, transparent 60%)` }}
                />

                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: accent.color, boxShadow: `0 0 10px ${accent.color}` }}
                />

                {/* Grid lines overlay */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start gap-5 mb-6">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-[#0e0e0e] shadow-lg group-hover:scale-110 transition-transform duration-500"
                      style={{
                        background: accent.color,
                        boxShadow: `0 4px 20px ${accent.glow}`,
                      }}
                    >
                      {getIcon(service.icon)}
                    </div>

                    <div>
                      <h3
                        className="text-xl font-display font-bold text-white mb-1.5 group-hover:transition-colors duration-300"
                        style={{ }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#adaaaa] leading-relaxed font-sans">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-[#262626]">
                    <h4 className="text-[10px] font-mono font-bold text-[#494847] uppercase tracking-[0.2em] mb-4">
                      Core Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-[#adaaaa] group/item font-sans">
                          <CheckCircle2
                            size={15}
                            className="mr-2 shrink-0 transition-transform group-hover/item:scale-110 duration-200"
                            style={{ color: accent.color }}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
