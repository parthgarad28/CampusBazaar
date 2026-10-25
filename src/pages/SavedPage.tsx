import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, ArrowLeft, Trash2, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const SavedPage: React.FC = () => {
  const { listings, savedListingIds, toggleSaveListing, navigate, openChatForListing } = useApp();

  const savedListings = listings.filter(item => savedListingIds.includes(item.id));

  return (
    <div className="min-h-screen bg-[#FAF9FF] pb-24 md:pb-16 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate('home')}
              className="p-1.5 rounded-xl hover:bg-white text-slate-600 transition-colors mr-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display font-extrabold text-xl sm:text-2xl text-[#1B1B3A]">
                Saved & Watchlist
              </h1>
              <p className="text-xs text-slate-500">
                {savedListings.length} {savedListings.length === 1 ? 'item' : 'items'} saved · We'll alert you if sellers drop the price
              </p>
            </div>
          </div>

          {savedListings.length > 0 && (
            <button
              onClick={() => navigate('browse')}
              className="text-xs font-semibold text-[#5B4BFF] hover:underline hidden sm:block"
            >
              Explore More Books
            </button>
          )}
        </div>

        {/* Content */}
        {savedListings.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {savedListings.map(listing => (
                <div key={listing.id} className="relative group">
                  <ProductCard listing={listing} layoutId={`saved-${listing.id}`} />
                  
                  {/* Remove shortcut */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveListing(listing.id);
                    }}
                    className="absolute top-2 left-2 p-1.5 rounded-full bg-white/90 shadow text-slate-400 hover:text-red-500 transition-colors z-20"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#5B4BFF] mx-auto flex items-center justify-center mb-4">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#1B1B3A]">
              Your Watchlist is empty
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
              Tap the heart icon on any textbook, notes set, or calculator to bookmark it for later or track campus price cuts.
            </p>
            <button
              onClick={() => navigate('browse')}
              className="px-6 py-3 rounded-full bg-[#5B4BFF] text-white text-xs font-bold shadow-md shadow-[#5B4BFF]/20 hover:bg-[#4938EC] transition-all flex items-center justify-center gap-1.5 mx-auto"
            >
              <span>Browse Campus Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
