import { Booking, Product, User } from '@/types';
import { sendBookingConfirmation } from './emailjs';

const BOOKINGS_KEY = 'passionfruit_bookings';

export const bookingService = {
  getAllBookings(): Booking[] {
    try {
      const stored = localStorage.getItem(BOOKINGS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading bookings:', error);
      return [];
    }
  },

  getUserBookings(userId: string): Booking[] {
    const bookings = this.getAllBookings();
    return bookings.filter(b => b.userId === userId);
  },

  async createBooking(
    user: User,
    product: Product,
    startDate: string,
    endDate: string,
    phoneNumber: string,
    deliveryAddress: string,
    emergencyContact?: string,
    specialInstructions?: string
  ): Promise<Booking> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = this.calculatePrice(product, duration);

    const booking: Booking = {
      id: `booking_${Date.now()}`,
      userId: user.id,
      productId: product.id,
      startDate,
      endDate,
      duration,
      totalPrice,
      status: 'pending',
      deliveryAddress,
      createdAt: new Date().toISOString()
    };

    const bookings = this.getAllBookings();
    bookings.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

    // Send email notification using EmailJS
    try {
      const extendedBooking = {
        ...booking,
        phoneNumber,
        emergencyContact,
        specialInstructions
      };
      
      const emailSent = await sendBookingConfirmation(extendedBooking, product, user);
      
      if (emailSent) {
        console.log('Booking confirmation emails sent successfully');
      } else {
        console.warn('Failed to send booking confirmation emails');
      }
    } catch (error) {
      console.error('Error sending booking confirmation:', error);
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return booking;
  },

  getBookingById(bookingId: string): Booking | null {
    const bookings = this.getAllBookings();
    return bookings.find(b => b.id === bookingId) || null;
  },

  updateBookingStatus(bookingId: string, status: Booking['status']): void {
    const bookings = this.getAllBookings();
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex !== -1) {
      bookings[bookingIndex].status = status;
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    }
  },

  calculatePrice(product: Product, duration: number): number {
    if (duration <= 2) {
      return Math.round(product.weeklyPrice * 0.4);
    } else if (duration <= 7) {
      return product.weeklyPrice;
    } else if (duration <= 30) {
      return product.monthlyPrice;
    } else {
      return product.monthlyPrice + Math.floor((duration - 30) / 7) * product.weeklyPrice * 0.8;
    }
  },

  isProductAvailable(productId: string, startDate: string, endDate: string): boolean {
    const bookings = this.getAllBookings();
    const activeBookings = bookings.filter(b => 
      b.productId === productId && 
      (b.status === 'confirmed' || b.status === 'active')
    );

    const requestStart = new Date(startDate);
    const requestEnd = new Date(endDate);

    return !activeBookings.some(booking => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      
      return (requestStart <= bookingEnd && requestEnd >= bookingStart);
    });
  }
};

// Lead capture service
export const leadService = {
  async submitLead(lead: {
    name: string;
    email: string;
    phone: string;
    message?: string;
    interests?: string[];
  }): Promise<void> {
    // Store locally for demo
    const leads = this.getStoredLeads();
    leads.push({
      ...lead,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('passionfruit_leads', JSON.stringify(leads));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  getStoredLeads() {
    try {
      const stored = localStorage.getItem('passionfruit_leads');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading leads:', error);
      return [];
    }
  }
};
