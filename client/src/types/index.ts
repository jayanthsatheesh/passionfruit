export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  weeklyPrice: number;
  monthlyPrice: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  included: string[];
  specs: Record<string, string>;
  experienceLevel: 'explorer' | 'aspiring' | 'pro';
  tags: string[];
  available: boolean;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  pincode?: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  productId: string;
  userId: string;
  startDate: string;
  endDate: string;
  duration: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  deliveryAddress: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  plan: 'weekend' | 'week' | 'month';
  startDate: string;
  endDate: string;
  price: number;
}

export interface FilterState {
  categories: string[];
  experienceLevels: string[];
  priceRange: [number, number];
  search: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  interests?: string[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
