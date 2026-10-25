import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Star, 
  Zap, 
  Coffee, 
  MessageSquare, 
  Plus, 
  Edit3, 
  CheckCircle, 
  Rocket, 
  MapPin, 
  QrCode, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Heart, 
  Trash2, 
  ArrowLeft 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { 
    listings, 
    markListingSold, 
    bumpListing, 
    deleteListing, 
    navigate, 
    openConversationById, 
    setIsUpiModalOpen, 
    setIsSafetyModalOpen, 
    setIsLocationModalOpen,
    addToast,
    savedListingIds,
    toggleSaveListing
  } = useApp();

  const [activeTab, setActiveTab] = useState<'activity' | 'chats'>('activity');
  const [listingFilter, setListingFilter] = useState<'active' | 'sold' | 'drafts'>('active');

  // Filter user's listings
  const myListings = listings.filter(item => item.isMyListing || item.id === 'kk-17');
  const activeMyListings = myListings.filter(item => !item.isSold);
  const soldMyListings = myListings.filter(item => item.isSold);

  const displayedListings = listingFilter === 'active' 
    ? activeMyListings 
    : listingFilter === 'sold' 
      ? soldMyListings 
      : [];

  const handleInviteFriend = () => {
    navigator.clipboard?.writeText('https://campusbazaar.app/invite?code=IITD-TANVI');
    addToast('Referral Link Copied!', 'success', 'Send to your juniors. Both get ₹50 Canteen voucher on first sale!');
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] pb-24 md:pb-16 pt-4">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-5">
        {/* Top Header Switcher: My Activity | Campus Chats */}
        <div className="p-1 bg-slate-200/60 rounded-2xl flex items-center">
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'activity'
                ? 'bg-white text-[#1B1B3A] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Activity
          </button>
          <button
            onClick={() => navigate('chats')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'chats'
                ? 'bg-white text-[#1B1B3A] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Campus Chats</span>
            <span className="px-1.5 py-0.2 bg-[#FF6B6B] text-white text-[10px] rounded-full font-bold">
              3 new
            </span>
          </button>
        </div>

        {/* Student Profile Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-5 sm:p-6 space-y-4">
          {/* Student Portrait Banner */}
          <div className="relative aspect-[16/10] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              alt="Tanvi Saxena - Student Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display font-extrabold text-xl text-white">
                  Tanvi Saxena
                </h2>
                <span title="ID Verified">
                  <ShieldCheck className="w-5 h-5 text-[#2ECC9A]" />
                </span>
              </div>
              <p className="text-xs text-indigo-100">
                3rd Year Biochemical Engg · IIT Delhi (Nilgiri Hostel)
              </p>
            </div>
          </div>

          {/* Badges Strip */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ID Verified</span>
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Super Seller · 4.9 (34)</span>
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>Fast Responder (~5m)</span>
            </span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-center">
            <div className="p-2 bg-slate-50 rounded-2xl">
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Earned</p>
              <p className="text-base sm:text-lg font-bold font-mono text-[#5B4BFF]">₹4,850</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-2xl">
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Books Sold</p>
              <p className="text-base sm:text-lg font-bold font-mono text-slate-800">12</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-2xl">
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Watchlist</p>
              <p className="text-base sm:text-lg font-bold font-mono text-slate-800">{savedListingIds.length}</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-2xl">
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Campus Clubs</p>
              <p className="text-base sm:text-lg font-bold font-mono text-slate-800">2</p>
            </div>
          </div>
        </div>

        {/* Refer a Wingmate / Junior Banner */}
        <div className="p-4 rounded-3xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FFC83D] text-[#1B1B3A] flex items-center justify-center shrink-0">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display font-bold text-xs sm:text-sm text-amber-950">
                Refer a wingmate or junior!
              </p>
              <p className="text-[11px] text-amber-800">
                Both grab a ₹50 Canteen Nescafe treat on first listing
              </p>
            </div>
          </div>
          <button
            onClick={handleInviteFriend}
            className="px-4 py-2 rounded-full bg-[#1B1B3A] hover:bg-slate-800 text-white font-bold text-xs shrink-0 transition-transform active:scale-95"
          >
            Invite
          </button>
        </div>

        {/* Campus Inquiries Section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-sm text-[#1B1B3A]">
                Campus Inquiries
              </h3>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <button
              onClick={() => navigate('chats')}
              className="text-xs font-semibold text-[#5B4BFF] hover:underline flex items-center gap-0.5"
            >
              <span>See All (3)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Inquiry 1: Rohan */}
            <div
              onClick={() => openConversationById('chat-01')}
              className="p-3 bg-slate-50 hover:bg-indigo-50/50 rounded-2xl border border-slate-100 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3 truncate pr-2">
                <img
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80"
                  alt="Rohan"
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Rohan Verma</span>
                    <span className="text-[10px] text-slate-400">2m ago</span>
                  </div>
                  <p className="text-[11px] text-[#5B4BFF] font-semibold truncate">
                    HC Verma Vol 1 · ₹280
                  </p>
                  <p className="text-xs text-slate-600 truncate">
                    "Hey Tanvi, can we meet at Nescafe canteen around 4:30 PM?"
                  </p>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-xl bg-[#5B4BFF] text-white text-xs font-bold shrink-0">
                Reply
              </button>
            </div>

            {/* Inquiry 2: Ananya */}
            <div
              onClick={() => openConversationById('chat-02')}
              className="p-3 bg-slate-50 hover:bg-indigo-50/50 rounded-2xl border border-slate-100 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3 truncate pr-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Ananya"
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Ananya Roy</span>
                    <span className="text-[10px] text-slate-400">1h ago</span>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-semibold truncate">
                    Casio fx-991EX · Offer Accepted ₹600
                  </p>
                  <p className="text-xs text-slate-600 truncate">
                    "Pickup tomorrow 1:30 PM at Bharti Bldg Nescafe!"
                  </p>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shrink-0">
                Open
              </button>
            </div>
          </div>
        </div>

        {/* My Listings Section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-[#1B1B3A]">
              My Listings
            </h3>
            <button
              onClick={() => navigate('sell')}
              className="flex items-center gap-1 text-xs font-bold text-[#5B4BFF] hover:underline"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Item</span>
            </button>
          </div>

          {/* Sub-tabs: Active, Sold, Drafts */}
          <div className="flex gap-2 text-xs font-semibold border-b border-slate-100 pb-2">
            <button
              onClick={() => setListingFilter('active')}
              className={`pb-1 px-1 transition-colors ${
                listingFilter === 'active'
                  ? 'border-b-2 border-[#5B4BFF] text-[#5B4BFF] font-bold'
                  : 'text-slate-500'
              }`}
            >
              Active ({activeMyListings.length})
            </button>
            <button
              onClick={() => setListingFilter('sold')}
              className={`pb-1 px-1 transition-colors ${
                listingFilter === 'sold'
                  ? 'border-b-2 border-[#5B4BFF] text-[#5B4BFF] font-bold'
                  : 'text-slate-500'
              }`}
            >
              Sold ({soldMyListings.length})
            </button>
            <button
              onClick={() => setListingFilter('drafts')}
              className={`pb-1 px-1 transition-colors ${
                listingFilter === 'drafts'
                  ? 'border-b-2 border-[#5B4BFF] text-[#5B4BFF] font-bold'
                  : 'text-slate-500'
              }`}
            >
              Drafts (1)
            </button>
          </div>

          {/* Displayed Listings */}
          <div className="space-y-3">
            {displayedListings.map(listing => (
              <div
                key={listing.id}
                className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={listing.coverImage}
                    alt={listing.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {listing.condition}
                    </span>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-[#1B1B3A] line-clamp-1 mt-0.5">
                      {listing.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs">
                      <span className="font-bold font-mono text-[#5B4BFF]">₹{listing.price}</span>
                      <span className="text-slate-400 line-through font-mono">₹{listing.originalMrp}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-[11px] text-slate-500">👁️ {listing.views} views</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {!listing.isSold ? (
                    <>
                      <button
                        onClick={() => bumpListing(listing.id)}
                        className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-colors flex items-center gap-1"
                      >
                        <Rocket className="w-3.5 h-3.5" />
                        <span>Bump</span>
                      </button>
                      <button
                        onClick={() => markListingSold(listing.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#5B4BFF] text-white text-xs font-semibold hover:bg-[#4938EC] transition-colors"
                      >
                        Mark as Sold
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
                      Sold to Peer ✓
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Trust & Account Settings Menu */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
          <button
            onClick={() => addToast('ID Verified through IIT Delhi ERP until June 2026', 'success')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 text-[#5B4BFF]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Campus Verification</p>
                <p className="text-[11px] text-slate-500">IIT Delhi · Verified till June 2026</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Saved Safe Meetup Spots</p>
                <p className="text-[11px] text-slate-500">Central Library Ground Floor, Nescafe Booth</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setIsUpiModalOpen(true)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">UPI Instant Handshake QR</p>
                <p className="text-[11px] text-slate-500">Receive book payments directly with zero fees</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setIsSafetyModalOpen(true)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Help & Student Safety Guidelines</p>
                <p className="text-[11px] text-slate-500">Rules for in-person handoffs & dispute support</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Log out link */}
        <div className="text-center pt-2">
          <button
            onClick={() => addToast('Logged out of student session', 'info')}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1.5 mx-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log out of student session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
