import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import { productService } from '@/lib/products';

export function useProducts() {
  return useQuery({
    queryKey: ['/api/products'],
    queryFn: () => productService.getAllProducts(),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['/api/products', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['/api/products', 'featured'],
    queryFn: () => productService.getFeaturedProducts(),
  });
}

export function useFilteredProducts(filters: {
  category?: string;
  experienceLevel?: string[];
  priceRange?: [number, number];
  search?: string;
}) {
  return useQuery({
    queryKey: ['/api/products', 'filtered', filters],
    queryFn: () => productService.filterProducts(filters),
  });
}
