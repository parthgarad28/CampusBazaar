import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageSquare, Star, Sparkles, BookOpen } from 'lucide-react';
import { Listing } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  listing: Listing;
  layoutId?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ listing, layoutId }) => {
  const { isSaved, toggleSaveListing, navigate, openChatForListing } = useApp();
  const saved = isSaved(listing.id);
  const [isHeartPopping, setIsHeartPopping] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discountPercent = Math.round(
    ((listing.originalMrp - listing.price) / listing.originalMrp) * 100
  );

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHeartPopping(true);
    toggleSaveListing(listing.id);
    setTimeout(() => setIsHeartPopping(false), 500);
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openChatForListing(listing);
  };

  const getConditionStyle = (cond: string) => {
    switch (cond) {
      case 'Brand New':
      case 'Flawless':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Like New':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Topper Notes':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-purple-50 text-[#5B4BFF] border-purple-100';
    }
  };

  return (
    <motion.div
      layout
      layoutId={layoutId}
      whileHover={{ y: -6, rotate: -0.4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      onClick={() => navigate('detail', listing.id)}
      className="group relative bg-white rounded-2xl md:rounded-3xl border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer overflow-hidden"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {!imgError ? (
          <img
            src={listing.coverImage}
            alt={listing.title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 text-indigo-400 p-4">
            <BookOpen className="w-10 h-10 mb-2 stroke-1" />
            <span className="text-xs font-medium text-slate-500 text-center line-clamp-1">{listing.academicDetails.subject}</span>
          </div>
        )}

        {/* Discount badge */}
        {discountPercent > 0 && (
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/75 backdrop-blur-sm text-white text-[11px] font-bold tracking-tight">
            {discountPercent}% OFF
          </div>
        )}

        {/* Bouncy Heart Button */}
        <button
          onClick={handleHeartClick}
          aria-label={saved ? 'Remove from saved' : 'Save listing'}
          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        >
          <motion.div
            animate={isHeartPopping ? { scale: [1, 1.4, 0.9, 1.1, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                saved
                  ? 'fill-[#FF6B6B] text-[#FF6B6B]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            />
          </motion.div>

          {/* Burst Particles */}
          <AnimatePresence>
            {isHeartPopping && (
              <motion.div
                initial={{ opacity: 1, scale: 0.5 }}
                animate={{ opacity: 0, scale: 1.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-[#FF6B6B]" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {listing.isSold && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-500 text-white font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 md:p-4 flex flex-col flex-1">
        {/* Condition tags */}
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getConditionStyle(listing.condition)}`}>
            {listing.condition}
          </span>
          {listing.subCategory && (
            <span className="text-[11px] text-slate-500 font-medium truncate max-w-[120px]">
              {listing.subCategory}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-sm text-[#1B1B3A] line-clamp-2 leading-snug mb-2 group-hover:text-[#5B4BFF] transition-colors">
          {listing.title}
        </h3>

        {/* Price row */}
        <div className="mt-auto pt-1 flex items-baseline gap-2">
          <span className="text-base md:text-lg font-bold font-mono tabular-nums text-[#1B1B3A]">
            ₹{listing.price}
          </span>
          {listing.originalMrp > listing.price && (
            <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
              ₹{listing.originalMrp}
            </span>
          )}
        </div>

        {/* Seller Info Strip & Quick Chat */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 truncate pr-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online now" />
            <span className="font-medium text-slate-700 truncate">{listing.seller.name.split(' ')[0]}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 truncate text-[11px]">{listing.seller.college.split(',')[0]}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {listing.seller.rating && (
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {listing.seller.rating}
              </span>
            )}

            <button
              onClick={handleChatClick}
              aria-label={`Chat with ${listing.seller.name}`}
              className="p-1.5 rounded-lg text-[#5B4BFF] hover:bg-[#EEECFF] transition-colors"
              title="Chat with seller"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
