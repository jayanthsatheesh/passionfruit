import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Camera, Music, Mountain, Laptop, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import ProductRequestForm from '@/components/ProductRequestForm';
import { productService } from '@/lib/products';
import { Product, FilterState } from '@/types';
import { useLocation } from 'wouter';

export default function Home() {
  const [location, navigate] = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    experienceLevels: [],
    priceRange: [0, 10000],
    search: ''
  });
  const [sortBy, setSortBy] = useState('recommended');

  // Parse search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
      setFilters(prev => ({ ...prev, search: searchQuery }));
    }
  }, [location]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: productService.getAllProducts,
  });

  const categories = [
    { id: 'photography', name: 'Photography', icon: Camera, description: 'Cameras, Lenses, Lighting' },
    { id: 'music', name: 'Music', icon: Music, description: 'Instruments, Audio Gear' },
    { id: 'adventure', name: 'Adventure', icon: Mountain, description: 'Outdoor, Sports Gear' },
    { id: 'tech', name: 'Tech', icon: Laptop, description: 'Gaming, VR, Gadgets' },
  ];

  const subcategories = [
    'Digital Cameras', 'Drones', 'Gaming Consoles', 'VR Headsets',
    'Musical Instruments', 'DJ & Studio Gear', 'Camping Equipment',
    'Trekking & Hiking Gear', 'Riding Gear'
  ];

  const experienceLevels = ['explorer', 'aspiring', 'pro'];

  // Filter products based on current filters
  const filteredProducts = products.filter(product => {
    // Search filter - check name, category, subcategory, description, and tags
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const searchMatches = 
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.subcategory?.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchLower)));
      
      if (!searchMatches) {
        return false;
      }
    }

    // Category filter - match against both product category and the selected filter categories
    if (filters.categories.length > 0) {
      const productCategory = product.category.toLowerCase();
      const hasMatchingCategory = filters.categories.some(filterCategory => {
        // Map display categories to product categories
        const categoryMapping: Record<string, string> = {
          'photography': 'photography',
          'music': 'music',
          'adventure': 'adventure',
          'tech': 'tech'
        };
        return productCategory === categoryMapping[filterCategory] || productCategory === filterCategory;
      });
      
      if (!hasMatchingCategory) {
        return false;
      }
    }

    // Experience level filter
    if (filters.experienceLevels.length > 0 && !filters.experienceLevels.includes(product.experienceLevel)) {
      return false;
    }

    // Price range filter
    if (product.weeklyPrice < filters.priceRange[0] || product.weeklyPrice > filters.priceRange[1]) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.weeklyPrice - b.weeklyPrice;
      case 'price-high':
        return b.weeklyPrice - a.weeklyPrice;
      case 'popular':
        return b.reviewCount - a.reviewCount;
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  const handleCategoryFilter = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleExperienceFilter = (level: string) => {
    setFilters(prev => ({
      ...prev,
      experienceLevels: prev.experienceLevels.includes(level)
        ? prev.experienceLevels.filter(l => l !== level)
        : [...prev.experienceLevels, level]
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      experienceLevels: [],
      priceRange: [0, 10000],
      search: ''
    });
    navigate('/');
  };

  const handleCategoryClick = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: [categoryId]
    }));
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Featured Categories */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="categories-title">
              Explore By Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect gear for your next creative project or adventure
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="bg-card rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                  data-testid={`category-${category.id}`}
                >
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Browse Gear */}
      <section id="explore" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="browse-title">
              Browse All Gear
            </h2>
            <p className="text-muted-foreground">Professional equipment for every passion project</p>
          </div>
          
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky-filters bg-card rounded-xl p-6 mb-8 lg:mb-0" data-testid="filters-sidebar">
                <h3 className="font-semibold mb-4 flex items-center justify-between">
                  Filters
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-primary hover:text-primary/80"
                    data-testid="clear-filters"
                  >
                    Clear All
                  </Button>
                </h3>
                
                {/* Search */}
                <div className="mb-6">
                  <Label htmlFor="filter-search" className="text-sm font-medium mb-2 block">
                    Search
                  </Label>
                  <div className="relative">
                    <Input
                      id="filter-search"
                      type="text"
                      placeholder="Search gear..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                      data-testid="filter-search"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                
                {/* Main Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`main-category-${category.id}`}
                          checked={filters.categories.includes(category.id)}
                          onCheckedChange={() => handleCategoryFilter(category.id)}
                          data-testid={`filter-category-${category.id}`}
                        />
                        <Label htmlFor={`main-category-${category.id}`} className="text-sm">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Experience Levels */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={`level-${level}`}
                          checked={filters.experienceLevels.includes(level)}
                          onCheckedChange={() => handleExperienceFilter(level)}
                          data-testid={`filter-level-${level}`}
                        />
                        <Label htmlFor={`level-${level}`} className="text-sm capitalize">
                          {level === 'explorer' ? 'Explorers' : 
                           level === 'aspiring' ? 'Aspiring Professionals' : 'Professionals'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range (per week)</h4>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [0, parseInt(e.target.value)]
                      }))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      data-testid="price-range-slider"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹0</span>
                      <span>₹{filters.priceRange[1].toLocaleString()}+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground" data-testid="results-count">
                  Showing {sortedProducts.length} of {products.length} items
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48" data-testid="sort-select">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Sort by: Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters */}
              {(filters.categories.length > 0 || filters.experienceLevels.length > 0 || filters.search) && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {filters.search && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Search: {filters.search}
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {filters.categories.map(category => (
                      <Badge key={category} variant="secondary" className="flex items-center gap-1">
                        {category}
                        <button
                          onClick={() => handleCategoryFilter(category)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {filters.experienceLevels.map(level => (
                      <Badge key={level} variant="secondary" className="flex items-center gap-1">
                        {level}
                        <button
                          onClick={() => handleExperienceFilter(level)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
                      <div className="w-full h-48 bg-muted animate-pulse" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="space-y-8">
                  <div className="text-center py-12" data-testid="no-results">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">No gear found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button onClick={clearFilters} data-testid="clear-filters-button">
                      Clear all filters
                    </Button>
                  </div>
                  
                  {/* Product Request Form for No Results */}
                  <div className="max-w-2xl mx-auto">
                    <ProductRequestForm variant="no-results" searchQuery={filters.search} />
                  </div>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" data-testid="products-grid">
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  
                  {/* Product Request Form - Always visible when products are shown */}
                  <div className="border-t pt-12">
                    <div className="max-w-2xl mx-auto">
                      <ProductRequestForm variant="default" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section id="promise" className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="promise-title">
              Our Promise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best rental experience for your creative projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-8 text-center" data-testid="promise-pro-checked">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl text-primary-foreground">✓</div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Pro-Checked</h3>
              <p className="text-muted-foreground">
                Every piece of gear undergoes a rigorous multi-point inspection to ensure it's spotless and fully functional. 
                No surprises, just flawless performance for your project.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 text-center" data-testid="promise-delivery">
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl text-foreground">🚚</div>
              </div>
              <h3 className="text-xl font-semibold mb-4">On-Time Delivery</h3>
              <p className="text-muted-foreground">
                Get your gear when you need it. We offer hyper-fast, reliable delivery and pickup across Bangalore, 
                so you can focus on creating, not waiting.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 text-center" data-testid="promise-transparent">
              <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl text-accent-foreground">👁</div>
              </div>
              <h3 className="text-xl font-semibold mb-4">No Hidden Fees</h3>
              <p className="text-muted-foreground">
                No hidden fees or confusing policies. What you see is what you pay. We believe in clear, 
                fair pricing and hassle-free deposits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="how-it-works-title">
              How it Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with professional gear in just four simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" data-testid="step-find">
              <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Your Gear</h3>
              <p className="text-muted-foreground">
                Browse our curated kits and pro-level gear to find the perfect fit for your project.
              </p>
            </div>
            
            <div className="text-center" data-testid="step-schedule">
              <div className="w-20 h-20 bg-secondary text-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Schedule Your Drop-off</h3>
              <p className="text-muted-foreground">
                Pick a time and place that works for you, and we'll deliver it right to your doorstep.
              </p>
            </div>
            
            <div className="text-center" data-testid="step-create">
              <div className="w-20 h-20 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Create & Enjoy</h3>
              <p className="text-muted-foreground">
                Bring your vision to life with reliable, top-quality equipment for your hobby or project.
              </p>
            </div>
            
            <div className="text-center" data-testid="step-pickup">
              <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-4">We Handle Pickup</h3>
              <p className="text-muted-foreground">
                When your rental period is over, we'll come and pick everything up. It's that easy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="cta-title">
            Have Questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="cta-subtitle">
            Our team is here to help you find the perfect gear for your next project.
          </p>
          <Button 
            size="lg" 
            className="px-8 py-4" 
            onClick={() => setShowLeadModal(true)}
            data-testid="cta-button"
          >
            Talk to Us
          </Button>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
      />
    </div>
  );
}
