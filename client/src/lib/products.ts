import { Product } from '@/types';
import { loadProductsFromCSV } from './csvParser';
import productsData from '@/data/products.json';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      // First try to load from CSV spreadsheet
      const csvProducts = await loadProductsFromCSV();
      if (csvProducts.length > 0) {
        return csvProducts;
      }
      
      // Fallback to JSON if CSV is not available
      const defaultProducts = (productsData as any[]).map(product => ({
        ...product,
        // Ensure specs is properly formatted
        specs: Object.fromEntries(
          Object.entries(product.specs || {}).filter(([_, value]) => value !== undefined)
        ) as Record<string, string>
      })) as Product[];
      
      return defaultProducts;
    } catch (error) {
      console.error('Error loading products:', error);
      // Return empty array if loading fails
      return [];
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    const products = await this.getAllProducts();
    return products.find(p => p.id === id) || null;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(p => p.featured === true).slice(0, 6);
  },

  async searchProducts(query: string): Promise<Product[]> {
    const products = await this.getAllProducts();
    const searchLower = query.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.subcategory.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  },

  async filterProducts(filters: {
    category?: string;
    experienceLevel?: string[];
    priceRange?: [number, number];
    search?: string;
  }): Promise<Product[]> {
    const products = await this.getAllProducts();
    
    return products.filter(product => {
      if (filters.category && product.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      
      if (filters.experienceLevel && filters.experienceLevel.length > 0) {
        if (!filters.experienceLevel.includes(product.experienceLevel)) {
          return false;
        }
      }
      
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (product.weeklyPrice < min || product.weeklyPrice > max) {
          return false;
        }
      }
      
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
