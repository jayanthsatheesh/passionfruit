import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div 
        className="product-card bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:border-primary/20 cursor-pointer"
        data-testid={`product-card-${product.id}`}
      >
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="absolute top-3 right-3">
            <Badge 
              variant="secondary" 
              className="bg-accent text-accent-foreground"
              data-testid="certified-badge"
            >
              ✓ Certified Ready
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 
            className="font-semibold mb-2" 
            data-testid={`product-name-${product.id}`}
          >
            {product.name}
          </h3>
          <p 
            className="text-sm text-muted-foreground mb-2"
            data-testid={`product-features-${product.id}`}
          >
            Perfect for: {product.features.join(', ')}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">From </span>
              <span 
                className="font-semibold" 
                data-testid={`product-price-${product.id}`}
              >
                ₹{product.weeklyPrice.toLocaleString()}/week
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-primary hover:text-primary/80"
              data-testid={`product-details-${product.id}`}
            >
              Know more
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
