import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ScanLine, 
  Camera, 
  Upload, 
  X, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  MapPin, 
  BookOpen, 
  HelpCircle,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType, ConditionType, StreamType } from '../types';

interface SellPageProps {
  onOpenScanner?: () => void;
}

export const SellPage: React.FC<SellPageProps> = ({ onOpenScanner }) => {
  const { addNewListing, navigate, addToast, currentCampus } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(2); // Default to Step 2 as shown in reference or Step 1
  
  // Step 1: Photos
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=700&q=80'
  ]);

  // Step 2: Details & Condition
  const [title, setTitle] = useState('Higher Engineering Mathematics - B.S. Grewal');
  const [category, setCategory] = useState<CategoryType>('Textbooks');
  const [stream, setStream] = useState<StreamType>('Engineering');
  const [targetSemester, setTargetSemester] = useState('Semester 3 - 4');
  const [condition, setCondition] = useState<ConditionType>('Like New');
  const [conditionNote, setConditionNote] = useState('Unmarked pages, no pencil marks, original Khanna Publishers copy.');
  const [hasNotes, setHasNotes] = useState(true);

  // Step 3: Pricing & Pickup
  const [sellingPrice, setSellingPrice] = useState<number | ''>(350);
  const [originalMrp, setOriginalMrp] = useState<number | ''>(850);
  const [openToNegotiation, setOpenToNegotiation] = useState(true);
  const [pickupSpot, setPickupSpot] = useState('Central Library Ground Floor');
  const [sellerQuote, setSellerQuote] = useState('Passed M1 and M2 with this book! Clean condition, passing on to juniors.');

  const PICKUP_PRESETS = [
    'Central Library Lawn',
    'Hostel 4 Common Room',
    'Nescafe Kiosk',
    'North Campus Metro Gate 3',
    'Student Activity Centre (SAC)'
  ];

  const discountPercent = 
    sellingPrice && originalMrp && Number(originalMrp) > Number(sellingPrice)
      ? Math.round(((Number(originalMrp) - Number(sellingPrice)) / Number(originalMrp)) * 100)
      : 0;

  const handleAddSamplePhoto = () => {
    if (photos.length >= 5) {
      addToast('Maximum 5 photos allowed', 'info');
      return;
    }
    const sampleOptions = [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=700&q=80'
    ];
    const nextImg = sampleOptions[photos.length % sampleOptions.length];
    setPhotos([...photos, nextImg]);
    addToast('Photo Added to Listing!', 'success');
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      addToast('Please enter a listing title', 'info');
      setCurrentStep(2);
      return;
    }
    if (!sellingPrice || Number(sellingPrice) <= 0) {
      addToast('Please specify your selling price', 'info');
      setCurrentStep(3);
      return;
    }

    const newListing = addNewListing({
      title: title.trim(),
      category,
      level: 'College',
      stream,
      classOrYear: targetSemester,
      price: Number(sellingPrice),
      originalMrp: Number(originalMrp) || Number(sellingPrice) * 2,
      condition,
      conditionNote: conditionNote.trim() || 'Well maintained student copy.',
      hasNotes,
      openToNegotiation,
      coverImage: photos[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
      images: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80'],
      campusLocation: `${pickupSpot} (${currentCampus.split('•')[0].trim()})`,
      sellerQuote: sellerQuote.trim()
    });

    navigate('detail', newListing.id);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] pb-24 md:pb-16 pt-4">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#5B4BFF]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel</span>
          </button>
          <h1 className="font-display font-extrabold text-lg text-[#1B1B3A]">
            Create Listing
          </h1>
          <span className="text-xs font-semibold text-slate-400">
            Step {currentStep} of 3
          </span>
        </div>

        {/* 3-Step Animated Progress Bar */}
        <div className="my-5">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className={currentStep >= 1 ? 'text-[#5B4BFF]' : 'text-slate-400'}>1. Photos</span>
            <span className={currentStep >= 2 ? 'text-[#5B4BFF]' : 'text-slate-400'}>2. Details</span>
            <span className={currentStep >= 3 ? 'text-[#5B4BFF]' : 'text-slate-400'}>3. Pricing</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className={`h-1.5 rounded-full transition-all ${currentStep >= 1 ? 'bg-[#5B4BFF]' : 'bg-slate-200'}`} />
            <div className={`h-1.5 rounded-full transition-all ${currentStep >= 2 ? 'bg-[#5B4BFF]' : 'bg-slate-200'}`} />
            <div className={`h-1.5 rounded-full transition-all ${currentStep >= 3 ? 'bg-[#5B4BFF]' : 'bg-slate-200'}`} />
          </div>
        </div>

        {/* ISBN / Barcode Shortcut Banner */}
        <div
          onClick={onOpenScanner}
          className="mb-6 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 flex items-center justify-between cursor-pointer hover:bg-amber-100/70 transition-colors group shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC83D] text-[#1B1B3A] flex items-center justify-center">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-950">
                Got an ISBN or Barcode?
              </p>
              <p className="text-[11px] text-amber-800">
                Tap to auto-fill title, author, edition & MRP instantly
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-900 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>

        {/* Form Container */}
        <form onSubmit={handlePublish} className="space-y-6">
          {/* STEP 1: Photos */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-sm text-[#1B1B3A]">
                  Book Photos
                </h3>
                <p className="text-xs text-slate-500">
                  Cover, index & marked pages sell 3x faster to batchmates!
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {photos.length} of 5 added
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
              {photos.map((img, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 shrink-0 group">
                  <img src={img} alt="Book preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 text-white px-1.5 py-0.2 rounded font-medium">
                    {idx === 0 ? 'Cover' : `Page ${idx}`}
                  </span>
                </div>
              ))}

              {photos.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddSamplePhoto}
                  className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#5B4BFF]/40 bg-[#EEECFF]/40 hover:bg-[#EEECFF] text-[#5B4BFF] flex flex-col items-center justify-center shrink-0 transition-colors group cursor-pointer"
                >
                  <Plus className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">+ Add Photo</span>
                </button>
              )}
            </div>
          </div>

          {/* STEP 2: Academic Details & Condition */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Listing Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Higher Engineering Mathematics - B.S. Grewal"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:outline-hidden focus:border-[#5B4BFF] focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as CategoryType)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                >
                  <option value="Textbooks">Textbooks</option>
                  <option value="Topper Notes">Topper Notes</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Calculators">Calculators</option>
                  <option value="Lab & Drafters">Lab & Drafters</option>
                  <option value="Hostel Gear">Hostel Gear</option>
                  <option value="Novels & Others">Novels & Others</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Stream / Branch</label>
                <select
                  value={stream}
                  onChange={e => setStream(e.target.value as StreamType)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                >
                  <option value="Engineering">Engineering (B.Tech / BE)</option>
                  <option value="Medical">Medical (MBBS / BDS / B.Sc)</option>
                  <option value="Commerce">Commerce (B.Com / BBA / CA)</option>
                  <option value="Arts & Humanities">Arts & Humanities (DU / BA)</option>
                  <option value="General Science">General Science</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Target Semester or Class</label>
              <input
                type="text"
                value={targetSemester}
                onChange={e => setTargetSemester(e.target.value)}
                placeholder="e.g. Semester 3 - 4 or Class 12"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>

            {/* Condition selector with visual cards */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Book Condition</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Like New', label: 'Like New', desc: 'Unused or no marks' },
                  { id: 'Good', label: 'Good', desc: 'Pencil notes only' },
                  { id: 'Fair', label: 'Fair', desc: 'Highlights / worn' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCondition(item.id as ConditionType)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      condition === item.id
                        ? 'border-[#5B4BFF] bg-[#EEECFF] ring-1 ring-[#5B4BFF]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-900">{item.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Topper handwritten notes toggle */}
            <label className="flex items-center gap-2 p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 cursor-pointer">
              <input
                type="checkbox"
                checked={hasNotes}
                onChange={e => setHasNotes(e.target.checked)}
                className="w-4 h-4 accent-[#5B4BFF] rounded"
              />
              <span className="text-xs font-medium text-slate-800">
                Includes solved questions & handwritten notes by semester topper
              </span>
            </label>
          </div>

          {/* STEP 3: Pricing & Pickup Spot */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-[#1B1B3A]">
                Pricing & Savings
              </h3>
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
                  {discountPercent}% OFF MRP
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={sellingPrice}
                  onChange={e => setSellingPrice(Number(e.target.value) || '')}
                  placeholder="350"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-base font-bold text-slate-900 focus:outline-hidden focus:border-[#5B4BFF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Original MRP (₹)</label>
                <input
                  type="number"
                  value={originalMrp}
                  onChange={e => setOriginalMrp(Number(e.target.value) || '')}
                  placeholder="850"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-base font-bold text-slate-500 focus:outline-hidden focus:border-[#5B4BFF]"
                />
              </div>
            </div>

            {/* Friendly negotiation toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-800">Open to Friendly Negotiation</p>
                <p className="text-[11px] text-slate-500">Allows batchmates to make reasonable price offers</p>
              </div>
              <input
                type="checkbox"
                checked={openToNegotiation}
                onChange={e => setOpenToNegotiation(e.target.checked)}
                className="w-5 h-5 accent-[#5B4BFF] cursor-pointer"
              />
            </div>

            {/* Campus pickup spot */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#5B4BFF]" />
                <span>Campus Pickup Spot</span>
              </label>
              <input
                type="text"
                value={pickupSpot}
                onChange={e => setPickupSpot(e.target.value)}
                placeholder="e.g. Central Library Lawn, Nescafe"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 mb-2"
              />

              <div className="flex flex-wrap gap-1.5">
                {PICKUP_PRESETS.map(spot => (
                  <button
                    key={spot}
                    type="button"
                    onClick={() => setPickupSpot(spot)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      pickupSpot === spot
                        ? 'bg-[#5B4BFF] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {spot}
                  </button>
                ))}
              </div>
            </div>

            {/* Campus trust notice */}
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-start gap-2 text-xs text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Campus Trust Rule:</strong> Always inspect pages before receiving payment via UPI at the handoff point!
              </span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                addToast('Draft Saved Locally', 'info');
                navigate('home');
              }}
              className="px-5 py-3 rounded-2xl border border-slate-300 hover:bg-white text-xs font-bold text-slate-700 transition-colors"
            >
              Save Draft
            </button>

            <button
              type="submit"
              className="flex-1 py-3.5 px-6 rounded-full bg-[#5B4BFF] hover:bg-[#4938EC] text-white font-bold text-sm shadow-md shadow-[#5B4BFF]/25 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Review & Publish</span>
              <Sparkles className="w-4 h-4 text-[#FFC83D]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
