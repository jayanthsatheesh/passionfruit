import { Product } from '@/types';

export interface ProductCSVRow {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  model: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  experienceLevel: 'explorer' | 'aspiring' | 'pro';
  weeklyPrice: string;
  monthlyPrice: string;
  discount: string;
  discountType: 'percentage' | 'fixed';
  tax: string;
  taxType: 'percentage' | 'fixed';
  primaryImage: string;
  additionalImages: string;
  unitOfMeasurement: string;
  stockQuantity: string;
  features: string;
  included: string;
  tags: string;
  dimensions: string;
  securityDeposit: string;
  insurance: string;
  minimumRentalDays: string;
  maximumRentalDays: string;
  deliveryOptions: string;
  restrictions: string;
  available: string;
}

export function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

export function parseCSVToProducts(csvText: string): Product[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];
  
  const headers = parseCSVLine(lines[0]);
  const products: Product[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length !== headers.length) continue;
    
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    try {
      const product = {
        id: row.id,
        name: row.name,
        description: row.description,
        category: row.category,
        subcategory: row.subcategory,
        price: parseInt(row.weeklyPrice) || 0,
        weeklyPrice: parseInt(row.weeklyPrice) || 0,
        monthlyPrice: parseInt(row.monthlyPrice) || 0,
        image: row.primaryImage,
        features: row.features ? row.features.split('|').map(f => f.trim()) : [],
        included: row.included ? row.included.split('|').map(i => i.trim()) : [],
        tags: row.tags ? row.tags.split('|').map(t => t.trim()) : [],
        experienceLevel: row.experienceLevel as 'explorer' | 'aspiring' | 'pro',
        rating: 4.5,
        reviewCount: Math.floor(Math.random() * 100) + 10,
        available: row.available === 'true',
        specs: parseDimensions(row.dimensions),
        // Additional fields from CSV stored as any for flexibility
        ...(row.brand && { brand: row.brand }),
        ...(row.model && { model: row.model }),
        ...(row.condition && { condition: row.condition }),
        ...(row.discount && { discount: parseFloat(row.discount) || 0 }),
        ...(row.discountType && { discountType: row.discountType }),
        ...(row.tax && { tax: parseFloat(row.tax) || 18 }),
        ...(row.taxType && { taxType: row.taxType }),
        ...(row.additionalImages && { additionalImages: row.additionalImages.split('|').map(img => img.trim()) }),
        ...(row.unitOfMeasurement && { unitOfMeasurement: row.unitOfMeasurement }),
        ...(row.stockQuantity && { stockQuantity: parseInt(row.stockQuantity) || 1 }),
        ...(row.securityDeposit && { securityDeposit: parseInt(row.securityDeposit) || 0 }),
        ...(row.insurance && { insurance: parseInt(row.insurance) || 0 }),
        ...(row.minimumRentalDays && { minimumRentalDays: parseInt(row.minimumRentalDays) || 1 }),
        ...(row.maximumRentalDays && { maximumRentalDays: parseInt(row.maximumRentalDays) || 30 }),
        ...(row.deliveryOptions && { deliveryOptions: row.deliveryOptions.split('|').map(d => d.trim()) }),
        ...(row.restrictions && { restrictions: row.restrictions.split('|').map(r => r.trim()) })
      } as Product;
      
      products.push(product);
    } catch (error) {
      console.warn(`Failed to parse product row ${i}:`, error);
    }
  }
  
  return products;
}

function parseDimensions(dimensionsStr: string): Record<string, string> {
  if (!dimensionsStr) return {};
  
  const specs: Record<string, string> = {};
  
  // Parse formats like "24x12x7cm, 650g" or "80x35x30cm, 2.1kg"
  if (dimensionsStr.includes(',')) {
    const [dimensions, weight] = dimensionsStr.split(',').map(s => s.trim());
    
    // Parse dimensions like "24x12x7cm"
    if (dimensions.includes('x')) {
      const [length, width, height] = dimensions.replace(/cm|mm|m/gi, '').split('x');
      if (length) specs['Length'] = `${length.trim()}cm`;
      if (width) specs['Width'] = `${width.trim()}cm`;
      if (height) specs['Height'] = `${height.trim()}cm`;
    }
    
    // Parse weight
    if (weight) {
      specs['Weight'] = weight;
    }
  }
  
  return specs;
}

export async function loadProductsFromCSV(): Promise<Product[]> {
  try {
    // Try to load from CSV first
    const response = await fetch('/products.csv');
    if (response.ok) {
      const csvText = await response.text();
      const products = parseCSVToProducts(csvText);
      console.log(`Loaded ${products.length} products from CSV`);
      return products;
    }
  } catch (error) {
    console.warn('Failed to load products from CSV:', error);
  }
  
  // Fallback to JSON if CSV fails
  try {
    const jsonResponse = await fetch('/src/data/products.json');
    if (jsonResponse.ok) {
      const jsonProducts = await jsonResponse.json();
      console.log(`Loaded ${jsonProducts.length} products from JSON fallback`);
      return jsonProducts;
    }
  } catch (error) {
    console.warn('Failed to load products from JSON:', error);
  }
  
  return [];
}