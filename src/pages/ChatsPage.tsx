import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowLeft, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChatsPage: React.FC = () => {
  const { conversations, openConversationById, navigate } = useApp();

  const convList = Object.values(conversations);

  return (
    <div className="min-h-screen bg-[#FAF9FF] pb-24 md:pb-16 pt-4">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('home')}
              className="p-1.5 rounded-xl hover:bg-white text-slate-600 transition-colors mr-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display font-extrabold text-xl text-[#1B1B3A]">
                Campus Inquiries
              </h1>
              <p className="text-xs text-slate-500">
                Direct messages with verified student buyers & sellers
              </p>
            </div>
          </div>
        </div>

        {/* Conversation list */}
        {convList.length > 0 ? (
          <div className="space-y-3">
            {convList.map(chat => (
              <motion.div
                key={chat.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => openConversationById(chat.id)}
                className="p-4 bg-white rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-start gap-3.5 group"
              >
                {/* User avatar */}
                <div className="relative shrink-0">
                  <img
                    src={chat.otherUser.avatar}
                    alt={chat.otherUser.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-50"
                  />
                  {chat.otherUser.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display font-bold text-sm text-[#1B1B3A] group-hover:text-[#5B4BFF] transition-colors">
                        {chat.otherUser.name}
                      </h3>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5B4BFF]" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {chat.lastMessageTime}
                    </span>
                  </div>

                  {/* College & Listing context */}
                  <p className="text-[11px] text-[#5B4BFF] font-semibold truncate mb-1">
                    {chat.listingTitle} · ₹{chat.listingPrice}
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-1 leading-snug">
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread badge & Action */}
                <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                  {chat.unreadCount > 0 ? (
                    <span className="px-2 py-0.5 bg-[#FF6B6B] text-white text-[10px] font-bold rounded-full">
                      {chat.unreadCount} new
                    </span>
                  ) : (
                    <span className="text-xs text-slate-300">·</span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openConversationById(chat.id);
                    }}
                    className="px-3 py-1 rounded-xl bg-indigo-50 text-[#5B4BFF] text-xs font-semibold group-hover:bg-[#5B4BFF] group-hover:text-white transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#5B4BFF] mx-auto flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#1B1B3A]">
              No chats yet
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
              When you message a book seller or receive inquiries from batchmates, conversations will appear here.
            </p>
            <button
              onClick={() => navigate('browse')}
              className="px-6 py-3 rounded-full bg-[#5B4BFF] text-white text-xs font-bold shadow-md shadow-[#5B4BFF]/20 hover:bg-[#4938EC] transition-all flex items-center justify-center gap-1.5 mx-auto"
            >
              <span>Explore Books Near You</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
