import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, CheckCircle2, ExternalLink } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { marketplaceItems } from '../../data/portfolio';

export const Marketplace: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="marketplace" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800/50 dark:via-gray-900 dark:to-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          {/* Section Badge */}
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <ShoppingBag size={16} className="mr-2" />
            Marketplace
          </div>

          {/* Section Title */}
          <h2
            className={`text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Digital{' '}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Products
            </span>
          </h2>

          {/* Section Description */}
          <p
            className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Explore my collection of premium tools, templates, and digital resources designed to help you build faster and better.
          </p>
        </div>

        {/* Marketplace Items Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {marketplaceItems.map((item, index) => (
            <MarketplaceCard
              key={item.id}
              item={item}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface MarketplaceCardProps {
  item: typeof marketplaceItems[0];
  index: number;
  isVisible: boolean;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ item, index, isVisible }) => {
  const [cardRef] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div
      ref={cardRef}
      className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-500/30 dark:hover:border-purple-400/30 shadow-xl shadow-gray-200/20 dark:shadow-black/20 transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
        isVisible ? `opacity-100 translate-y-0 delay-${index * 100}` : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card Content */}
      <div className="relative p-8">
        {/* Header & Badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[14px] flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-purple-500 dark:text-purple-400" />
            </div>
          </div>
          
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            {item.badge}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
          {item.description}
        </p>

        {/* Price Tag */}
        <div className="mb-6 flex items-baseline gap-2">
          <span className="text-3xl font-black text-gray-900 dark:text-white">{item.price}</span>
        </div>

        {/* Features List */}
        <ul className="space-y-3 mb-8">
          {item.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-purple-500 dark:text-purple-400 mr-3 flex-shrink-0" />
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          to={`/checkout/${item.id}`}
          className="relative flex items-center justify-center w-full px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 group/btn overflow-hidden"
        >
          {/* Button Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300 group-hover/btn:scale-105" />
          
          <span className="relative z-10 flex items-center gap-2">
            Get it Now
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </span>
        </Link>
      </div>
    </div>
  );
};
