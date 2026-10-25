import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Plus, 
  Bell, 
  ScanLine, 
  X, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenScanner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenScanner }) => {
  const { 
    currentView, 
    navigate, 
    searchQuery, 
    setSearchQuery, 
    currentCampus, 
    setIsLocationModalOpen,
    savedListingIds,
    conversations
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Calculate unread chat messages
  const unreadChatCount = Object.values(conversations).reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const POPULAR_SEARCHES = [
    'HC Verma Physics',
    'Casio fx-991EX',
    'Engineering Mathematics B.S. Grewal',
    'CLRS Algorithms',
    'Mini Drafter',
    'Trueman Biology NEET',
    'Electric Kettle',
    'Made Easy GATE Notes'
  ];

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (text: string) => {
    setSearchQuery(text);
    setIsSearchFocused(false);
    navigate('browse');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    navigate('browse');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6">
        {/* Main Navbar Row */}
        <div className="flex items-center justify-between h-16 gap-3 md:gap-6">
          {/* Brand Logo & Campus */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5B4BFF] to-[#7B6EFF] flex items-center justify-center text-white shadow-md shadow-[#5B4BFF]/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-extrabold text-lg text-[#1B1B3A] tracking-tight block leading-tight">
                  Campus<span className="text-[#5B4BFF]">Bazaar</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium block">Campus Peer Market</span>
              </div>
            </button>

            {/* Campus Selector Pill */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF9FF] border border-slate-200/80 hover:border-[#5B4BFF]/40 text-xs font-medium text-slate-700 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#5B4BFF] shrink-0" />
              <span className="truncate max-w-[200px]">{currentCampus}</span>
              <span className="text-[11px] font-semibold text-[#5B4BFF] ml-1">Change</span>
            </button>
          </div>

          {/* Center Search Bar on Desktop */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search books, notes, calculators, lab coats..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-20 py-2.5 bg-slate-50 border border-slate-200/80 focus:border-[#5B4BFF] focus:bg-white rounded-full text-sm text-[#1B1B3A] placeholder:text-slate-400 focus:outline-hidden transition-all shadow-inner"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onOpenScanner}
                  title="Scan book barcode or ISBN"
                  className="p-1.5 rounded-full text-[#5B4BFF] hover:bg-[#EEECFF] transition-colors"
                >
                  <ScanLine className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#5B4BFF]" />
                  Trending Searches Near You
                </div>
                <div className="mt-1 flex flex-col">
                  {POPULAR_SEARCHES.map(item => (
                    <button
                      key={item}
                      onClick={() => handleSelectSuggestion(item)}
                      className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-[#FAF9FF] hover:text-[#5B4BFF] rounded-xl text-left transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Zone */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-600">
              <button
                onClick={() => navigate('browse')}
                className={`px-2 py-1 rounded-lg transition-colors ${currentView === 'browse' ? 'text-[#5B4BFF] font-bold' : 'hover:text-[#1B1B3A]'}`}
              >
                Browse All
              </button>
              <button
                onClick={() => navigate('saved')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${currentView === 'saved' ? 'text-[#5B4BFF] font-bold' : 'hover:text-[#1B1B3A]'}`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved ({savedListingIds.length})</span>
              </button>
            </nav>

            {/* + Sell Button */}
            <button
              onClick={() => navigate('sell')}
              className="flex items-center gap-1.5 px-3.5 md:px-4 py-2 rounded-full bg-[#FFC83D] hover:bg-[#F2BD35] text-[#1B1B3A] font-semibold text-xs md:text-sm shadow-sm hover:shadow transition-all active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Sell</span>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => navigate('chats')}
              className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Notifications & Chats"
            >
              <Bell className="w-5 h-5" />
              {unreadChatCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF6B6B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadChatCount}
                </span>
              )}
            </button>

            {/* Student Avatar (Tanvi) */}
            <button
              onClick={() => navigate('profile')}
              className="relative rounded-full ring-2 ring-[#5B4BFF]/20 hover:ring-[#5B4BFF] transition-all p-0.5 cursor-pointer"
              title="My Student Profile"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Student Profile"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </div>

        {/* Mobile Sub-Header: Location Bar + Search Input */}
        <div className="md:hidden pb-3 pt-1 flex flex-col gap-2">
          {/* Location button */}
          <div className="flex items-center justify-between text-xs text-slate-600 px-1">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1 text-slate-700 font-medium truncate"
            >
              <MapPin className="w-3.5 h-3.5 text-[#5B4BFF] shrink-0" />
              <span className="truncate max-w-[240px]">{currentCampus}</span>
            </button>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="text-[#5B4BFF] font-semibold text-[11px] shrink-0"
            >
              Change
            </button>
          </div>

          {/* Search bar on mobile */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search books, notes, calculators, lab coats..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-18 py-2 bg-slate-50 border border-slate-200/90 focus:border-[#5B4BFF] focus:bg-white rounded-xl text-xs text-[#1B1B3A] placeholder:text-slate-400 focus:outline-hidden"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onOpenScanner}
                className="p-1 text-[#5B4BFF]"
                title="Barcode Scanner"
              >
                <ScanLine className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};
