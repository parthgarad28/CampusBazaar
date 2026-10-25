import React from 'react';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { currentView, navigate, conversations } = useApp();

  const unreadCount = Object.values(conversations).reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'browse', label: 'Browse', icon: Compass },
    { id: 'sell', label: 'Sell', icon: Plus, isAction: true },
    { id: 'chats', label: 'Chats', icon: MessageSquare, badge: unreadCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                onClick={() => navigate('sell')}
                className="relative -top-4 flex flex-col items-center justify-center cursor-pointer group"
                aria-label="Sell a book"
              >
                <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#5B4BFF] to-[#7B6EFF] text-white flex items-center justify-center shadow-lg shadow-[#5B4BFF]/35 group-active:scale-95 transition-transform">
                  <Plus className="w-7 h-7 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 mt-0.5">Sell</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id as any)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors ${
                isActive ? 'text-[#5B4BFF]' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.3]' : 'stroke-2'}`} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-[#FF6B6B] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold text-[#5B4BFF]' : 'text-slate-500'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-[#5B4BFF]"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
