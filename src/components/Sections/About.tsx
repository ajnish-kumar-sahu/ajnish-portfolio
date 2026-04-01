import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, MapPin, Calendar, Award, BookOpen, Code2, Trophy, Zap } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { personalInfo, stats } from '../../data/portfolio';

// Animated counter hook
function useAnimatedCounter(target: number, duration = 1500, isActive: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, target, duration]);

  return count;
}

const AchievementCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  target: number;
  suffix: string;
  color: string;
  delay: string;
  isVisible: boolean;
}> = ({ icon, label, target, suffix, color, delay, isVisible }) => {
  const [cardRef, isCardVisible] = useIntersectionObserver({ threshold: 0.3 });
  const count = useAnimatedCounter(target, 1200, isCardVisible && isVisible);

  return (
    <div
      ref={cardRef}
      style={{ transitionDelay: delay }}
      className={`bg-white dark:bg-[#131313] rounded-2xl p-6 border border-gray-200 dark:border-[#262626] shadow-lg hover:shadow-2xl dark:hover:border-[#494847] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white mb-4 shadow-md`}>
        {icon}
      </div>
      <div className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}>
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{label}</div>
    </div>
  );
};

export const About: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  const achievements = [
    {
      icon: <Calendar className="w-6 h-6" />,
      label: 'Years of Study',
      target: stats.yearsOfStudy,
      suffix: '+',
      color: 'from-blue-600 to-cyan-500',
      delay: '0ms',
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: 'Projects Completed',
      target: stats.projectsCompleted,
      suffix: '+',
      color: 'from-indigo-600 to-blue-500',
      delay: '100ms',
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      label: 'Technologies',
      target: stats.technologiesLearned,
      suffix: '+',
      color: 'from-teal-600 to-green-500',
      delay: '200ms',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Academic Focus',
      target: 100,
      suffix: '%',
      color: 'from-orange-600 to-amber-500',
      delay: '300ms',
    },
  ];

  const skills = [
    { name: 'Java Programming', level: 85, color: 'from-orange-500 to-red-500' },
    { name: 'C & C++', level: 80, color: 'from-blue-500 to-indigo-500' },
    { name: 'Web Development', level: 78, color: 'from-teal-500 to-cyan-500' },
    { name: 'Problem Solving', level: 82, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-[#0e0e0e] relative overflow-hidden">
      {/* Dark mode ambient glow */}
      <div className="pointer-events-none absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#53ddfc]/5 rounded-full blur-[140px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          {/* Section Badge */}
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <GraduationCap size={16} className="mr-2" />
            About Me
          </div>

          <h2
            className={`text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Academic Journey &{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              Aspirations
            </span>
          </h2>

          <p
            className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            BCA student at Vinoba Bhave University with passion for programming, web development,
            and continuous learning in computer science.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                My Academic Journey
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  I am currently pursuing my Bachelor of Computer Applications at Vinoba Bhave University,
                  Hazaribagh College, with specialization in Computer Science. My principal area of academic
                  interest lies in programming, especially Java, but I'm also proficient in C and C++.
                </p>
                <p>
                  I am actively working on building my knowledge in data structures and algorithms to develop
                  my analytical and problem-solving skills. Beyond core programming, I have a keen interest
                  in web development with hands-on experience in HTML, CSS, and JavaScript.
                </p>
                <p>
                  I am looking forward to internships, collaborative ventures, and networking opportunities
                  that will provide hands-on exposure and help me hone my technical skills further.
                </p>
              </div>
            </div>

            {/* Skill Progress Bars */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Code2 size={20} className="text-blue-500" />
                Core Skills
              </h3>
              {skills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} isVisible={isVisible} />
              ))}
            </div>

            {/* Education Details */}
            <div className="bg-white dark:bg-[#131313] rounded-2xl p-6 border border-gray-200 dark:border-[#262626] shadow-xl hover:shadow-2xl dark:hover:border-[#494847] transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Bachelor of Computer Applications
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400">Vinoba Bhave University</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>2023 - 2026 (Expected)</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-semibold">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Currently Enrolled
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className={`transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="grid grid-cols-2 gap-6 mb-8">
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.label}
                  icon={achievement.icon}
                  label={achievement.label}
                  target={achievement.target}
                  suffix={achievement.suffix}
                  color={achievement.color}
                  delay={achievement.delay}
                  isVisible={isVisible}
                />
              ))}
            </div>

            {/* Passion Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <BookOpen size={20} />, title: 'Always Learning', desc: 'DSA, Web Dev & more', color: 'from-blue-500 to-indigo-600' },
                { icon: <Trophy size={20} />, title: 'Goal-Oriented', desc: 'Certifications & Projects', color: 'from-purple-500 to-pink-600' },
                { icon: <Code2 size={20} />, title: 'Clean Code', desc: 'Best practices first', color: 'from-teal-500 to-cyan-600' },
                { icon: <Zap size={20} />, title: 'Fast Learner', desc: 'Adapts to new tech', color: 'from-orange-500 to-red-500' },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-white dark:bg-[#131313] rounded-xl p-4 border border-gray-200 dark:border-[#262626] hover:shadow-lg dark:hover:border-[#494847] transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{card.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SkillBarProps {
  skill: { name: string; level: number; color: string };
  isVisible: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, isVisible }) => {
  const [barRef, isBarVisible] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <div ref={barRef}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{skill.name}</span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-[#0e0e0e] dark:border dark:border-[#262626] rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
          style={{ width: isBarVisible && isVisible ? `${skill.level}%` : '0%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
};