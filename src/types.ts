export type LevelType = 'College' | 'School (9-12)' | 'Competitive';

export type CategoryType =
  | 'Textbooks'
  | 'Topper Notes'
  | 'Stationery'
  | 'Calculators'
  | 'Lab & Drafters'
  | 'Hostel Gear'
  | 'Novels & Others';

export type ConditionType =
  | 'Brand New'
  | 'Like New'
  | 'Flawless'
  | 'Good'
  | 'Fair'
  | 'Annotated'
  | 'Topper Notes';

export type StreamType =
  | 'All Streams'
  | 'Engineering'
  | 'Medical'
  | 'Commerce'
  | 'Arts & Humanities'
  | 'General Science';

export type BoardType = 'All Boards' | 'CBSE' | 'ICSE' | 'State Board';

export interface SellerInfo {
  id: string;
  name: string;
  college: string;
  branch: string;
  year: string;
  rating: number;
  salesCount: number;
  responseTime: string;
  avatar: string;
  verified: boolean;
  preferredSpot: string;
  hostelDelivery: string;
}

export interface AcademicDetails {
  relevantFor: string;
  publisher: string;
  edition: string;
  binding: string;
  subject: string;
}

export interface Listing {
  id: string;
  title: string;
  category: CategoryType;
  level: LevelType;
  subCategory?: string;
  stream: StreamType;
  classOrYear: string;
  board?: BoardType;
  price: number;
  originalMrp: number;
  condition: ConditionType;
  conditionNote: string;
  hasNotes?: boolean;
  openToNegotiation: boolean;
  images: string[];
  coverImage: string;
  seller: SellerInfo;
  academicDetails: AcademicDetails;
  sellerQuote: string;
  campusLocation: string;
  distance: string;
  dateListed: string;
  views: number;
  chatsCount: number;
  isTrending?: boolean;
  isSold?: boolean;
  isMyListing?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
  isSystem?: boolean;
}

export interface ChatConversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  listingImage: string;
  otherUser: {
    id: string;
    name: string;
    college: string;
    avatar: string;
    online: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
  status?: 'active' | 'offer_accepted' | 'completed';
}

export interface FilterState {
  searchQuery: string;
  level: LevelType | 'All';
  category: CategoryType | 'All';
  stream: StreamType;
  board: BoardType;
  classOrYear: string;
  minPrice: number;
  maxPrice: number;
  conditions: ConditionType[];
  sortBy: 'nearest' | 'price_low' | 'price_high' | 'discount' | 'popular';
  campus: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'heart' | 'chat';
  message: string;
  subtext?: string;
}
