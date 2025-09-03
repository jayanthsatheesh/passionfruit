import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, CheckCircle, Clock, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { productService } from '@/lib/products';
import { authService } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetails() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'weekend' | 'week' | 'month'>('month');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'included' | 'specs' | 'guarantee'>('included');

  const { data: product, isLoading } = useQuery({
    queryKey: ['/api/products', id],
    queryFn: () => productService.getProductById(id!),
    enabled: !!id,
  });

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-96 bg-muted rounded-xl" />
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-32 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const plans = [
    { id: 'weekend' as const, name: 'Weekend Try', duration: '2 days', price: Math.round(product.weeklyPrice * 0.3) },
    { id: 'week' as const, name: 'Try for a Week', duration: '7 days', price: product.weeklyPrice },
    { id: 'month' as const, name: 'Best Value', duration: '30 days', price: product.monthlyPrice },
  ];

  const handleRentNow = () => {
    if (!authService.isAuthenticated()) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to book gear.',
        variant: 'destructive',
      });
      navigate('/signin');
      return;
    }

    if (!selectedDate) {
      toast({
        title: 'Date required',
        description: 'Please select a rental start date.',
        variant: 'destructive',
      });
      return;
    }

    navigate(`/booking/${product.id}?plan=${selectedPlan}&date=${selectedDate}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
          data-testid="back-button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full rounded-xl mb-4"
              data-testid="main-product-image"
            />
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} angle ${index + 1}`}
                  className={`w-full aspect-square object-cover rounded-lg cursor-pointer transition-all ${
                    selectedImage === index ? 'ring-2 ring-primary' : 'hover:opacity-80'
                  }`}
                  onClick={() => setSelectedImage(index)}
                  data-testid={`product-thumbnail-${index}`}
                />
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4" data-testid="product-title">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  ✓ Certified Ready
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-4" data-testid="product-description">
                {product.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {product.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Rental Plans */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Choose Your Rental Plan</h3>
              <div className="grid grid-cols-3 gap-3">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`border-2 rounded-lg p-3 text-center transition-colors ${
                      selectedPlan === plan.id
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                    data-testid={`plan-${plan.id}`}
                  >
                    <div className="text-sm font-medium">{plan.name}</div>
                    <div className="text-xs opacity-90 mt-1">{plan.duration}</div>
                    <div className="text-sm font-semibold mt-1">₹{plan.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Date Picker */}
            <div className="mb-6">
              <Label htmlFor="rental-date" className="text-sm font-medium mb-2 block">
                Check Availability for:
              </Label>
              <Input
                id="rental-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                data-testid="date-picker"
              />
            </div>
            
            {/* Rent Button */}
            <Button
              onClick={handleRentNow}
              className="w-full mb-4"
              size="lg"
              disabled={!selectedDate}
              data-testid="rent-now-button"
            >
              Rent Now for ₹{plans.find(p => p.id === selectedPlan)?.price.toLocaleString()}
            </Button>
            
            {/* Guarantees */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-accent mr-1" />
                <span>Certified Ready</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-accent mr-1" />
                <span>On-Time Delivery</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 text-accent mr-1" />
                <span>Transparent Pricing</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8">
              {[
                { id: 'included' as const, label: "What's Included" },
                { id: 'specs' as const, label: 'Full Specs' },
                { id: 'guarantee' as const, label: 'Our Guarantee' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid={`tab-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === 'included' && (
              <div data-testid="tab-content-included">
                <p className="text-muted-foreground mb-6">
                  We believe in transparency, so you know exactly what to expect. This kit includes:
                </p>
                <ul className="grid md:grid-cols-2 gap-3">
                  {product.included.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'specs' && (
              <div data-testid="tab-content-specs">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-4">Technical Specifications</h4>
                    <dl className="space-y-3">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-border pb-2">
                          <dt className="text-muted-foreground font-medium">{key}:</dt>
                          <dd className="text-right">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'guarantee' && (
              <div className="space-y-6" data-testid="tab-content-guarantee">
                <div>
                  <h4 className="font-medium mb-2">Pro-Checked Quality</h4>
                  <p className="text-muted-foreground">
                    Every item undergoes our rigorous 12-point inspection process to ensure perfect functionality and cleanliness.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Damage Protection</h4>
                  <p className="text-muted-foreground">
                    Minor wear and tear is covered. We only charge for major damage or loss, and we'll always communicate costs upfront.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Support Guarantee</h4>
                  <p className="text-muted-foreground">
                    24/7 support throughout your rental period. If anything goes wrong, we'll make it right immediately.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
