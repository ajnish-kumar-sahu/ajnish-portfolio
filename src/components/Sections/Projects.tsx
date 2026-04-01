import React, { useState } from 'react';
import { ExternalLink, Github, Folder, Star, Filter, Layers, Globe2, Monitor, GraduationCap } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { projects } from '../../data/portfolio';

type ProjectCategory = 'all' | 'web' | 'desktop' | 'academic' | 'mobile';

const CATEGORIES: { label: string; value: ProjectCategory; icon: React.ReactNode }[] = [
  { label: 'All', value: 'all', icon: <Layers size={14} /> },
  { label: 'Web', value: 'web', icon: <Globe2 size={14} /> },
  { label: 'Desktop', value: 'desktop', icon: <Monitor size={14} /> },
  { label: 'Academic', value: 'academic', icon: <GraduationCap size={14} /> },
];

export const Projects: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <section id="projects" className="py-32 bg-[#0e0e0e] relative overflow-hidden">
      {/* Decorative Core Light */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#ba9eff]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            {/* Section Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1a1919] border border-[#262626] text-[#ba9eff] text-xs font-bold font-mono tracking-widest uppercase mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Folder size={14} />
              Featured Works
            </div>

            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-display transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              The 
              <span className="italic text-[#53ddfc] mx-3">Project</span>
              Matrix
            </h2>
            <p
              className={`text-lg text-[#adaaaa] mt-6 max-w-xl transition-all duration-700 delay-300 font-sans ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              A curated collection of scalable web applications, performant desktop systems, and algorithmic academic research.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div
            className={`flex flex-wrap gap-2 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ba9eff] to-[#8455ef] text-[#000000] shadow-[0_0_20px_rgba(186,158,255,0.3)]'
                      : 'bg-[#131313] text-[#adaaaa] border border-[#262626] hover:bg-[#1a1919] hover:text-white'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid Results */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-32 bg-[#131313] border border-[#262626] rounded-2xl">
            <Filter className="mx-auto mb-4 text-[#494847]" size={48} />
            <p className="text-xl font-semibold text-[#adaaaa]">No projects found in this matrix sector.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-6 px-6 py-3 bg-[#1a1919] border border-[#262626] text-white rounded-xl hover:bg-[#262626] transition-colors"
            >
              View All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[380px]">
            {filteredProjects.map((project, index) => {
              // Create an asymmetrical bento grid by making the first featured project span 2 columns and 2 rows
              const isLargeBento = project.featured && index === 0;
              const isHorizontal = project.featured && index === 1;

              return (
                <BentoProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isVisible={isVisible}
                  isLarge={isLargeBento}
                  isHorizontal={isHorizontal}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

interface BentoProjectCardProps {
  project: typeof projects[0];
  index: number;
  isVisible: boolean;
  isLarge?: boolean;
  isHorizontal?: boolean;
}

const BentoProjectCard: React.FC<BentoProjectCardProps> = ({ 
  project, 
  index, 
  isVisible, 
  isLarge = false,
  isHorizontal = false 
}) => {
  const [cardRef] = useIntersectionObserver({ threshold: 0.1 });

  // Grid spanning logic
  const gridSpanClass = isLarge 
    ? "md:col-span-2 md:row-span-2" 
    : isHorizontal 
      ? "md:col-span-2 lg:col-span-2 lg:row-span-1" 
      : "md:col-span-1 lg:col-span-1 row-span-1";

  return (
    <div
      ref={cardRef}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group relative bg-[#1a1919] rounded-2xl border border-[#262626]/50 hover:border-[#ba9eff]/40 transition-all duration-500 overflow-hidden flex flex-col ${gridSpanClass} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Ambient Inner Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ba9eff]/0 to-[#ba9eff]/0 group-hover:from-[#ba9eff]/5 group-hover:to-transparent transition-colors duration-700 pointer-events-none" />

      {/* Decorative Grid Lines Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Content Container (Pushes image to bottom if needed, or splits horizontally) */}
      <div className={`p-8 flex ${isHorizontal ? 'flex-row items-center gap-8' : 'flex-col'} flex-grow justify-between relative z-10`}>
        
        <div className={`flex flex-col ${isHorizontal ? 'w-1/2' : 'h-full'}`}>
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#53ddfc] bg-[#003a45]/50 px-3 py-1 rounded-sm border border-[#005969]/30">
              {project.category}
            </span>
            {project.featured && (
              <Star className="w-5 h-5 text-[#ff86c3] fill-current opacity-80" />
            )}
          </div>

          <h3 className={`font-display font-bold text-white mb-4 group-hover:text-[#ba9eff] transition-colors duration-300 ${isLarge ? 'text-4xl' : 'text-2xl'}`}>
            {project.title}
          </h3>

          <p className="text-[#adaaaa] text-sm leading-relaxed mb-8 font-sans flex-grow">
            {isLarge ? project.longDescription : project.description}
          </p>

          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.slice(0, isLarge ? 6 : 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#131313] text-[#ffffff] border border-[#262626] rounded-md text-xs font-mono font-medium opacity-80 group-hover:opacity-100 group-hover:border-[#494847] transition-all"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && !isLarge && (
                <span className="px-2.5 py-1 text-[#adaaaa] text-xs font-mono font-medium">+{project.technologies.length - 3}</span>
              )}
            </div>

            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#131313] border border-[#262626] text-white rounded-xl hover:bg-[#ba9eff] hover:text-[#000000] hover:border-[#ba9eff] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_0_rgba(186,158,255,0)] hover:shadow-[0_8px_20px_rgba(186,158,255,0.2)]"
                  aria-label="View Source Code"
                >
                  <Github size={20} />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[linear-gradient(135deg,#53ddfc,#40ceed)] text-[#003a45] font-bold text-sm rounded-xl transform hover:-translate-y-1 shadow-[0_0_0_rgba(83,221,252,0)] hover:shadow-[0_8px_20px_rgba(83,221,252,0.3)] transition-all duration-300"
                >
                  <span>Live Matrix</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Abstract Visual Representation for Bento Card */}
        {isLarge && (
          <div className="absolute right-0 bottom-0 w-1/2 h-2/3 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
            <div className="w-full h-full border-t border-l border-[#494847] rounded-tl-[100px] flex items-center justify-center bg-gradient-to-br from-[#1a1919] to-[#0e0e0e]">
                <Folder className="w-32 h-32 text-[#ba9eff] opacity-50" />
            </div>
          </div>
        )}

        {isHorizontal && (
          <div className="w-1/2 h-full rounded-xl border border-[#262626] bg-[#0e0e0e] flex items-center justify-center overflow-hidden relative group/img">
            <div className="absolute inset-0 bg-[#53ddfc]/5 group-hover/img:bg-[#53ddfc]/10 transition-colors duration-500" />
            <Monitor className="w-24 h-24 text-[#53ddfc] opacity-20 filter blur-[2px] group-hover/img:blur-0 transition-all duration-500" />
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#53ddfc] tracking-widest opacity-50">SYS.ONLINE</div>
          </div>
        )}
      </div>
    </div>
  );
};