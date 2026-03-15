import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Download, Clock, Package, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface Purchase {
  id: string;
  title: string;
  date: string;
  price: string;
  url: string;
}

export const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [user, setUser] = useState<{name: string, email: string, joined: string} | null>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('client_auth') === 'true';
    if (!isAuth) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(localStorage.getItem('client_user') || '{}');
    setUser(userData);

    const userPurchases = JSON.parse(localStorage.getItem('client_purchases') || '[]');
    setPurchases(userPurchases);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('client_auth');
    localStorage.removeItem('client_user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen relative bg-gray-50 dark:bg-gray-950 py-20 px-4 overflow-hidden">
      {/* Premium Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[100px] opacity-60 mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-500/10 rounded-full blur-[100px] opacity-60 mix-blend-screen" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Portfolio
        </button>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Profile */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-gray-200/50 dark:border-gray-800/50 text-center sticky top-24 relative overflow-hidden group">
              {/* Animated Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="relative w-28 h-28 mx-auto mb-6">
                  {/* Spinning Avatar Border */}
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-50 blur group-hover:opacity-100 animate-spin-slow transition-opacity duration-500" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-xl border-4 border-white dark:border-gray-900">
                    {user.name.charAt(0)}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{user.email}</p>
                
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 rounded-xl p-2.5 mb-8 border border-purple-100 dark:border-purple-500/20">
                  <Clock className="w-4 h-4" />
                  Member since {new Date(user.joined).toLocaleDateString()}
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gray-50 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-500/10 hover:text-red-500 text-gray-600 dark:text-gray-400 rounded-xl font-semibold transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-500/30 group/logout"
                >
                  <LogOut size={18} className="group-hover/logout:-translate-x-1 transition-transform duration-300" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content - Library */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">My Digital Library</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Access your purchased templates and assets</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 rounded-xl border border-purple-200/50 dark:border-purple-700/50 text-purple-700 dark:text-purple-300 font-bold shadow-sm">
                <Package className="w-5 h-5" />
                {purchases.length} Items
              </div>
            </div>

            {purchases.length === 0 ? (
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-gray-200/50 dark:border-gray-800/50 text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6">
                  <Package className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your library is empty</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">You haven't purchased any exclusive digital products, widgets, or templates yet.</p>
                <button
                  onClick={() => navigate('/#marketplace')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/25 hover:scale-105"
                >
                  Browse Marketplace
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {purchases.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    key={item.id} 
                    className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-500 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-5 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                         <Package className="w-8 h-8" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-500 transition-colors">{item.title}</h3>
                      
                      <div className="flex items-center gap-2 mb-6 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        Purchased: {new Date(item.date).toLocaleDateString()}
                      </div>
                      
                      <button
                        onClick={(e) => {
                          if (item.url === '#') {
                            e.preventDefault();
                            toast.success(`Preparing ${item.title} downloads...`);
                            
                            // Mocking file download logic for unlinked demo products
                            const element = document.createElement("a");
                            let fileContent = `==============================================
YOUR PURCHASE RECEIPT & ACCESS FILE
==============================================
Product: ${item.title}
Date Purchased: ${new Date(item.date).toLocaleDateString()}
Price: ${item.price}
----------------------------------------------
Thank you for trying out the marketplace demo!
This text file was securely auto-generated directly from the frontend to simulate a premium digital product download sequence.
Enjoy your purchase!
`;
                            if (item.id === 'portfolio-ai-prompts') {
                              fileContent = `# My Portfolio AI Prompts Masterclass
Thank you for purchasing! Here are the core structural prompts used to build this portfolio:

## 1. Initial Architecture
"I want to build a modern, glassmorphic portfolio using React, TailwindCSS, and Framer Motion. 
Create the initial file structure and app router layout with a dark/light mode context."

## 2. Admin Dashboard & Authentication
"Build a fully-functional Admin Dashboard that uses an AuthContext. The sidebar should have Lucide-react icons, and it must manage state for Projects, Skills, Services and a Marketplace."

## 3. Digital Marketplace Integration 
"I need a Marketplace Section for my portfolio. It should map through a 'marketplaceItems' array containing digital products. Add a 'Buy Now' button that redirects to a custom mock Checkout URL and captures the user's mock intent."

## 4. The Glowing Library Dashboard
"Build a 'My Library' page for digital product buyers. It should have a purple-to-blue mix-blend-screen glowing background. If the user clicks 'Access Files', force a Blob file download directly from the browser to simulate delivering the digital asset."

## 5. UI/UX Glassmorphism Specs
"Whenever you create a new element, wrap it in 'backdrop-blur-xl bg-white/80 dark:bg-gray-900/80' with a subtle border to establish a premium, Apple-like glassmorphic design language."

*Keep Prompting!*
- Ajnish Kumar
`;
                            }

                            const file = new Blob([fileContent], {type: 'text/plain'});
                            
                            element.href = URL.createObjectURL(file);
                            element.download = `${item.title.replace(/[\s/]+/g, '-').toLowerCase()}-assets.txt`;
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);
                          } else {
                            window.open(item.url, '_blank', 'noopener,noreferrer');
                          }
                        }}
                        className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-all overflow-hidden relative group/btn"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-white transition-colors duration-300">
                          <Download size={18} className="group-hover/btn:-translate-y-1 transition-transform" />
                          {item.url === '#' ? 'Access Files' : 'Download Now'}
                        </span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
