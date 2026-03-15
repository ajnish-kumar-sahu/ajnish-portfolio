import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, FolderKanban, Wrench, Mail, ShoppingBag,
  LogOut, Menu, X, Bell, Search, ChevronRight, TrendingUp,
  Users, Clock, BarChart3, Activity, Sparkles, Settings,
  Moon, Sun, Home, Briefcase, PieChart, Star,
  Zap, Code2, GraduationCap
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { projects as initProjects, skills as initSkills, marketplaceItems as initItems, personalInfo, services as initServices } from '../../data/portfolio';
import { AdminModal } from './AdminModal';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

let projects = [...initProjects];
let skills = [...initSkills];
let marketplaceItems = [...initItems];
let services = [...initServices];
let globalMessages = [
  { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Collaboration Opportunity', message: 'Hi Ajnish, I came across your portfolio...', time: '2 hours ago', read: false },
  { id: 2, name: 'Sarah Smith', email: 'sarah@company.com', subject: 'Internship Inquiry', message: 'Dear Ajnish, I represent a tech company looking for talented BCA students...', time: '5 hours ago', read: false },
  { id: 3, name: 'Tech Startup', email: 'hr@startup.io', subject: 'Freelance Project', message: 'We have a web development project that aligns with your skillset.', time: '1 day ago', read: false },
];

type Tab = 'overview' | 'analytics' | 'services' | 'projects' | 'skills' | 'messages' | 'marketplace' | 'settings';

export const AdminDashboard: React.FC = () => {
  const { adminName, logout, isAuthenticated } = useAdmin();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const sidebarItems = [
    { id: 'overview' as Tab, label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'analytics' as Tab, label: 'Analytics', icon: PieChart, badge: null },
    { id: 'services' as Tab, label: 'Services', icon: Briefcase, badge: services.length },
    { id: 'projects' as Tab, label: 'Projects', icon: FolderKanban, badge: projects.length },
    { id: 'skills' as Tab, label: 'Skills', icon: Wrench, badge: skills.length },
    { id: 'messages' as Tab, label: 'Messages', icon: Mail, badge: 3 },
    { id: 'marketplace' as Tab, label: 'Marketplace', icon: ShoppingBag, badge: marketplaceItems.length },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <>
    <Toaster position="top-right" toastOptions={{ className: 'dark:bg-gray-800 dark:text-white border dark:border-gray-700' }} />
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-950 flex"
    >
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col ${sidebarOpen ? 'w-72' : 'w-20'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 relative z-30`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
              <Sparkles size={20} className="text-white" />
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in">
                <h2 className="font-bold text-gray-900 dark:text-white text-sm">Admin Panel</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ajnish Portfolio</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon size={20} className={`flex-shrink-0 ${activeTab === item.id ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== null && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === item.id
                        ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
          >
            <Home size={20} />
            {sidebarOpen && <span>View Portfolio</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl animate-slide-in-left">
            <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">Admin Panel</span>
              </div>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== null && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300">
                <LogOut size={20} /><span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <Menu size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <Menu size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white capitalize">{activeTab}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 w-40"
                />
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 group"
              >
                {theme === 'dark' ? <Sun size={18} className="text-gray-400 group-hover:text-yellow-500" /> : <Moon size={18} className="text-gray-400 group-hover:text-indigo-500" />}
              </button>

              {/* Notifications */}
              <button className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <Bell size={18} className="text-gray-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                <img
                  src="/ajnish-profile.jpg"
                  alt="Admin Profile"
                  className="w-10 h-10 object-cover rounded-xl shadow-md border-2 border-white dark:border-gray-800"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{adminName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="animate-fade-in">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'services' && <ServicesTab />}
            {activeTab === 'projects' && <ProjectsTab />}
            {activeTab === 'skills' && <SkillsTab />}
            {activeTab === 'messages' && <MessagesTab />}
            {activeTab === 'marketplace' && <MarketplaceTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </main>
      </div>
    </motion.div>
    </>
  );
};

// Overview Tab
const OverviewTab: React.FC = () => {
  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderKanban, color: 'from-blue-500 to-indigo-600', change: '+2 this month', trend: 'up' },
    { label: 'Skills Listed', value: skills.length, icon: Wrench, color: 'from-teal-500 to-emerald-600', change: '+1 this month', trend: 'up' },
    { label: 'Marketplace Items', value: marketplaceItems.length, icon: ShoppingBag, color: 'from-purple-500 to-pink-600', change: 'Active', trend: 'up' },
    { label: 'Unread Messages', value: globalMessages.filter(m => !m.read).length, icon: Mail, color: 'from-orange-500 to-red-600', change: `${globalMessages.filter(m => !m.read).length} new today`, trend: 'up' },
  ];

  const recentActivity = [
    { action: 'New contact message received', time: '2 hours ago', type: 'message' },
    { action: 'Project "Portfolio Website" updated', time: '5 hours ago', type: 'project' },
    { action: 'New marketplace item added', time: '1 day ago', type: 'marketplace' },
    { action: 'Skills section updated', time: '2 days ago', type: 'skill' },
    { action: 'Profile picture changed', time: '3 days ago', type: 'profile' },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {personalInfo.name}! 👋</h2>
          <p className="text-blue-100 text-lg">Here's what's happening with your portfolio today.</p>
        </div>
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={22} className="text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
                <TrendingUp size={14} />
                {stat.change}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity size={20} className="text-blue-500" />
              Recent Activity
            </h3>
            <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'message' ? 'bg-blue-500/10 text-blue-500' :
                  activity.type === 'project' ? 'bg-purple-500/10 text-purple-500' :
                  activity.type === 'marketplace' ? 'bg-pink-500/10 text-pink-500' :
                  activity.type === 'skill' ? 'bg-teal-500/10 text-teal-500' :
                  'bg-orange-500/10 text-orange-500'
                }`}>
                  {activity.type === 'message' ? <Mail size={18} /> :
                   activity.type === 'project' ? <FolderKanban size={18} /> :
                   activity.type === 'marketplace' ? <ShoppingBag size={18} /> :
                   activity.type === 'skill' ? <Wrench size={18} /> :
                   <Users size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {activity.time}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <BarChart3 size={20} className="text-indigo-500" />
            Quick Stats
          </h3>
          <div className="space-y-6">
            {/* Portfolio Views */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Portfolio Views</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">1,247</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-[75%] transition-all duration-1000" />
              </div>
            </div>
            {/* Contact Form */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Contact Form Rate</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">68%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full w-[68%] transition-all duration-1000" />
              </div>
            </div>
            {/* Engagement */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Engagement</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">82%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-[82%] transition-all duration-1000" />
              </div>
            </div>
            {/* Uptime */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                <span className="text-sm font-bold text-green-500">99.9%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-[99%] transition-all duration-1000" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Projects Tab
const ProjectsTab: React.FC = () => {
  const [list, setList] = useState(projects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleDelete = (id: string) => {
    const updated = list.filter(p => p.id !== id);
    projects = updated;
    setList(updated);
    toast.success('Project deleted successfully');
  };

  const handleAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: any) => {
    setEditingData(project);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingData) {
      const updated = list.map(item => item.id === editingData.id ? { ...data, id: editingData.id } : item);
      projects = updated;
      setList(updated);
      toast.success('Project updated successfully');
    } else {
      const newItem = { ...data, id: Date.now().toString() };
      const updated = [...list, newItem];
      projects = updated;
      setList(updated);
      toast.success('Project created successfully');
    }
  };

  const fields = [
    { name: 'title', label: 'Project Title', type: 'text' as const },
    { name: 'description', label: 'Short Description', type: 'textarea' as const },
    { name: 'technologies', label: 'Technologies (Comma Separated)', type: 'array' as const },
    { name: 'status', label: 'Status', type: 'select' as const, options: ['completed', 'in-progress', 'planned'] },
    { name: 'featured', label: 'Featured Indicator', type: 'boolean' as const }
  ];

  return (
    <div className="space-y-6">
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingData ? 'Edit Project' : 'Add New Project'}
        fields={fields}
        initialData={editingData}
        onSave={handleSave}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Projects</h2>
        <button onClick={handleAdd} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
          + Add Project
        </button>
      </div>
      <div className="grid gap-4">
        <AnimatePresence>
          {list.map((project) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={project.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      project.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      project.status === 'in-progress' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {project.status}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(project)} className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="px-4 py-2 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Skills Tab
const SkillsTab: React.FC = () => {
  const [list, setList] = useState(skills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleDelete = (id: string) => {
    const updated = list.filter(s => s.id !== id);
    skills = updated;
    setList(updated);
    toast.success('Skill removed successfully');
  };

  const handleAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (skill: any) => {
    setEditingData(skill);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingData) {
      const updated = list.map(item => item.id === editingData.id ? { ...data, id: editingData.id } : item);
      skills = updated;
      setList(updated);
      toast.success('Skill updated successfully');
    } else {
      const newItem = { ...data, id: Date.now().toString() };
      const updated = [...list, newItem];
      skills = updated;
      setList(updated);
      toast.success('Skill added successfully');
    }
  };

  const fields = [
    { name: 'name', label: 'Skill Name', type: 'text' as const },
    { name: 'category', label: 'Category', type: 'select' as const, options: ['frontend', 'backend', 'core', 'tools'] },
    { name: 'proficiency', label: 'Proficiency (%)', type: 'text' as const },
    { name: 'description', label: 'Description', type: 'textarea' as const }
  ];

  return (
    <div className="space-y-6">
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingData ? 'Edit Skill' : 'Add New Skill'}
        fields={fields}
        initialData={editingData}
        onSave={handleSave}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Skills</h2>
        <button onClick={handleAdd} className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 transform hover:scale-105">
          + Add Skill
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {list.map((skill) => (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} key={skill.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{skill.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">{skill.category}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{skill.description}</p>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                  <span className="font-bold text-gray-900 dark:text-white">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(skill)} className="flex-1 px-3 py-2 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(skill.id)} className="px-3 py-2 rounded-xl text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Messages Tab
const MessagesTab: React.FC = () => {
  const [msgs, setMsgs] = useState(globalMessages);

  const handleDelete = (id: number) => {
    const updated = msgs.filter(m => m.id !== id);
    globalMessages = updated;
    setMsgs(updated);
    toast.success('Message deleted from inbox');
  };

  const markRead = (id: number) => {
    const updated = msgs.map(m => m.id === id ? { ...m, read: true } : m);
    globalMessages = updated;
    setMsgs(updated);
    toast.success('Marked as read');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h2>
        <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
          {msgs.filter(m => !m.read).length} unread
        </span>
      </div>
      <div className="grid gap-4">
        <AnimatePresence>
          {msgs.map((msg) => (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={msg.id} className={`bg-white dark:bg-gray-900 rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${
              !msg.read ? 'border-blue-300 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-800'
            }`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {msg.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{msg.name}</h3>
                    <div className="flex items-center gap-2">
                      {!msg.read && <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />}
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Clock size={12} /> {msg.time}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{msg.email}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{msg.subject}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{msg.message}</p>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => { markRead(msg.id); toast('Opening reply window...', {icon: '📨'}); }} className="px-4 py-2 rounded-xl text-xs font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                      Reply
                    </button>
                    {!msg.read && (
                      <button onClick={() => markRead(msg.id)} className="px-4 py-2 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        Mark as Read
                      </button>
                    )}
                    <button onClick={() => handleDelete(msg.id)} className="px-4 py-2 rounded-xl text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Marketplace Tab
const MarketplaceTab: React.FC = () => {
  const [list, setList] = useState(marketplaceItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleDelete = (id: string) => {
    const updated = list.filter(item => item.id !== id);
    marketplaceItems = updated;
    setList(updated);
    toast.success('Item deleted successfully');
  };

  const handleAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingData(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingData) {
      const updated = list.map(item => item.id === editingData.id ? { ...data, id: editingData.id } : item);
      marketplaceItems = updated;
      setList(updated);
      toast.success('Item updated successfully');
    } else {
      const newItem = { ...data, id: Date.now().toString() };
      const updated = [...list, newItem];
      marketplaceItems = updated;
      setList(updated);
      toast.success('Item added successfully');
    }
  };

  const fields = [
    { name: 'title', label: 'Item Title', type: 'text' as const },
    { name: 'description', label: 'Short Description', type: 'textarea' as const },
    { name: 'price', label: 'Price (e.g. Free, $15.00)', type: 'text' as const },
    { name: 'url', label: 'Checkout URL / File URL', type: 'text' as const },
    { name: 'badge', label: 'Badge (e.g. Premium, Trending)', type: 'text' as const },
    { name: 'features', label: 'Features (Comma Separated)', type: 'array' as const }
  ];

  return (
    <div className="space-y-6">
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingData ? 'Edit Marketplace Item' : 'Add New Item'}
        fields={fields}
        initialData={editingData}
        onSave={handleSave}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Marketplace</h2>
        <button onClick={handleAdd} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105">
          + Add Item
        </button>
      </div>
      <div className="grid gap-4">
        {list.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <ShoppingBag size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      {item.badge} • {item.price}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.features.map((f, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(item)} className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="px-4 py-2 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                  Delete
                </button>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Settings Tab
const SettingsTab: React.FC = () => {
  const handleSaveProfile = () => toast.success('Profile settings updated locally!');
  const handleUpdatePassword = () => toast.success('Security settings updated locally!');

  return (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
    
    <div className="grid gap-6">
      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={personalInfo.name}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              defaultValue={personalInfo.title}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              defaultValue={personalInfo.email}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
            <input
              type="text"
              defaultValue={personalInfo.location}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
            <textarea
              rows={4}
              defaultValue={personalInfo.bio}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
            />
          </div>
        </div>
        <button onClick={handleSaveProfile} className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
          Save Changes
        </button>
      </div>

      {/* Security */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Security</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
        <button onClick={handleUpdatePassword}  className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
          Update Password
        </button>
      </div>
    </div>
  </div>
  );
};


// Analytics Tab
const AnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics Overview</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Track your portfolio performance</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Traffic Sources</h3>
          <div className="h-64 flex items-end gap-2">
             {[40, 70, 45, 90, 65, 85, 50].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end gap-2 group">
                  <div className="w-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg transition-all duration-500 group-hover:from-blue-400 group-hover:to-indigo-400" style={{ height: `${h}%` }}>
                     <div className="opacity-0 group-hover:opacity-100 absolute -mt-8 bg-gray-900 text-white text-xs py-1 px-2 rounded -ml-2 transition-opacity">{h}%</div>
                  </div>
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400 font-medium pb-2">Day {i+1}</div>
                </div>
             ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Audience Geo</h3>
          <div className="space-y-4">
             {[
               {c: 'United States', p: 45},
               {c: 'India', p: 30},
               {c: 'United Kingdom', p: 15},
               {c: 'Canada', p: 10}
             ].map((geo, i) => (
               <div key={i}>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="font-medium text-gray-700 dark:text-gray-300">{geo.c}</span>
                   <span className="font-bold text-gray-900 dark:text-white">{geo.p}%</span>
                 </div>
                 <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${geo.p}%` }}></div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// Services Tab
const ServicesTab: React.FC = () => {
  const [list, setList] = useState(services);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleDelete = (id: string) => {
    const updated = list.filter(item => item.id !== id);
    services = updated;
    setList(updated);
    toast.success('Service deleted successfully');
  };

  const handleAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: any) => {
    setEditingData(service);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingData) {
      const updated = list.map(item => item.id === editingData.id ? { ...data, id: editingData.id } : item);
      services = updated;
      setList(updated);
      toast.success('Service updated successfully');
    } else {
      const newItem = { ...data, id: Date.now().toString() };
      const updated = [...list, newItem];
      services = updated;
      setList(updated);
      toast.success('Service added successfully');
    }
  };

  const fields = [
    { name: 'title', label: 'Service Title', type: 'text' as const },
    { name: 'description', label: 'Short Description', type: 'textarea' as const },
    { name: 'icon', label: 'Icon Name (e.g. Sparkles, Code2)', type: 'text' as const },
    { name: 'features', label: 'Features (Comma Separated)', type: 'array' as const }
  ];

  return (
    <div className="space-y-6">
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingData ? 'Edit Service' : 'Add New Service'}
        fields={fields}
        initialData={editingData}
        onSave={handleSave}
      />
      <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Services Engine</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage the services you offer</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300">
          <Briefcase size={16} /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-teal-500/30 hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl flex items-center justify-center">
                {item.icon === 'Sparkles' ? <Sparkles size={24} /> :
                 item.icon === 'Code2' ? <Code2 size={24} /> :
                 item.icon === 'Zap' ? <Zap size={24} /> :
                 item.icon === 'GraduationCap' ? <GraduationCap size={24} /> :
                 <Briefcase size={24} />}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                  <Settings size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{item.description}</p>
            
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-900 dark:text-white uppercase px-2">Core Features</div>
              {item.features.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                  <Star size={12} className="text-teal-500" />
                  {feat}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
