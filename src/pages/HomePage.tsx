import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  BookOpen, 
  FileText, 
  PenTool, 
  Calculator, 
  Compass, 
  Home as HomeIcon, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  ShieldCheck, 
  Camera, 
  MessageSquare, 
  Handshake, 
  Star, 
  ChevronRight,
  Filter,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { LevelType, CategoryType } from '../types';

export const HomePage: React.FC = () => {
  const { 
    listings, 
    activeLevel, 
    setActiveLevel, 
    navigate, 
    updateFilter,
    setIsSafetyModalOpen,
    setIsLocationModalOpen,
    currentCampus
  } = useApp();

  const [selectedQuickStream, setSelectedQuickStream] = useState<string>('All');

  // Category definitions with icons and pastel tints
  const CATEGORIES: {
    id: CategoryType;
    label: string;
    sublabel: string;
    icon: any;
    colorBg: string;
    colorIcon: string;
  }[] = [
    {
      id: 'Textbooks',
      label: 'Textbooks',
      sublabel: 'Engg, Med, Eco',
      icon: BookOpen,
      colorBg: 'bg-[#EEECFF]',
      colorIcon: 'text-[#5B4BFF]'
    },
    {
      id: 'Topper Notes',
      label: 'Topper Notes',
      sublabel: 'Handwritten & Xerox',
      icon: FileText,
      colorBg: 'bg-[#FFF9E6]',
      colorIcon: 'text-[#E5A800]'
    },
    {
      id: 'Stationery',
      label: 'Stationery',
      sublabel: 'Pens, Files & Art',
      icon: PenTool,
      colorBg: 'bg-[#FFF0F0]',
      colorIcon: 'text-[#FF6B6B]'
    },
    {
      id: 'Calculators',
      label: 'Calculators',
      sublabel: 'Casio fx & Tech',
      icon: Calculator,
      colorBg: 'bg-[#EBF7FF]',
      colorIcon: 'text-[#1E88E5]'
    },
    {
      id: 'Lab & Drafters',
      label: 'Lab & Drafters',
      sublabel: 'Coats & Instruments',
      icon: Compass,
      colorBg: 'bg-[#F3E8FF]',
      colorIcon: 'text-[#9333EA]'
    },
    {
      id: 'Hostel Gear',
      label: 'Hostel Gear',
      sublabel: 'Kettles, Lamps & Beds',
      icon: HomeIcon,
      colorBg: 'bg-[#E6F9F3]',
      colorIcon: 'text-[#2ECC9A]'
    }
  ];

  // Filter listings by active level
  const levelFilteredListings = listings.filter(item => {
    if (activeLevel === 'College') return item.level === 'College';
    if (activeLevel === 'School (9-12)') return item.level === 'School (9-12)';
    if (activeLevel === 'Competitive') return item.level === 'Competitive';
    return true;
  });

  // Fresh near you (first 6 items)
  const freshNearYou = levelFilteredListings.slice(0, 6);

  // Trending items
  const trendingItems = listings.filter(l => l.isTrending).slice(0, 5);

  const handleCategoryClick = (cat: CategoryType) => {
    updateFilter('category', cat);
    navigate('browse');
  };

  const handleLevelTabChange = (level: LevelType) => {
    setActiveLevel(level);
    updateFilter('level', level);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] pb-24 md:pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-8 md:pt-8 md:pb-14">
        {/* Decorative Floating Shapes */}
        <div className="absolute top-6 left-[8%] w-16 h-16 rounded-3xl bg-[#5B4BFF]/10 blur-xl pointer-events-none animate-float" />
        <div className="absolute top-20 right-[10%] w-24 h-24 rounded-full bg-[#FFC83D]/20 blur-xl pointer-events-none animate-float-delayed" />
        <div className="absolute bottom-4 left-[20%] w-12 h-12 rounded-2xl bg-[#FF6B6B]/15 blur-lg pointer-events-none animate-float" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative rounded-3xl bg-gradient-to-br from-[#4B3BFF] via-[#5B4BFF] to-[#7667FF] text-white p-6 sm:p-10 shadow-xl overflow-hidden"
          >
            {/* Background geometric accents */}
            <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-[#FFC83D]/20 blur-xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Headlines & CTA */}
              <div className="md:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold mb-4">
                  <GraduationCap className="w-3.5 h-3.5 text-[#FFC83D]" />
                  <span>100% Peer-to-Peer Campus Commerce</span>
                </div>

                <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15] text-balance">
                  Pass it on. <br />
                  <span className="text-[#FFC83D]">Save more.</span>
                </h1>

                <p className="mt-3 text-sm sm:text-base text-indigo-100 max-w-lg leading-relaxed">
                  Buy & sell verified pre-loved study gear directly on campus with batchmates. Zero courier charges, zero shipping delays.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigate('browse')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#1B1B3A] font-bold text-sm shadow-md transition-all active:scale-95 group"
                  >
                    <span>Buy Books</span>
                    <ArrowRight className="w-4 h-4 text-[#5B4BFF] group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => navigate('sell')}
                    className="px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-sm border border-white/30 transition-all active:scale-95"
                  >
                    Sell Mine
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Visual Showcase */}
              <div className="md:col-span-5 hidden md:flex justify-end">
                <div className="relative group">
                  <div className="w-72 sm:w-80 rounded-2xl bg-white/10 backdrop-blur-md p-3 border border-white/25 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
                      alt="College textbooks and study materials"
                      className="w-full h-44 object-cover rounded-xl"
                    />
                    <div className="mt-2.5 p-1.5 flex items-center justify-between text-xs text-white">
                      <div>
                        <p className="font-bold">Engineering Maths & Physics</p>
                        <p className="text-[11px] text-indigo-200">IIT Delhi & DU Chapters</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-[#2ECC9A] text-slate-900 font-bold text-[11px]">
                        ₹0 Delivery
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Shop by Level Tabs with Animated Sliding Indicator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="p-1.5 bg-slate-200/60 rounded-2xl max-w-md mx-auto flex items-center relative">
          {(['College', 'School (9-12)', 'Competitive'] as LevelType[]).map(lvl => {
            const isActive = activeLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => handleLevelTabChange(lvl)}
                className={`relative flex-1 py-2 text-xs md:text-sm font-semibold rounded-xl transition-colors z-10 ${
                  isActive ? 'text-[#1B1B3A]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="levelTabIndicator"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{lvl}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Explore Campus Hub Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#5B4BFF]" />
            <h2 className="font-display font-bold text-lg text-[#1B1B3A]">
              Explore Campus Hub
            </h2>
          </div>
          <button
            onClick={() => navigate('browse')}
            className="text-xs font-semibold text-[#5B4BFF] hover:underline flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Category Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(cat.id)}
                className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-xl ${cat.colorBg} ${cat.colorIcon} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#1B1B3A] line-clamp-1 group-hover:text-[#5B4BFF] transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {cat.sublabel}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bestseller Novels Banner */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => handleCategoryClick('Novels & Others')}
          className="mt-3 p-3 sm:p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC83D] text-[#1B1B3A] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display font-bold text-xs sm:text-sm text-amber-950">
                Novels, Self-Help & Manga
              </p>
              <p className="text-[11px] text-amber-800">
                Murakami, Atomic Habits, One Piece & more hostel favorites
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </section>

      {/* 4. Fresh Near You Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#FF6B6B]" />
            <h2 className="font-display font-bold text-lg text-[#1B1B3A]">
              Fresh Near You
            </h2>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              · verified in campus radius
            </span>
          </div>

          <button
            onClick={() => navigate('browse')}
            className="text-xs font-semibold text-[#5B4BFF] hover:underline"
          >
            See All ({levelFilteredListings.length})
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {freshNearYou.map(listing => (
            <ProductCard key={listing.id} listing={listing} layoutId={`card-${listing.id}`} />
          ))}
        </div>
      </section>

      {/* 5. Trending Exam PYQs / Books Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="p-5 sm:p-7 rounded-3xl bg-indigo-50/60 border border-indigo-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#5B4BFF]" />
              <h2 className="font-display font-bold text-lg text-[#1B1B3A]">
                Trending Exam PYQs
              </h2>
              <span className="text-xs font-bold text-coral-600 bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                Semester Rush 🔥
              </span>
            </div>

            <button
              onClick={() => {
                updateFilter('level', 'Competitive');
                navigate('browse');
              }}
              className="text-xs font-semibold text-[#5B4BFF] hover:underline"
            >
              View PYQs
            </button>
          </div>

          {/* Horizontal scroll cards */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {trendingItems.map(item => (
              <div key={item.id} className="min-w-[240px] sm:min-w-[270px]">
                <ProductCard listing={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Safe Campus Commerce in 3 Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Safe Campus Commerce</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-[#1B1B3A]">
            How CampusBazaar Works in 3 Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Zero couriers, zero packaging waste. Meet your campus peers right at the library lawn or Nescafe kiosk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EEECFF] text-[#5B4BFF] flex items-center justify-center mb-3">
              <Camera className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-base text-[#1B1B3A] mb-1">
              1. Snap & List
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Takes under 60 seconds. Auto-detect textbook title & MRP with our instant ISBN barcode scanner.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF9E6] text-[#E5A800] flex items-center justify-center mb-3">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-base text-[#1B1B3A] mb-1">
              2. Peer Chat
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No phone numbers shared. Negotiate friendly student rates and agree on a campus meetup time.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0F0] text-[#FF6B6B] flex items-center justify-center mb-3">
              <Handshake className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-base text-[#1B1B3A] mb-1">
              3. Campus Handshake
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Inspect textbook pages at Central Library or Canteen, then complete instant ₹0 fee UPI transfer.
            </p>
          </div>
        </div>

        {/* Verification Strip */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-950">
                100% Student Verified Platform
              </p>
              <p className="text-[11px] text-amber-800">
                Meet inside verified campus gates · Zero courier delays
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-xl shadow-xs text-xs font-bold text-slate-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 / 5 Campus Trust Rating</span>
          </div>
        </div>
      </section>

      {/* 7. Hostel Room Declutter Sell Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="rounded-3xl bg-gradient-to-r from-purple-100 via-indigo-50 to-blue-50 border border-purple-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-lg">
            <span className="text-[11px] font-bold text-[#5B4BFF] uppercase tracking-wider block mb-1">
              Hostel Room Declutter
            </span>
            <h3 className="font-display font-bold text-2xl text-[#1B1B3A]">
              Got old books? Turn them into cash.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Juniors in your department are actively searching for previous semester notes and drafters right now.
            </p>
          </div>

          <button
            onClick={() => navigate('sell')}
            className="px-6 py-3 rounded-full bg-[#5B4BFF] hover:bg-[#4938EC] text-white font-bold text-sm shadow-md shadow-[#5B4BFF]/20 transition-all active:scale-95 shrink-0"
          >
            Post an Ad Free
          </button>
        </div>
      </section>

      {/* 8. Campus Chapter Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-slate-200 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-4">
          <GraduationCap className="w-4 h-4 text-[#5B4BFF]" />
          <span>CampusBazaar Campus Chapter • {currentCampus.split('•')[0]}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600 mb-4">
          <button onClick={() => setIsSafetyModalOpen(true)} className="hover:text-[#5B4BFF]">
            Campus Guidelines
          </button>
          <span>·</span>
          <button onClick={() => setIsSafetyModalOpen(true)} className="hover:text-[#5B4BFF]">
            Safety Tips
          </button>
          <span>·</span>
          <button onClick={() => setIsLocationModalOpen(true)} className="hover:text-[#5B4BFF]">
            Change Campus Hub
          </button>
        </div>

        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Built with academic solidarity by students, for students. Happy studying & smart thrifting! 📚
        </p>
      </footer>
    </div>
  );
};
