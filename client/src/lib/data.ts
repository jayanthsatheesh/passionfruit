import { Product } from '@/types';

export const productService = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch('/data/products.json');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get product by ID
  async getProduct(id: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(p => p.id === id) || null;
  },

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter(p => p.featured);
  },

  // Filter products
  async filterProducts(filters: {
    category?: string;
    experienceLevel?: string[];
    priceRange?: [number, number];
    search?: string;
  }): Promise<Product[]> {
    const products = await this.getProducts();
    
    return products.filter(product => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      
      // Experience level filter
      if (filters.experienceLevel && filters.experienceLevel.length > 0) {
        if (!filters.experienceLevel.includes(product.experienceLevel)) {
          return false;
        }
      }
      
      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (product.weeklyPrice < min || product.weeklyPrice > max) {
          return false;
        }
      }
      
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(searchLower);
        const descMatch = product.description.toLowerCase().includes(searchLower);
        const tagMatch = product.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!nameMatch && !descMatch && !tagMatch) {
          return false;
        }
      }
      
      return true;
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
    // In a real app, this would submit to a service like Formspree, Netlify Forms, etc.
    console.log('Lead submitted:', lead);
    
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
