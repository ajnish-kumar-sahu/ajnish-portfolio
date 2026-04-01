import { Skill, Project, SocialLink, PersonalInfo, Stats, NavigationItem, MarketplaceItem, ServiceItem } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Ajnish Kumar',
  title: 'BCA Student & Developer',
  tagline: 'Building tomorrow\'s solutions with today\'s code',
  bio: 'BCA student at Vinoba Bhave University, passionate about programming and web development. Specializing in Java, C/C++, and building innovative web applications with a focus on clean code and user experience.',
  location: 'Hazaribagh, Jharkhand',
  email: 'ajnishkumar7070@gmail.com',
  phone: '+91 9608415521',
  resumeUrl: '/resume.html',
};

export const stats: Stats = {
  yearsOfStudy: 2,
  projectsCompleted: 12,
  technologiesLearned: 8,
  certificationsEarned: 4,
};

export const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'marketplace', label: 'Marketplace', href: '#marketplace' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const skills: Skill[] = [
  {
    id: 'java',
    name: 'Java Programming',
    icon: '☕',
    description: 'Principal area of academic interest with strong foundation in object-oriented programming, data structures, and algorithm implementation.',
    proficiency: 85,
    category: 'programming',
  },
  {
    id: 'cpp',
    name: 'C & C++',
    icon: '⚡',
    description: 'Proficient in system programming, memory management, and performance-critical applications with solid understanding of core concepts.',
    proficiency: 80,
    category: 'programming',
  },
  {
    id: 'web',
    name: 'Web Development',
    icon: '🌐',
    description: 'Hands-on experience with HTML, CSS, JavaScript, and modern frameworks. Building responsive and interactive web applications.',
    proficiency: 78,
    category: 'web',
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    icon: '🧠',
    description: 'Actively building knowledge in DSA to develop analytical and problem-solving skills for efficient software solutions.',
    proficiency: 75,
    category: 'programming',
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    icon: '🎯',
    description: 'Developing analytical thinking and systematic approach to breaking down complex programming challenges.',
    proficiency: 82,
    category: 'soft',
  },
  {
    id: 'cs-fundamentals',
    name: 'Computer Science',
    icon: '📚',
    description: 'Specializing in Computer Science fundamentals with focus on software development and programming methodologies.',
    proficiency: 88,
    category: 'programming',
  },
];

export const services: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Custom Web Development',
    description: 'I design and build dynamic, highly responsive websites from scratch using modern web technologies tailored perfectly to your business needs.',
    icon: 'Sparkles',
    features: ['Responsive Design', 'SEO Optimized', 'Modern UI/UX', 'Cross-browser Compatibility']
  },
  {
    id: 'java-dev',
    title: 'Java Applications',
    description: 'Robust desktop applications and utility systems built using Java, focusing on object-oriented logic and secure architecture.',
    icon: 'Code2',
    features: ['Swing GUI Apps', 'System Modules', 'Data Processing', 'API Integrations']
  },
  {
    id: 'cpp-dev',
    title: 'C/C++ System Programming',
    description: 'Performance-critical applications, customized inventory systems, and complex data structure implementations designed for maximum efficiency.',
    icon: 'Zap',
    features: ['Inventory Systems', 'Algorithmic Solutions', 'Memory Optimization', 'File Handling']
  },
  {
    id: 'mentorship',
    title: 'Code Reviews & Mentorship',
    description: 'Comprehensive code reviews and 1-on-1 basic programming mentorship for beginner developers and students.',
    icon: 'GraduationCap',
    features: ['Code Optimization', 'Best Practices', 'Debugging Help', 'Architecture Advice']
  }
];

export const projects: Project[] = [
  {
    id: 'assignment-cover-generator',
    title: 'Assignment Cover Generator',
    description: 'Automated tool for generating professional assignment covers with customizable templates and formatting options.',
    longDescription: 'A comprehensive Java application that helps students create professional-looking assignment covers with various templates, automatic formatting, and customizable fields. Features include template selection, font customization, and export to multiple formats.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    demoUrl: 'https://ajnish-kumar-sahu.github.io/assignment-cover-generator/',
    githubUrl: 'https://github.com/ajnish-kumar-sahu/assignment-cover-generator',
    status: 'completed',
    featured: true,
    category: 'web',
  },
  {
    id: 'monthly-item-manager',
    title: 'Monthly Item List Management System',
    description: 'Comprehensive system for tracking and managing monthly inventory with CRUD operations and data persistence.',
    longDescription: 'A robust inventory management system built in C++ that allows users to track monthly items, manage categories, and generate reports. Features include data validation, file-based storage, and efficient data structures for optimal performance.',
    technologies: ['C++', 'Data Structures', 'File Management', 'CRUD Operations'],
    githubUrl: 'https://github.com/ajnish-kumar-sahu/Monthly-Item-List-Management-System',
    status: 'completed',
    featured: true,
    category: 'desktop',
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    description: 'Modern, responsive portfolio showcasing projects and skills with interactive design and smooth animations.',
    longDescription: 'A fully responsive portfolio website built with modern web technologies, featuring smooth animations, interactive elements, and optimized performance. Includes dark mode, contact forms, and SEO optimization.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    demoUrl: 'https://modern-react-typescr-ur2h.bolt.host',
    githubUrl: 'https://github.com/ajnish-kumar-sahu/portfolio',
    status: 'completed',
    featured: true,
    category: 'web',
  },
  {
    id: 'programming-solutions',
    title: 'Programming Practice Solutions',
    description: 'Collection of algorithmic solutions and data structure implementations in Java, C, and C++.',
    longDescription: 'A comprehensive repository of coding solutions covering various algorithmic problems, data structure implementations, and competitive programming challenges. Well-documented code with explanations and time complexity analysis.',
    technologies: ['Java', 'C/C++', 'Algorithms', 'Problem Solving'],
    githubUrl: 'https://github.com/ajnish-kumar-sahu/programming-solutions',
    status: 'in-progress',
    featured: false,
    category: 'academic',
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/ajnish-kumar-sahu',
    icon: 'Github',
    username: 'ajnish-kumar-sahu',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/ajnish-kumar-20ag',
    icon: 'Linkedin',
    username: 'ajnish-kumar-20ag',
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:ajnishkumar7070@gmail.com',
    icon: 'Mail',
    username: 'ajnishkumar7070@gmail.com',
  },
  {
    id: 'phone',
    name: 'Phone',
    url: 'tel:+919608415521',
    icon: 'Phone',
    username: '+91 9608415521',
  },
];

export const typingTexts = [
  'Java Developer',
  'Problem Solver',
  'Web Developer',
  'BCA Student',
  'Code Enthusiast',
  'Tech Innovator',
  'Future Engineer',
  'Creative Coder',
];

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: 'assignment-cover-generator',
    title: 'Assignment Cover Generator',
    description: 'A comprehensive tool that helps students create professional-looking assignment covers with various templates, automatic formatting, and customizable fields.',
    price: 'Free',
    url: 'https://ajnish-kumar-sahu.github.io/assignment-cover-generator/',
    features: [
      '7 Premium Templates',
      'Auto Theme Mode (Dark/Light)',
      'Real-time Preview',
      'Download as PDF/Image',
      'Interactive Particle Background'
    ],
    badge: 'Trending',
  },
  {
    id: 'bca-project-bundle',
    title: 'BCA Project Templates Pack',
    description: 'A complete starter pack with pre-configured project setups, database schemas, and documentation templates designed for BCA students.',
    price: '$15.00',
    url: '#',
    features: [
      '5 Complete Project Scaffolds',
      'Ready-to-use MySQL Schemas',
      'Synopsis & SRS Word Templates',
      'Diagrams (DFD, ER, Flowcharts)',
      'Lifetime Updates'
    ],
    badge: 'Popular',
  },
  {
    id: 'cpp-dsa-library',
    title: 'Advanced C++ DSA Library',
    description: 'A heavily optimized, plug-and-play C++ library containing pre-written data structures like AVL Trees, Graphs, and Heaps with built-in sorting algorithms.',
    price: '$9.99',
    url: '#',
    features: [
      'Zero-dependency Headers',
      'Memory Leak Tested',
      'O(1) & O(log n) Optimized Methods',
      'Comprehensive Documentation',
      '100+ Example Use Cases'
    ],
    badge: 'Code Asset',
  },
  {
    id: 'react-premium-ui',
    title: 'Modern React UI Kit',
    description: 'The exact glassmorphic, interactive, and Framer Motion animated components used in this very portfolio, ready to drop into your own React projects.',
    price: '$25.00',
    url: '#',
    features: [
      '20+ Custom Components',
      'Framer Motion Animations included',
      'Dark/Light Mode Ready',
      'Tailwind Config File',
      'Typescript Interfaces'
    ],
    badge: 'Premium',
  },
  {
    id: 'mentorship-session',
    title: '1-on-1 Code Mentorship (1 Hr)',
    description: 'Book a 60-minute personal consultation where we can pair-program, review your codebase, debug an issue, or discuss system architecture.',
    price: '$30.00',
    url: '#',
    features: [
      'Live Video Session',
      'Targeted Debugging',
      'Architecture Planning',
      'Best Practices Review',
      'Recorded Session Link'
    ],
    badge: 'Service',
  },
  {
    id: 'portfolio-ai-prompts',
    title: 'Portfolio AI Prompts Masterclass',
    description: 'The exact step-by-step AI prompts used to prompt-engineer and build this entire premium glassmorphic React portfolio from scratch.',
    price: '$9.00',
    url: '#',
    features: [
      '100+ Master Prompts',
      'UI/UX Engineering Prompts',
      'Debugging & Refactoring Prompts',
      'Component Generation Strategies',
      'Full PDF & Notion Template'
    ],
    badge: 'Trending',
  }
];