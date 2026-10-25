import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Heart, MessageSquare, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          let Icon = CheckCircle2;
          let iconColor = 'text-[#2ECC9A] bg-[#E8FAF3]';

          if (toast.type === 'heart') {
            Icon = Heart;
            iconColor = 'text-[#FF6B6B] bg-[#FFF0F0]';
          } else if (toast.type === 'chat') {
            Icon = MessageSquare;
            iconColor = 'text-[#5B4BFF] bg-[#EEECFF]';
          } else if (toast.type === 'info') {
            Icon = Info;
            iconColor = 'text-blue-500 bg-blue-50';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl rounded-2xl p-3.5 flex items-start gap-3 text-slate-800"
            >
              <div className={`p-2 rounded-xl shrink-0 ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 pr-2">
                <p className="text-sm font-semibold text-slate-900 leading-snug">{toast.message}</p>
                {toast.subtext && (
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{toast.subtext}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
