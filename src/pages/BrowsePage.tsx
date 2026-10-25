import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, 
  X, 
  RotateCcw, 
  SlidersHorizontal, 
  ShieldCheck, 
  Grid3X3, 
  Rows3, 
  Search, 
  Check, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { 
  LevelType, 
  CategoryType, 
  StreamType, 
  BoardType, 
  ConditionType 
} from '../types';

export const BrowsePage: React.FC = () => {
  const { 
    filteredListings, 
    filters, 
    updateFilter, 
    resetFilters, 
    searchQuery, 
    setSearchQuery,
    currentCampus
  } = useApp();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [isLoading, setIsLoading] = useState(false);

  // Trigger brief skeleton loader on filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 280);
    return () => clearTimeout(timer);
  }, [filters, searchQuery]);

  const CATEGORIES: CategoryType[] = [
    'Textbooks',
    'Topper Notes',
    'Stationery',
    'Calculators',
    'Lab & Drafters',
    'Hostel Gear',
    'Novels & Others'
  ];

  const STREAMS: StreamType[] = [
    'All Streams',
    'Engineering',
    'Medical',
    'Commerce',
    'Arts & Humanities',
    'General Science'
  ];

  const BOARDS: BoardType[] = [
    'All Boards',
    'CBSE',
    'ICSE',
    'State Board'
  ];

  const CONDITIONS: ConditionType[] = [
    'Brand New',
    'Like New',
    'Good',
    'Fair',
    'Annotated',
    'Topper Notes'
  ];

  const toggleCondition = (cond: ConditionType) => {
    const exists = filters.conditions.includes(cond);
    if (exists) {
      updateFilter('conditions', filters.conditions.filter(c => c !== cond));
    } else {
      updateFilter('conditions', [...filters.conditions, cond]);
    }
  };

  const hasActiveFilters = 
    filters.level !== 'All' ||
    filters.category !== 'All' ||
    filters.stream !== 'All Streams' ||
    filters.board !== 'All Boards' ||
    filters.conditions.length > 0 ||
    filters.maxPrice < 2000 ||
    searchQuery.trim().length > 0;

  const FilterContent = (
    <div className="space-y-6">
      {/* Header with clear button */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#5B4BFF]" />
          <h3 className="font-display font-bold text-sm text-[#1B1B3A]">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-[#FF6B6B] hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Level */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-2">Study Level</label>
        <div className="flex flex-wrap gap-1.5">
          {(['All', 'College', 'School (9-12)', 'Competitive'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => updateFilter('level', lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filters.level === lvl
                  ? 'bg-[#5B4BFF] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-2">Category</label>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1 no-scrollbar">
          <button
            onClick={() => updateFilter('category', 'All')}
            className={`w-full py-1.5 px-2.5 rounded-xl text-xs text-left font-medium flex items-center justify-between ${
              filters.category === 'All'
                ? 'bg-indigo-50 text-[#5B4BFF] font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>All Categories</span>
            {filters.category === 'All' && <Check className="w-3.5 h-3.5" />}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => updateFilter('category', cat)}
              className={`w-full py-1.5 px-2.5 rounded-xl text-xs text-left font-medium flex items-center justify-between ${
                filters.category === cat
                  ? 'bg-indigo-50 text-[#5B4BFF] font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Stream / Branch */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-2">Stream / Branch</label>
        <select
          value={filters.stream}
          onChange={e => updateFilter('stream', e.target.value as StreamType)}
          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#5B4BFF]"
        >
          {STREAMS.map(str => (
            <option key={str} value={str}>{str}</option>
          ))}
        </select>
      </div>

      {/* Board */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-2">Board (for School)</label>
        <select
          value={filters.board}
          onChange={e => updateFilter('board', e.target.value as BoardType)}
          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-[#5B4BFF]"
        >
          {BOARDS.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700">Max Price (₹)</label>
          <span className="text-xs font-bold font-mono text-[#5B4BFF]">
            Up to ₹{filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min={50}
          max={2000}
          step={50}
          value={filters.maxPrice}
          onChange={e => updateFilter('maxPrice', Number(e.target.value))}
          className="w-full accent-[#5B4BFF] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>₹50</span>
          <span>₹1,000</span>
          <span>₹2,000+</span>
        </div>
      </div>

      {/* Condition Badges */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-2">Book Condition</label>
        <div className="grid grid-cols-2 gap-1.5">
          {CONDITIONS.map(cond => {
            const isChecked = filters.conditions.includes(cond);
            return (
              <button
                key={cond}
                onClick={() => toggleCondition(cond)}
                className={`p-2 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-colors ${
                  isChecked
                    ? 'border-[#5B4BFF] bg-[#EEECFF] text-[#5B4BFF] font-bold'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>{cond}</span>
                {isChecked && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9FF] pb-24 md:pb-16 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Safe Campus Handshake Notice Bar */}
        <div className="mb-4 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <p className="text-xs text-amber-900 font-medium">
              <strong>Safe Campus Handshake:</strong> Pick up at Library ground floor or Nescafe kiosk. Inspect pages before UPI transfer.
            </p>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
              Active:
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
                <span>"{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.level !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-medium text-[#5B4BFF]">
                <span>{filters.level}</span>
                <button onClick={() => updateFilter('level', 'All')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-medium text-[#5B4BFF]">
                <span>{filters.category}</span>
                <button onClick={() => updateFilter('category', 'All')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.stream !== 'All Streams' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-medium text-[#5B4BFF]">
                <span>{filters.stream}</span>
                <button onClick={() => updateFilter('stream', 'All Streams')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.conditions.map(c => (
              <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-medium text-[#5B4BFF]">
                <span>{c}</span>
                <button onClick={() => toggleCondition(c)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-[#FF6B6B] hover:underline whitespace-nowrap ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Results Header: Count, Mobile Filter Trigger, Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200/70">
          <div>
            <h1 className="font-display font-bold text-lg text-[#1B1B3A]">
              {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'} found
            </h1>
            <p className="text-xs text-slate-500">
              Verified campus peers in {currentCampus.split('•')[0]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs active:scale-95"
            >
              <Filter className="w-3.5 h-3.5 text-[#5B4BFF]" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={e => updateFilter('sortBy', e.target.value as any)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-[#5B4BFF] shadow-xs cursor-pointer"
            >
              <option value="nearest">Nearest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="discount">Biggest Discount %</option>
              <option value="popular">Most Popular / Views</option>
            </select>

            {/* Grid / List view toggle on desktop */}
            <div className="hidden sm:flex items-center border border-slate-200 bg-white rounded-xl p-0.5 shadow-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-slate-100 text-[#5B4BFF]' : 'text-slate-400'}`}
                title="Grid View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-lg ${viewMode === 'compact' ? 'bg-slate-100 text-[#5B4BFF]' : 'text-slate-400'}`}
                title="Compact View"
              >
                <Rows3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid & Desktop Sidebar Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-20 bg-white rounded-3xl border border-slate-100 shadow-xs p-5">
              {FilterContent}
            </div>
          </div>

          {/* Listings Results Area */}
          <div className="md:col-span-3">
            {isLoading ? (
              // Skeleton Loader
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="bg-white rounded-3xl p-4 border border-slate-100 animate-pulse space-y-3">
                    <div className="aspect-[4/3] bg-slate-200 rounded-2xl w-full" />
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                    <div className="h-5 bg-slate-200 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : filteredListings.length > 0 ? (
              <motion.div
                layout
                className={`grid gap-4 ${
                  viewMode === 'grid'
                    ? 'grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                <AnimatePresence>
                  {filteredListings.map(listing => (
                    <ProductCard
                      key={listing.id}
                      listing={listing}
                      layoutId={`browse-${listing.id}`}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              // Empty State
              <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-md mx-auto my-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#5B4BFF] mx-auto flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1B1B3A]">
                  No items matched your filters
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed">
                  Try adjusting the price range, changing study level, or clearing keyword searches.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-full bg-[#5B4BFF] text-white text-xs font-semibold shadow-md shadow-[#5B4BFF]/20 hover:bg-[#4938EC] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl p-5 overflow-y-auto z-10 flex flex-col"
            >
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />
              {FilterContent}
              <div className="sticky bottom-0 pt-4 mt-6 bg-white border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 rounded-full bg-[#5B4BFF] text-white font-bold text-xs shadow-md shadow-[#5B4BFF]/20"
                >
                  Show {filteredListings.length} Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
