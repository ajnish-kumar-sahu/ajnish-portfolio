import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const ClientAuth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectParams = queryParams.get('redirect') || '/profile';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error('Please fill in all fields');
      return;
    }

    // Mock Authentication
    localStorage.setItem('client_auth', 'true');
    localStorage.setItem('client_user', JSON.stringify({
      name: isLogin ? 'Demo User' : name,
      email: email,
      joined: new Date().toISOString()
    }));
    
    toast.success(isLogin ? 'Login successful!' : 'Account created!');
    navigate(redirectParams);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-b from-purple-500/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-t from-blue-500/10 to-transparent blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white mb-4 shadow-lg shadow-purple-500/20">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              {isLogin ? 'Sign in to access your digital products' : 'Join to download premium assets'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Return to Portfolio
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
