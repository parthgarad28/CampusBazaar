import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  Listing, 
  LevelType, 
  CategoryType, 
  StreamType, 
  BoardType, 
  FilterState, 
  ToastNotification, 
  ChatConversation 
} from '../types';
import { INITIAL_LISTINGS, INITIAL_CHATS } from '../data/initialListings';

type ViewType = 'home' | 'browse' | 'detail' | 'sell' | 'saved' | 'chats' | 'profile';

interface AppContextType {
  listings: Listing[];
  savedListingIds: string[];
  currentView: ViewType;
  selectedListing: Listing | null;
  activeLevel: LevelType;
  setActiveLevel: (level: LevelType) => void;
  selectedCategory: CategoryType | 'All';
  setSelectedCategory: (cat: CategoryType | 'All') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  currentCampus: string;
  setCurrentCampus: (campus: string) => void;
  
  // Navigation
  navigate: (view: ViewType, listingId?: string) => void;
  
  // Saved & Actions
  toggleSaveListing: (id: string) => void;
  isSaved: (id: string) => boolean;
  addNewListing: (listingData: Partial<Listing>) => Listing;
  markListingSold: (id: string) => void;
  deleteListing: (id: string) => void;
  bumpListing: (id: string) => void;
  
  // Chats & Offers
  conversations: Record<string, ChatConversation>;
  activeChat: ChatConversation | null;
  isChatDrawerOpen: boolean;
  openChatForListing: (listing: Listing) => void;
  openConversationById: (chatId: string) => void;
  closeChatDrawer: () => void;
  sendMessage: (chatId: string, text: string, isOffer?: boolean, offerAmount?: number) => void;
  
  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  filteredListings: Listing[];
  
  // Modals & Overlays
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isUpiModalOpen: boolean;
  setIsUpiModalOpen: (open: boolean) => void;
  isSafetyModalOpen: boolean;
  setIsSafetyModalOpen: (open: boolean) => void;
  
  // Toasts
  toasts: ToastNotification[];
  addToast: (message: string, type?: 'success' | 'info' | 'heart' | 'chat', subtext?: string) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  level: 'All',
  category: 'All',
  stream: 'All Streams',
  board: 'All Boards',
  classOrYear: 'All',
  minPrice: 0,
  maxPrice: 2000,
  conditions: [],
  sortBy: 'nearest',
  campus: 'All Campuses'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load listings from localStorage or fallback
  const [listings, setListings] = useState<Listing[]>(() => {
    try {
      const stored = localStorage.getItem('kitaabkart_listings_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading stored listings', e);
    }
    return INITIAL_LISTINGS;
  });

  // Saved items
  const [savedListingIds, setSavedListingIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('kitaabkart_saved_v1');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return ['kk-01', 'kk-11'];
  });

  // Navigation & views
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<LevelType>('College');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCampus, setCurrentCampus] = useState('IIT Delhi / North Campus DU • within 2.5 km');

  // Filters state
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Chats
  const [conversations, setConversations] = useState<Record<string, ChatConversation>>(() => {
    try {
      const stored = localStorage.getItem('kitaabkart_chats_v1');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CHATS;
  });
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);

  // Modals
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('kitaabkart_listings_v1', JSON.stringify(listings));
    } catch (e) {
      console.error(e);
    }
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem('kitaabkart_saved_v1', JSON.stringify(savedListingIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedListingIds]);

  useEffect(() => {
    try {
      localStorage.setItem('kitaabkart_chats_v1', JSON.stringify(conversations));
    } catch (e) {
      console.error(e);
    }
  }, [conversations]);

  const addToast = (message: string, type: 'success' | 'info' | 'heart' | 'chat' = 'info', subtext?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, type, message, subtext }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigate = (view: ViewType, listingId?: string) => {
    if (listingId) {
      setSelectedListingId(listingId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedListing = useMemo(() => {
    if (!selectedListingId) return null;
    return listings.find(l => l.id === selectedListingId) || null;
  }, [listings, selectedListingId]);

  const toggleSaveListing = (id: string) => {
    setSavedListingIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('Removed from Watchlist', 'info');
        return prev.filter(item => item !== id);
      } else {
        const item = listings.find(l => l.id === id);
        addToast(
          'Saved to Watchlist!', 
          'heart', 
          item ? `We'll alert you if ${item.seller.name.split(' ')[0]} drops the price` : undefined
        );
        return [...prev, id];
      }
    });
  };

  const isSaved = (id: string) => savedListingIds.includes(id);

  const addNewListing = (listingData: Partial<Listing>): Listing => {
    const id = 'kk-' + Date.now().toString(36);
    const newListing: Listing = {
      id,
      title: listingData.title || 'Student Book',
      category: listingData.category || 'Textbooks',
      level: listingData.level || 'College',
      subCategory: listingData.subCategory || 'General Academic',
      stream: listingData.stream || 'Engineering',
      classOrYear: listingData.classOrYear || 'All Years',
      board: listingData.board || 'CBSE',
      price: listingData.price || 250,
      originalMrp: listingData.originalMrp || Math.round((listingData.price || 250) * 2.2),
      condition: listingData.condition || 'Like New',
      conditionNote: listingData.conditionNote || 'Well maintained, original student copy.',
      hasNotes: listingData.hasNotes ?? true,
      openToNegotiation: listingData.openToNegotiation ?? true,
      coverImage: listingData.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
      images: listingData.images && listingData.images.length > 0
        ? listingData.images
        : [listingData.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80'],
      seller: {
        id: 'user-me',
        name: 'Tanvi Saxena',
        college: 'IIT Delhi',
        branch: '3rd Year B.Tech',
        year: '3rd Year',
        rating: 4.9,
        salesCount: 13,
        responseTime: '~5 mins',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        verified: true,
        preferredSpot: listingData.campusLocation || 'Central Library Ground Floor',
        hostelDelivery: 'Campus Handshake'
      },
      academicDetails: listingData.academicDetails || {
        relevantFor: 'Campus Coursework',
        publisher: 'Standard Publisher',
        edition: 'Latest Edition',
        binding: 'Paperback',
        subject: 'Academic'
      },
      sellerQuote: listingData.sellerQuote || 'Passing this on to juniors. Clean copy, ready for semester exams!',
      campusLocation: listingData.campusLocation || 'IIT Delhi / North Campus DU',
      distance: '0.2 km',
      dateListed: 'Just now',
      views: 1,
      chatsCount: 0,
      isMyListing: true
    };

    setListings(prev => [newListing, ...prev]);
    addToast('Ad Published Successfully!', 'success', 'Your book is now live for peers near you.');
    return newListing;
  };

  const markListingSold = (id: string) => {
    setListings(prev => prev.map(item => item.id === id ? { ...item, isSold: true } : item));
    addToast('Listing Marked as Sold', 'success', 'Congratulations on passing it on to a peer!');
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(item => item.id !== id));
    addToast('Listing Removed', 'info');
  };

  const bumpListing = (id: string) => {
    setListings(prev => {
      const target = prev.find(item => item.id === id);
      if (!target) return prev;
      const filtered = prev.filter(item => item.id !== id);
      return [{ ...target, dateListed: 'Just now', views: target.views + 5 }, ...filtered];
    });
    addToast('Listing Bumped to Top!', 'success', 'Your listing is now at the top of campus search.');
  };

  const openChatForListing = (listing: Listing) => {
    // Look for existing chat for this listing
    const existing = Object.values(conversations).find(c => c.listingId === listing.id);
    if (existing) {
      setActiveChatId(existing.id);
      setIsChatDrawerOpen(true);
      return;
    }

    // Create new chat conversation
    const newChatId = 'chat-' + listing.id;
    const newConv: ChatConversation = {
      id: newChatId,
      listingId: listing.id,
      listingTitle: listing.title,
      listingPrice: listing.price,
      listingImage: listing.coverImage,
      otherUser: {
        id: listing.seller.id,
        name: listing.seller.name,
        college: `${listing.seller.college} • ${listing.seller.branch}`,
        avatar: listing.seller.avatar,
        online: true
      },
      lastMessage: `Interested in "${listing.title}"`,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: [
        {
          id: 'sys-1',
          senderId: 'system',
          senderName: 'CampusBazaar Safe Chat',
          text: `You are connected with ${listing.seller.name} (${listing.seller.college}). Phone numbers are kept private. Meet at safe public spots like the campus library or canteen!`,
          timestamp: 'Now',
          isSystem: true
        }
      ],
      status: 'active'
    };

    setConversations(prev => ({
      ...prev,
      [newChatId]: newConv
    }));
    setActiveChatId(newChatId);
    setIsChatDrawerOpen(true);
  };

  const openConversationById = (chatId: string) => {
    if (conversations[chatId]) {
      // mark read
      setConversations(prev => ({
        ...prev,
        [chatId]: {
          ...prev[chatId],
          unreadCount: 0
        }
      }));
      setActiveChatId(chatId);
      setIsChatDrawerOpen(true);
    }
  };

  const closeChatDrawer = () => {
    setIsChatDrawerOpen(false);
  };

  const sendMessage = (chatId: string, text: string, isOffer = false, offerAmount?: number) => {
    const chat = conversations[chatId];
    if (!chat) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      senderId: 'user-me',
      senderName: 'You',
      text,
      timestamp: 'Just now',
      isOffer,
      offerAmount
    };

    const updatedMessages = [...chat.messages, userMsg];

    setConversations(prev => ({
      ...prev,
      [chatId]: {
        ...chat,
        lastMessage: text,
        lastMessageTime: 'Just now',
        messages: updatedMessages
      }
    }));

    if (isOffer) {
      addToast(`Offer of ₹${offerAmount} Sent!`, 'info', `${chat.otherUser.name} will respond shortly.`);
    }

    // Simulate smart peer seller auto-reply after 1.8 seconds!
    setTimeout(() => {
      let replyText = 'Got your message! When are you free to meet on campus?';
      if (isOffer) {
        replyText = `Hey! ₹${offerAmount} works for me if we can do handoff today at Nescafe kiosk! Deal?`;
      } else if (text.toLowerCase().includes('available')) {
        replyText = 'Yes, still available! Crisp pages, no marks. Can meet after my lab at 4:30 PM.';
      } else if (text.toLowerCase().includes('meet') || text.toLowerCase().includes('time') || text.toLowerCase().includes('canteen')) {
        replyText = 'Central Library Ground Floor or Nescafe works great. See you there!';
      }

      const sellerReply = {
        id: 'msg-reply-' + Date.now(),
        senderId: chat.otherUser.id,
        senderName: chat.otherUser.name,
        text: replyText,
        timestamp: 'Just now'
      };

      setConversations(prevConv => {
        const cur = prevConv[chatId];
        if (!cur) return prevConv;
        return {
          ...prevConv,
          [chatId]: {
            ...cur,
            lastMessage: replyText,
            lastMessageTime: 'Just now',
            unreadCount: isChatDrawerOpen && activeChatId === chatId ? 0 : cur.unreadCount + 1,
            messages: [...cur.messages, sellerReply]
          }
        };
      });

      addToast(`New message from ${chat.otherUser.name}`, 'chat', replyText.substring(0, 48) + '...');
    }, 1800);
  };

  const activeChat = activeChatId ? conversations[activeChatId] || null : null;

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery('');
  };

  // Filtered listings logic
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesSub = item.subCategory?.toLowerCase().includes(query);
        const matchesSeller = item.seller.name.toLowerCase().includes(query);
        const matchesCollege = item.seller.college.toLowerCase().includes(query);
        const matchesSubject = item.academicDetails.subject.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCategory && !matchesSub && !matchesSeller && !matchesCollege && !matchesSubject) {
          return false;
        }
      }

      // Level filter (from active level or filters.level)
      if (filters.level !== 'All' && item.level !== filters.level) {
        return false;
      }

      // Category filter
      if (filters.category !== 'All' && item.category !== filters.category) {
        return false;
      }

      // Stream filter
      if (filters.stream !== 'All Streams' && item.stream !== filters.stream && item.stream !== 'All Streams') {
        return false;
      }

      // Board filter
      if (filters.board !== 'All Boards' && item.board && item.board !== filters.board && item.board !== 'All Boards') {
        return false;
      }

      // Price range
      if (item.price < filters.minPrice || item.price > filters.maxPrice) {
        return false;
      }

      // Condition
      if (filters.conditions.length > 0 && !filters.conditions.includes(item.condition)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_low') return a.price - b.price;
      if (filters.sortBy === 'price_high') return b.price - a.price;
      if (filters.sortBy === 'discount') {
        const discA = (a.originalMrp - a.price) / a.originalMrp;
        const discB = (b.originalMrp - b.price) / b.originalMrp;
        return discB - discA;
      }
      if (filters.sortBy === 'popular') return b.views - a.views;
      // default nearest / date
      return 0;
    });
  }, [listings, searchQuery, filters]);

  return (
    <AppContext.Provider
      value={{
        listings,
        savedListingIds,
        currentView,
        selectedListing,
        activeLevel,
        setActiveLevel,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        currentCampus,
        setCurrentCampus,
        navigate,
        toggleSaveListing,
        isSaved,
        addNewListing,
        markListingSold,
        deleteListing,
        bumpListing,
        conversations,
        activeChat,
        isChatDrawerOpen,
        openChatForListing,
        openConversationById,
        closeChatDrawer,
        sendMessage,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        filteredListings,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isUpiModalOpen,
        setIsUpiModalOpen,
        isSafetyModalOpen,
        setIsSafetyModalOpen,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
