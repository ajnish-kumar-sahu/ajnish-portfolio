import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  CheckCircle2,
  ExternalLink,
  Search,
  Heart,
  Star,
  Filter,
  Tag,
  ShoppingCart,
  Zap,
  TrendingUp,
  X,
} from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { marketplaceItems } from '../../data/portfolio';

type FilterCategory = 'all' | 'free' | 'paid' | 'trending' | 'premium';

const BADGE_CATEGORIES: { label: string; value: FilterCategory; icon: React.ReactNode }[] = [
  { label: 'All', value: 'all', icon: <ShoppingBag size={14} /> },
  { label: 'Free', value: 'free', icon: <Tag size={14} /> },
  { label: 'Paid', value: 'paid', icon: <ShoppingCart size={14} /> },
  { label: 'Trending', value: 'trending', icon: <TrendingUp size={14} /> },
  { label: 'Premium', value: 'premium', icon: <Zap size={14} /> },
];

export const Marketplace: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartCount, setCartCount] = useState(0);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredItems = useMemo(() => {
    return marketplaceItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      if (activeFilter === 'free') matchesFilter = item.price === 'Free';
      else if (activeFilter === 'paid') matchesFilter = item.price !== 'Free';
      else if (activeFilter === 'trending') matchesFilter = item.badge === 'Trending';
      else if (activeFilter === 'premium') matchesFilter = item.badge === 'Premium';

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const freeCount = marketplaceItems.filter((i) => i.price === 'Free').length;
  const paidCount = marketplaceItems.filter((i) => i.price !== 'Free').length;

  return (
    <section
      id="marketplace"
      className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800/50 dark:via-gray-900 dark:to-gray-800/50 relative overflow-hidden"
    >
      {/* Background Decorative Blobs */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-transparent rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-400/10 via-purple-400/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-12">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <ShoppingBag size={16} className="mr-2" />
            Marketplace
          </div>

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

          <p
            className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Explore my collection of premium tools, templates, and digital resources designed to help you build faster and better.
          </p>

          {/* Stats Bar */}
          <div
            className={`flex flex-wrap justify-center gap-6 mb-10 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200/80 dark:border-gray-700/50 shadow-sm">
              <span className="text-2xl font-black text-purple-600 dark:text-purple-400">{marketplaceItems.length}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Products</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200/80 dark:border-gray-700/50 shadow-sm">
              <span className="text-2xl font-black text-green-600 dark:text-green-400">{freeCount}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Free Tools</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200/80 dark:border-gray-700/50 shadow-sm">
              <span className="text-2xl font-black text-pink-600 dark:text-pink-400">{paidCount}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Premium Assets</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200/80 dark:border-gray-700/50 shadow-sm">
              <Heart size={16} className="text-red-500" />
              <span className="text-2xl font-black text-red-600 dark:text-red-400">{wishlist.size}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Saved</span>
            </div>
          </div>

          {/* Search + Filter Controls */}
          <div
            className={`flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-8 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Cart Pill */}
            <button
              onClick={() => setCartCount((c) => Math.max(0, c > 0 ? c - 1 : 0))}
              className="relative flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter Pills */}
          <div
            className={`flex flex-wrap justify-center gap-2 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {BADGE_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === cat.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105'
                    : 'bg-white dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
            {activeFilter !== 'all' && (
              <button
                onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200"
              >
                <X size={14} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        {(searchQuery || activeFilter !== 'all') && (
          <div className="text-center mb-6 text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-bold text-purple-600 dark:text-purple-400">{filteredItems.length}</span> of{' '}
            {marketplaceItems.length} products
          </div>
        )}

        {/* Marketplace Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {filteredItems.map((item, index) => (
              <MarketplaceCard
                key={item.id}
                item={item}
                index={index}
                isVisible={isVisible}
                isWishlisted={wishlist.has(item.id)}
                onWishlistToggle={() => toggleWishlist(item.id)}
                onAddToCart={() => setCartCount((c) => c + 1)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter className="mx-auto mb-4 text-gray-300 dark:text-gray-600" size={48} />
            <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">No products found</p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">Try a different search or filter</p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

interface MarketplaceCardProps {
  item: typeof marketplaceItems[0];
  index: number;
  isVisible: boolean;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  onAddToCart: () => void;
}

const BADGE_STYLES: Record<string, string> = {
  Trending: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  Popular: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  Premium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500',
  'Code Asset': 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  Service: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
};

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({
  item,
  index,
  isVisible,
  isWishlisted,
  onWishlistToggle,
  onAddToCart,
}) => {
  const [cardRef] = useIntersectionObserver({ threshold: 0.2 });
  const isFree = item.price === 'Free';
  const badgeStyle = BADGE_STYLES[item.badge] || 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';

  // Generate a pseudo-random consistent rating for each item
  const rating = 4 + (index % 2 === 0 ? 0.5 : 0);
  const reviewCount = 12 + index * 7;

  return (
    <div
      ref={cardRef}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-500/30 dark:hover:border-purple-400/30 shadow-xl shadow-gray-200/20 dark:shadow-black/20 transition-all duration-500 overflow-hidden transform hover:-translate-y-3 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Top Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Free ribbon */}
      {isFree && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-black px-4 py-1 rounded-br-xl shadow-md">
            FREE
          </div>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={onWishlistToggle}
        className={`absolute top-4 right-4 z-10 p-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
          isWishlisted
            ? 'bg-red-100 dark:bg-red-900/40 text-red-500'
            : 'bg-white/70 dark:bg-gray-700/70 text-gray-400 hover:text-red-400'
        }`}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
      </button>

      {/* Card Content */}
      <div className="relative p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[14px] flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-purple-500 dark:text-purple-400" />
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeStyle}`}>
            {item.badge}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-snug">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Star Rating */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={13}
                className={star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : star - 0.5 <= rating ? 'text-yellow-400 fill-current opacity-60' : 'text-gray-300 dark:text-gray-600'}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            {rating} ({reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mb-5 flex items-baseline gap-2">
          <span
            className={`text-3xl font-black ${
              isFree
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {item.price}
          </span>
          {!isFree && (
            <span className="text-xs text-gray-400 dark:text-gray-500">one-time</span>
          )}
        </div>

        {/* Features List */}
        <ul className="space-y-2.5 mb-7">
          {item.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-purple-500 dark:text-purple-400 mr-2.5 flex-shrink-0 mt-0.5" />
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button Group */}
        <div className="flex gap-3">
          <Link
            to={`/checkout/${item.id}`}
            className="relative flex items-center justify-center flex-1 px-5 py-3.5 rounded-xl font-bold text-white transition-all duration-300 group/btn overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300 group-hover/btn:scale-105" />
            <span className="relative z-10 flex items-center gap-1.5 text-sm">
              {isFree ? 'Get Free' : 'Buy Now'}
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </span>
          </Link>

          {!isFree && (
            <button
              onClick={onAddToCart}
              className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-800/50 transition-all duration-200 hover:scale-110"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
