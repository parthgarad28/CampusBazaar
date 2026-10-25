import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X, Check, Navigation, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LocationSelectorModal: React.FC = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, currentCampus, setCurrentCampus, addToast } = useApp();

  const [selectedHub, setSelectedHub] = useState('IIT Delhi & North Campus DU');
  const [radiusKm, setRadiusKm] = useState('2.5');

  const CAMPUSES = [
    { id: 'iitd-nc', name: 'IIT Delhi / North Campus DU', detail: 'Hauz Khas + Hansraj, Hindu, Stephen’s, SRCC' },
    { id: 'iitd', name: 'IIT Delhi Campus', detail: 'Hauz Khas hostels & Bharti Building' },
    { id: 'du-nc', name: 'North Campus, Delhi University', detail: 'Arts Faculty, Vishwavidyalaya Metro' },
    { id: 'du-sc', name: 'South Campus, DU', detail: 'Venky, Motilal, ARSD & Satya Niketan' },
    { id: 'dtu', name: 'DTU (Delhi Technological University)', detail: 'Bawana Road, Shahbad Daulatpur' },
    { id: 'nsut', name: 'NSUT Dwarka', detail: 'Sector 3 Dwarka Campus' },
    { id: 'aiims', name: 'AIIMS & VMMC Delhi', detail: 'Ansari Nagar & Safdarjung Hospital' },
    { id: 'iitr', name: 'IIT Roorkee', detail: 'Main Campus & Century Gate' },
    { id: 'bits', name: 'BITS Pilani', detail: 'Pilani Campus & Student Activity Center' }
  ];

  if (!isLocationModalOpen) return null;

  const handleSave = () => {
    setCurrentCampus(`${selectedHub} • within ${radiusKm} km`);
    setIsLocationModalOpen(false);
    addToast('Campus Hub Updated', 'success', `Showing listings within ${radiusKm} km of ${selectedHub.split('/')[0]}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsLocationModalOpen(false)}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#EEECFF] text-[#5B4BFF] flex items-center justify-center">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-[#1B1B3A]">
                  Select Campus & Radius
                </h3>
                <p className="text-xs text-slate-500">
                  Find peers for ₹0-cost in-person handoffs
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Radius selector */}
          <div className="my-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700">Campus Walk Distance</span>
              <span className="text-xs font-bold font-mono text-[#5B4BFF]">{radiusKm} km radius</span>
            </div>
            <div className="flex gap-2">
              {['1.0', '2.5', '5.0', '10.0'].map(dist => (
                <button
                  key={dist}
                  onClick={() => setRadiusKm(dist)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    radiusKm === dist
                      ? 'bg-[#5B4BFF] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {dist} km
                </button>
              ))}
            </div>
          </div>

          {/* Campus choices */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
            {CAMPUSES.map(camp => {
              const isSelected = selectedHub === camp.name;
              return (
                <button
                  key={camp.id}
                  onClick={() => setSelectedHub(camp.name)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-start justify-between transition-all ${
                    isSelected
                      ? 'border-[#5B4BFF] bg-[#FAF9FF] ring-1 ring-[#5B4BFF]'
                      : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <Building2 className={`w-4 h-4 mt-0.5 ${isSelected ? 'text-[#5B4BFF]' : 'text-slate-400'}`} />
                    <div>
                      <p className={`text-xs font-bold leading-tight ${isSelected ? 'text-[#5B4BFF]' : 'text-[#1B1B3A]'}`}>
                        {camp.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {camp.detail}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#5B4BFF] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-full bg-[#5B4BFF] hover:bg-[#4938EC] text-white font-semibold text-xs shadow-md shadow-[#5B4BFF]/20 transition-all"
            >
              Set My Campus
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
