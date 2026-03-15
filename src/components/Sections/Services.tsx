import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code2, Zap, Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { services } from '../../data/portfolio';

// Icon mapping helper
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code2': return <Code2 size={24} />;
    case 'Zap': return <Zap size={24} />;
    case 'Sparkles': return <Sparkles size={24} />;
    case 'GraduationCap': return <GraduationCap size={24} />;
    default: return <Briefcase size={24} />;
  }
};

export const Services: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="services" className="py-20 relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6"
          >
            <Briefcase size={16} className="mr-2" />
            My Services
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            What I Can Do For{' '}
            <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent transform md:inline-block hover:scale-105 transition-transform duration-300">
              You
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Whether you need a dynamic web app, robust system architecture, or simple consulting, I bring dedication and precision to every project.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative bg-white/50 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden"
            >
               {/* Hover Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <div className="relative z-10">
                 <div className="flex items-start gap-5 mb-5">
                   {/* Icon */}
                   <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                     {getIcon(service.icon)}
                   </div>
                   
                   {/* Title & Desc */}
                   <div>
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors">
                       {service.title}
                     </h3>
                     <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                       {service.description}
                     </p>
                   </div>
                 </div>

                 {/* Features List */}
                 <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                   <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 opacity-70">
                     Core Features
                   </h4>
                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {service.features.map((feature, idx) => (
                       <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400 group/item">
                         <CheckCircle2 size={16} className="text-teal-500 mr-2 group-hover/item:scale-125 transition-transform" />
                         <span>{feature}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
