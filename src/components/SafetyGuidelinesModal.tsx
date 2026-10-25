import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, MapPin, Eye, QrCode, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SafetyGuidelinesModal: React.FC = () => {
  const { isSafetyModalOpen, setIsSafetyModalOpen } = useApp();

  if (!isSafetyModalOpen) return null;

  const RULES = [
    {
      icon: MapPin,
      title: '1. Handshake in High-Footfall Campus Spots',
      desc: 'Always meet during daylight inside campus gates: Central Library Ground Floor, Nescafe Kiosk, or Student Activity Center.'
    },
    {
      icon: Eye,
      title: '2. Inspect Every Page Before UPI Transfer',
      desc: 'Flip through all chapters, check binding integrity, and verify question paper solutions or supplement CDs in person.'
    },
    {
      icon: QrCode,
      title: '3. Zero Advance Payments (₹0 Courier Fee)',
      desc: 'Never transfer money in advance. Payment happens face-to-face via UPI QR scan or cash only after inspecting the item.'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSafetyModalOpen(false)}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 text-left z-10"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#1B1B3A]">
                  CampusBazaar Campus Safety Protocol
                </h3>
                <p className="text-xs text-slate-500">
                  Built by students, for students across Indian campuses
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSafetyModalOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="my-5 space-y-4">
            {RULES.map((rule, idx) => {
              const Icon = rule.icon;
              return (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-white text-[#5B4BFF] shadow-xs shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">{rule.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-950">
              Student ID Verification Badge Required for Sellers
            </span>
            <CheckCircle2 className="w-5 h-5 text-[#5B4BFF] shrink-0" />
          </div>

          <button
            onClick={() => setIsSafetyModalOpen(false)}
            className="w-full mt-5 py-2.5 rounded-full bg-[#5B4BFF] hover:bg-[#4938EC] text-white font-semibold text-xs transition-all shadow-md shadow-[#5B4BFF]/20"
          >
            I Understand the Safety Rules
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
