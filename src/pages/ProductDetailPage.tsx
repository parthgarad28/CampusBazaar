import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  Star, 
  Zap, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles, 
  BookOpen, 
  Check, 
  Package, 
  Info,
  Maximize2,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedListing, 
    listings, 
    navigate, 
    isSaved, 
    toggleSaveListing, 
    openChatForListing,
    addToast 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [offerSheetOpen, setOfferSheetOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState<number | ''>('');

  if (!selectedListing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-lg font-bold text-slate-800">No book selected</h2>
        <button
          onClick={() => navigate('browse')}
          className="mt-4 px-6 py-2.5 bg-[#5B4BFF] text-white rounded-full text-xs font-semibold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const saved = isSaved(selectedListing.id);
  const discountPercent = Math.round(
    ((selectedListing.originalMrp - selectedListing.price) / selectedListing.originalMrp) * 100
  );
  const savingsAmount = selectedListing.originalMrp - selectedListing.price;

  // Similar items
  const similarItems = listings
    .filter(item => item.id !== selectedListing.id && (item.category === selectedListing.category || item.stream === selectedListing.stream))
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedListing.title,
        text: `Check out ${selectedListing.title} on CampusBazaar for ₹${selectedListing.price}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      addToast('Listing Link Copied!', 'success', 'Share it with your batchmates on WhatsApp.');
    }
  };

  const handleSendOffer = () => {
    if (!offerPrice) return;
    openChatForListing(selectedListing);
    setOfferSheetOpen(false);
  };

  const imagesList = selectedListing.images && selectedListing.images.length > 0 
    ? selectedListing.images 
    : [selectedListing.coverImage];

  return (
    <div className="min-h-screen bg-[#FAF9FF] pb-32 md:pb-24 pt-3">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Top Navigation Bar for PDP */}
        <div className="flex items-center justify-between py-2 mb-3">
          <button
            onClick={() => navigate('browse')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#5B4BFF] p-1.5 rounded-xl hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Browse</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white border border-slate-200/80 text-slate-600 hover:text-[#5B4BFF] shadow-xs transition-colors"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSaveListing(selectedListing.id)}
              className="p-2 rounded-full bg-white border border-slate-200/80 shadow-xs transition-colors"
              title="Save to watchlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  saved ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-slate-400 hover:text-slate-600'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Main PDP Grid: Gallery Left, Details Right on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Gallery Column (md: 6 cols) */}
          <div className="md:col-span-6 space-y-3">
            {/* Main Featured Photo */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md group">
              <img
                src={imagesList[activeImageIndex]}
                alt={selectedListing.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsZoomOpen(true)}
              />

              {/* Campus Verified Overlay Pill */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B4BFF]" />
                <span>{selectedListing.seller.college.split(',')[0]} Verified</span>
              </div>

              {/* Photos Counter & Zoom Trigger */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-medium">
                  📷 {activeImageIndex + 1} / {imagesList.length} Photos
                </span>
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Thumbnails Row */}
            {imagesList.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#5B4BFF] ring-2 ring-[#5B4BFF]/30 scale-102'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column (md: 6 cols) */}
          <div className="md:col-span-6 space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="text-[#5B4BFF] font-semibold">{selectedListing.category}</span>
                <span>·</span>
                <span>{selectedListing.campusLocation}</span>
                <span>·</span>
                <span>{selectedListing.distance} away</span>
              </div>

              <h1 className="font-display font-extrabold text-xl sm:text-2xl text-[#1B1B3A] leading-snug">
                {selectedListing.title}
              </h1>
            </div>

            {/* Price & Savings Module */}
            <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-display font-black text-3xl font-mono text-[#1B1B3A]">
                  ₹{selectedListing.price}
                </span>
                <span className="text-base text-slate-400 line-through font-mono">
                  ₹{selectedListing.originalMrp}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs">
                  {discountPercent}% OFF
                </span>
              </div>

              {savingsAmount > 0 && (
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Save ₹{savingsAmount} compared to brand new store copy!</span>
                </div>
              )}
            </div>

            {/* Condition Box */}
            <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-xs">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5B4BFF]" />
                  <span className="text-xs font-bold text-slate-900">
                    Condition: {selectedListing.condition}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Self-graded by student</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedListing.conditionNote}
              </p>
            </div>

            {/* Seller Profile Card */}
            <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedListing.seller.avatar}
                    alt={selectedListing.seller.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-50"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display font-bold text-sm text-[#1B1B3A]">
                        {selectedListing.seller.name}
                      </h4>
                      <ShieldCheck className="w-4 h-4 text-[#5B4BFF]" />
                    </div>
                    <p className="text-xs text-slate-500">
                      {selectedListing.seller.year}, {selectedListing.seller.branch} · {selectedListing.seller.college}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="flex items-center gap-0.5 font-bold text-amber-600">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {selectedListing.seller.rating}
                      </span>
                      <span>·</span>
                      <span>{selectedListing.seller.salesCount} book sales</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Response: {selectedListing.seller.responseTime}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Package className="w-3.5 h-3.5 text-[#5B4BFF] shrink-0" />
                  <span>{selectedListing.seller.hostelDelivery}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-2xl flex items-start gap-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-[#5B4BFF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Preferred Handshake Spot: </span>
                  <span>{selectedListing.seller.preferredSpot}</span>
                </div>
              </div>
            </div>

            {/* Academic Details Table */}
            <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-xs">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                Academic Details
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">RELEVANT FOR</span>
                  <span className="font-semibold text-slate-800">{selectedListing.academicDetails.relevantFor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">PUBLISHER</span>
                  <span className="font-semibold text-slate-800">{selectedListing.academicDetails.publisher}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">EDITION</span>
                  <span className="font-semibold text-slate-800">{selectedListing.academicDetails.edition}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">BINDING</span>
                  <span className="font-semibold text-slate-800">{selectedListing.academicDetails.binding}</span>
                </div>
              </div>

              {/* Seller personal quote */}
              {selectedListing.sellerQuote && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 italic">
                  "{selectedListing.sellerQuote}"
                </div>
              )}
            </div>

            {/* Campus Safety Protocol card */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Campus Exchange Protocol: </span>
                <span>Meet in daylight at high-footfall spots like the library lawn or Nescafe kiosk. Inspect pages before paying via UPI.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar items section */}
        {similarItems.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-[#1B1B3A]">
                Similar on Campus
              </h3>
              <button
                onClick={() => navigate('browse')}
                className="text-xs font-semibold text-[#5B4BFF] hover:underline"
              >
                See All
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similarItems.map(item => (
                <ProductCard key={item.id} listing={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar for Mobile & Desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl py-3 px-4 safe-area-bottom">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveListing(selectedListing.id)}
              className={`p-3 rounded-2xl border transition-colors ${
                saved ? 'bg-red-50 border-red-200 text-[#FF6B6B]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Save Item"
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-[#FF6B6B]' : ''}`} />
            </button>

            <button
              onClick={() => setOfferSheetOpen(true)}
              className="px-4 py-3 rounded-2xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-[#5B4BFF] font-bold text-xs transition-colors"
            >
              Make Offer
            </button>
          </div>

          <button
            onClick={() => openChatForListing(selectedListing)}
            className="flex-1 max-w-sm py-3 px-5 rounded-2xl bg-[#5B4BFF] hover:bg-[#4938EC] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#5B4BFF]/25 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with {selectedListing.seller.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Photo Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={imagesList[activeImageIndex]}
              alt={selectedListing.title}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Make Offer Sheet */}
      <AnimatePresence>
        {offerSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOfferSheetOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-md bg-white rounded-t-3xl p-6 shadow-2xl z-10 space-y-4"
            >
              <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto" />
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-[#1B1B3A]">
                  Make a Friendly Offer
                </h3>
                <button onClick={() => setOfferSheetOpen(false)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Current listed price is <strong className="text-slate-800">₹{selectedListing.price}</strong>. Propose a fair student rate:
              </p>

              <div className="flex gap-2">
                {[selectedListing.price - 40, selectedListing.price - 70, selectedListing.price - 100].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setOfferPrice(amt)}
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-[#5B4BFF] text-xs font-bold font-mono transition-colors"
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Offer Price (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 300"
                  value={offerPrice}
                  onChange={e => setOfferPrice(Number(e.target.value) || '')}
                  className="w-full p-3 border border-slate-300 rounded-2xl font-mono text-base font-bold focus:outline-hidden focus:border-[#5B4BFF]"
                />
              </div>

              <button
                onClick={handleSendOffer}
                disabled={!offerPrice}
                className="w-full py-3 rounded-full bg-[#5B4BFF] disabled:opacity-40 text-white font-bold text-xs shadow-md shadow-[#5B4BFF]/20"
              >
                Send Offer to {selectedListing.seller.name.split(' ')[0]}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
