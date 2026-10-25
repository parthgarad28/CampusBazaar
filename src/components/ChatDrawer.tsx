import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  QrCode, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChatDrawer: React.FC = () => {
  const { 
    isChatDrawerOpen, 
    closeChatDrawer, 
    activeChat, 
    sendMessage, 
    setIsUpiModalOpen,
    navigate
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [offerValue, setOfferValue] = useState<number | ''>('');
  const [showOfferBox, setShowOfferBox] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  if (!isChatDrawerOpen || !activeChat) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(activeChat.id, inputMessage.trim());
    setInputMessage('');
  };

  const handleSendOffer = () => {
    if (!offerValue || Number(offerValue) <= 0) return;
    const num = Number(offerValue);
    sendMessage(activeChat.id, `I'd like to make an offer of ₹${num} for this item. Can we handshake on campus?`, true, num);
    setShowOfferBox(false);
    setOfferValue('');
  };

  const quickChips = [
    'Is this still available?',
    'Can we meet at Nescafe kiosk?',
    'Are all pages intact?',
    'Can you do ₹50 less?'
  ];

  const handleChipClick = (text: string) => {
    sendMessage(activeChat.id, text);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeChatDrawer}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 md:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-slate-100"
          >
            {/* Drawer Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={activeChat.otherUser.avatar}
                    alt={activeChat.otherUser.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  {activeChat.otherUser.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-sm text-[#1B1B3A]">
                      {activeChat.otherUser.name}
                    </h3>
                    <span title="Student Verified">
                      <ShieldCheck className="w-4 h-4 text-[#5B4BFF]" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate max-w-[200px]">
                    {activeChat.otherUser.college}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsUpiModalOpen(true)}
                  className="p-2 rounded-xl text-slate-600 hover:text-[#5B4BFF] hover:bg-white transition-colors"
                  title="Generate Campus Handshake UPI QR"
                >
                  <QrCode className="w-4 h-4" />
                </button>
                <button
                  onClick={closeChatDrawer}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Pinned Listing Card in Chat */}
            <div className="px-4 py-2.5 bg-indigo-50/70 border-b border-indigo-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 truncate">
                <img
                  src={activeChat.listingImage}
                  alt={activeChat.listingTitle}
                  className="w-10 h-10 rounded-lg object-cover shrink-0 border border-indigo-200"
                />
                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {activeChat.listingTitle}
                  </p>
                  <p className="text-xs font-bold text-[#5B4BFF] font-mono">
                    ₹{activeChat.listingPrice}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setShowOfferBox(!showOfferBox)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-indigo-200 text-[#5B4BFF] hover:bg-indigo-50 transition-colors"
                >
                  Make Offer
                </button>
                <button
                  onClick={() => {
                    closeChatDrawer();
                    navigate('detail', activeChat.listingId);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600"
                  title="View Item Page"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Offer Input Box (Collapsible) */}
            {showOfferBox && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white p-3 border-b border-slate-200 flex items-center gap-2"
              >
                <span className="text-xs font-semibold text-slate-500">Offer (₹):</span>
                <input
                  type="number"
                  placeholder="e.g. 300"
                  value={offerValue}
                  onChange={e => setOfferValue(Number(e.target.value) || '')}
                  className="w-24 px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-mono font-bold focus:outline-hidden focus:border-[#5B4BFF]"
                />
                <button
                  onClick={handleSendOffer}
                  className="px-3 py-1 bg-[#5B4BFF] text-white text-xs font-semibold rounded-lg hover:bg-[#4938EC] transition-colors"
                >
                  Send Offer
                </button>
                <button
                  onClick={() => setShowOfferBox(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Cancel
                </button>
              </motion.div>
            )}

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF9FF]/60">
              {activeChat.messages.map(msg => {
                if (msg.isSystem) {
                  return (
                    <div key={msg.id} className="text-center my-3">
                      <div className="inline-block px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-[11px] text-slate-600 max-w-xs leading-relaxed">
                        <span className="font-semibold text-slate-800">🛡️ Campus Safety: </span>
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                const isMe = msg.senderId === 'user-me';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                        isMe
                          ? 'bg-[#5B4BFF] text-white rounded-br-xs shadow-sm'
                          : 'bg-white text-slate-800 border border-slate-100 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {msg.isOffer && (
                        <div className="mb-1 pb-1 border-b border-white/20 flex items-center gap-1 font-bold">
                          <Sparkles className="w-3.5 h-3.5 text-[#FFC83D]" />
                          <span>Campus Offer: ₹{msg.offerAmount}</span>
                        </div>
                      )}
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(chip)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#EEECFF] hover:text-[#5B4BFF] text-[11px] font-medium text-slate-600 whitespace-nowrap transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsUpiModalOpen(true)}
                title="Instant Campus UPI QR"
                className="p-2 rounded-xl text-slate-500 hover:text-[#5B4BFF] hover:bg-slate-100 transition-colors shrink-0"
              >
                <QrCode className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 focus:border-[#5B4BFF] focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-hidden"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2 rounded-xl bg-[#5B4BFF] hover:bg-[#4938EC] disabled:opacity-40 text-white transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
