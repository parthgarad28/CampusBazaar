import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ScanLine, BookOpen, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBook?: (bookData: {
    title: string;
    category: string;
    mrp: number;
    author: string;
    publisher: string;
    stream: string;
  }) => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onApplyBook
}) => {
  const { navigate, addToast } = useApp();
  const [scanning, setScanning] = useState(false);
  const [detectedBook, setDetectedBook] = useState<any | null>(null);

  if (!isOpen) return null;

  const SAMPLE_PRESETS = [
    {
      isbn: '978-81-7709-187-8',
      title: 'Concepts of Physics by H.C. Verma Vol 1',
      author: 'Dr. H.C. Verma',
      publisher: 'Bharati Bhawan',
      mrp: 450,
      category: 'Textbooks',
      stream: 'Engineering'
    },
    {
      isbn: '978-81-7409-195-5',
      title: 'Higher Engineering Mathematics (44th Ed)',
      author: 'Dr. B.S. Grewal',
      publisher: 'Khanna Publishers',
      mrp: 890,
      category: 'Textbooks',
      stream: 'Engineering'
    },
    {
      isbn: '978-02-6203-384-8',
      title: 'Introduction to Algorithms (CLRS)',
      author: 'Cormen, Leiserson, Rivest, Stein',
      publisher: 'PHI Learning / MIT Press',
      mrp: 1200,
      category: 'Textbooks',
      stream: 'Engineering'
    },
    {
      isbn: '978-81-9456-781-2',
      title: 'Truemans Elementary Biology for NEET',
      author: 'K.N. Bhatia & M.P. Tyagi',
      publisher: 'Trueman Book Company',
      mrp: 820,
      category: 'Textbooks',
      stream: 'Medical'
    }
  ];

  const handleSimulateScan = (item: typeof SAMPLE_PRESETS[0]) => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setDetectedBook(item);
    }, 1200);
  };

  const handleUseScannedBook = () => {
    if (!detectedBook) return;
    if (onApplyBook) {
      onApplyBook({
        title: detectedBook.title,
        category: detectedBook.category,
        mrp: detectedBook.mrp,
        author: detectedBook.author,
        publisher: detectedBook.publisher,
        stream: detectedBook.stream
      });
    } else {
      // Navigate to sell with prefilled query
      navigate('sell');
    }
    addToast('Book Details Auto-Filled via ISBN!', 'success', detectedBook.title);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 text-center z-10 overflow-hidden"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ScanLine className="w-5 h-5 text-[#5B4BFF]" />
              <h3 className="font-display font-bold text-base text-[#1B1B3A]">
                Instant ISBN & Barcode Scanner
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scanner Viewfinder */}
          <div className="relative my-4 aspect-video bg-slate-900 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white">
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-20 border-2 border-[#FFC83D] rounded-xl flex items-center justify-center shadow-lg">
              {/* Laser animation */}
              <motion.div
                animate={{ y: [-30, 30, -30] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-full h-0.5 bg-[#FF6B6B] shadow-[0_0_12px_#FF6B6B]"
              />
            </div>

            <p className="z-10 text-xs font-medium text-slate-300 px-4 mt-24">
              {scanning ? 'Decoding ISBN barcode...' : 'Point camera at back cover ISBN barcode'}
            </p>
          </div>

          {/* Detected card or preset triggers */}
          {detectedBook ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-left mb-4"
            >
              <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>ISBN Verified: {detectedBook.isbn}</span>
              </div>
              <p className="text-xs font-bold text-slate-900">{detectedBook.title}</p>
              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600">
                <span>By {detectedBook.author}</span>
                <span className="font-mono font-bold text-slate-800">MRP ₹{detectedBook.mrp}</span>
              </div>
            </motion.div>
          ) : (
            <div className="text-left mb-4">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                Tap to simulate scanning a real textbook barcode:
              </span>
              <div className="space-y-1.5">
                {SAMPLE_PRESETS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSimulateScan(item)}
                    disabled={scanning}
                    className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-[#5B4BFF] hover:bg-[#FAF9FF] text-left transition-colors flex items-center justify-between group"
                  >
                    <div className="truncate pr-2">
                      <p className="text-xs font-bold text-[#1B1B3A] group-hover:text-[#5B4BFF] truncate">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">ISBN: {item.isbn}</p>
                    </div>
                    <span className="text-xs font-bold font-mono text-slate-700 shrink-0">
                      ₹{item.mrp}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleUseScannedBook}
              disabled={!detectedBook}
              className="px-5 py-2.5 rounded-full bg-[#5B4BFF] disabled:opacity-40 hover:bg-[#4938EC] text-white font-semibold text-xs shadow-md shadow-[#5B4BFF]/20 transition-all flex items-center gap-1.5"
            >
              <span>Auto-Fill in Sell Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
