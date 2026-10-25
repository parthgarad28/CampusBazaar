import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, CheckCircle2, ShieldCheck, Copy, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const UpiQrModal: React.FC = () => {
  const { isUpiModalOpen, setIsUpiModalOpen, activeChat, addToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isUpiModalOpen) return null;

  const upiId = 'campusbazaar.pay@oksbi';
  const amount = activeChat?.listingPrice || 340;

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    setCopied(true);
    addToast('UPI ID Copied to Clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmPaid = () => {
    setIsCompleted(true);
    addToast('Campus Handshake Payment Confirmed!', 'success', 'Item marked ready for in-person handoff.');
    setTimeout(() => {
      setIsCompleted(false);
      setIsUpiModalOpen(false);
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsUpiModalOpen(false)}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-sm w-full p-6 text-center z-10"
        >
          <button
            onClick={() => setIsUpiModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#EEECFF] text-[#5B4BFF] flex items-center justify-center mb-3">
            <QrCode className="w-6 h-6" />
          </div>

          <h3 className="font-display font-bold text-lg text-[#1B1B3A]">
            Campus Handshake QR
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            0% platform commission. Direct peer-to-peer UPI transfer at library/canteen.
          </p>

          {/* Amount Badge */}
          <div className="my-4 py-2.5 px-4 bg-slate-50 rounded-2xl border border-slate-100 inline-flex flex-col items-center">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Handoff Amount</span>
            <span className="text-2xl font-black font-mono text-[#1B1B3A]">₹{amount}</span>
          </div>

          {/* Simulated QR Box */}
          <div className="relative mx-auto w-48 h-48 bg-white border-2 border-dashed border-[#5B4BFF]/40 rounded-2xl p-2.5 flex items-center justify-center shadow-inner group">
            {/* SVG mock stylized QR pattern */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
              {/* Corner position markers */}
              <rect x="5" y="5" width="28" height="28" fill="#1B1B3A" rx="4" />
              <rect x="9" y="9" width="20" height="20" fill="white" rx="2" />
              <rect x="13" y="13" width="12" height="12" fill="#5B4BFF" rx="2" />

              <rect x="67" y="5" width="28" height="28" fill="#1B1B3A" rx="4" />
              <rect x="71" y="9" width="20" height="20" fill="white" rx="2" />
              <rect x="75" y="13" width="12" height="12" fill="#5B4BFF" rx="2" />

              <rect x="5" y="67" width="28" height="28" fill="#1B1B3A" rx="4" />
              <rect x="9" y="71" width="20" height="20" fill="white" rx="2" />
              <rect x="13" y="75" width="12" height="12" fill="#5B4BFF" rx="2" />

              {/* Data matrix dots */}
              <rect x="40" y="8" width="6" height="6" fill="#1B1B3A" />
              <rect x="50" y="15" width="8" height="6" fill="#1B1B3A" />
              <rect x="40" y="24" width="7" height="7" fill="#1B1B3A" />
              <rect x="10" y="42" width="8" height="6" fill="#1B1B3A" />
              <rect x="22" y="45" width="6" height="8" fill="#1B1B3A" />
              <rect x="36" y="38" width="8" height="8" fill="#5B4BFF" />
              <rect x="48" y="46" width="8" height="8" fill="#1B1B3A" />
              <rect x="60" y="38" width="6" height="8" fill="#1B1B3A" />
              <rect x="72" y="44" width="8" height="6" fill="#1B1B3A" />
              <rect x="85" y="42" width="7" height="7" fill="#1B1B3A" />
              <rect x="40" y="60" width="8" height="6" fill="#1B1B3A" />
              <rect x="52" y="62" width="6" height="8" fill="#1B1B3A" />
              <rect x="65" y="60" width="8" height="7" fill="#5B4BFF" />
              <rect x="78" y="68" width="8" height="8" fill="#1B1B3A" />
              <rect x="42" y="78" width="7" height="7" fill="#1B1B3A" />
              <rect x="54" y="82" width="8" height="6" fill="#1B1B3A" />
              <rect x="66" y="78" width="6" height="8" fill="#1B1B3A" />
              <rect x="80" y="82" width="8" height="8" fill="#1B1B3A" />
            </svg>

            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center p-3"
              >
                <CheckCircle2 className="w-12 h-12 text-[#2ECC9A] mb-1" />
                <span className="font-bold text-sm text-slate-900">Payment Verified!</span>
              </motion.div>
            )}
          </div>

          {/* UPI ID copy strip */}
          <div className="mt-3 flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <span className="font-mono text-slate-700 truncate">{upiId}</span>
            <button
              onClick={handleCopyUpi}
              className="flex items-center gap-1 font-semibold text-[#5B4BFF] hover:underline shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <p className="mt-3 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200/60 text-left">
            💡 <strong>Peer Rule:</strong> Always flip through the textbook in person and verify pages before completing UPI payment.
          </p>

          <button
            onClick={handleConfirmPaid}
            className="w-full mt-4 py-2.5 rounded-full bg-[#5B4BFF] hover:bg-[#4938EC] text-white font-semibold text-xs shadow-md shadow-[#5B4BFF]/20 transition-all flex items-center justify-center gap-1.5"
          >
            <span>I've Transferred via UPI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
