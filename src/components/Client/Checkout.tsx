import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, CreditCard, ShieldCheck, CheckCircle2, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { marketplaceItems } from '../../data/portfolio';

export const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const product = marketplaceItems.find(p => p.id === id);

  useEffect(() => {
    // Check if user is logged in
    const isAuth = localStorage.getItem('client_auth') === 'true';
    if (!isAuth) {
      toast('Please login to continue purchase', { icon: '🔒' });
      navigate(`/login?redirect=/checkout/${id}`);
    } else {
      setIsAuthenticated(true);
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold dark:text-white mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/')} className="text-purple-500 hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  const handlePurchase = () => {
    // Mock purchase flow
    const existingPurchases = JSON.parse(localStorage.getItem('client_purchases') || '[]');
    if (!existingPurchases.some((p: any) => p.id === product.id)) {
      existingPurchases.push({
        id: product.id,
        title: product.title,
        date: new Date().toISOString(),
        price: product.price,
        url: product.url
      });
      localStorage.setItem('client_purchases', JSON.stringify(existingPurchases));
      toast.success('Purchase successful! Item added to your profile.');
    } else {
      toast('You already own this item!', { icon: 'ℹ️' });
    }
    
    // Redirect to profile
    navigate('/profile');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Portfolio
        </button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Checkout Details</h2>
              <p className="text-gray-500 dark:text-gray-400">Complete your secure purchase</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-6 mb-6">
                <div className="w-16 h-16 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{product.title}</h3>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    {product.badge}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider opacity-70">Included Access</h4>
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Total Price</span>
                <span className="text-3xl font-black text-gray-900 dark:text-white">{product.price}</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Simulation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Secure 1-Click Payment</h3>
              </div>

              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 border border-gray-700 overflow-hidden mb-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <CreditCard className="w-8 h-8 text-white/80" />
                    <span className="text-white/80 font-mono text-sm">TEST MODE</span>
                  </div>
                  <div className="space-y-1 mb-4">
                    <div className="text-white/50 text-[10px] uppercase tracking-widest font-semibold pb-1">Card Number</div>
                    <div className="text-white font-mono tracking-[0.2em]">•••• •••• •••• 4242</div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-white/50 text-[10px] uppercase tracking-widest font-semibold pb-1">Cardholder</div>
                      <div className="text-white text-sm font-medium">Demo User</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-[10px] uppercase tracking-widest font-semibold pb-1">Expires</div>
                      <div className="text-white text-sm font-medium">12/28</div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] flex justify-center items-center gap-2"
              >
                Pay {product.price} Now
                <ExternalLink className="w-5 h-5" />
              </button>

              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                This transaction is secured and encrypted. By purchasing, you agree to our terms of service.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
