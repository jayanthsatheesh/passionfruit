import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Calendar, Upload, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { productService } from '@/lib/products';
import { Product } from '@/types';

interface ProductForm {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  weeklyPrice: number;
  monthlyPrice: number;
  discount: number;
  discountType: 'percentage' | 'fixed';
  tax: number;
  taxType: 'percentage' | 'fixed';
  images: string[];
  primaryImage: string;
  unitOfMeasurement: string;
  features: string[];
  included: string[];
  specs: Record<string, string>;
  experienceLevel: 'explorer' | 'aspiring' | 'pro';
  tags: string[];
  available: boolean;
  stockQuantity: number;
  brand: string;
  model: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  dimensions: {
    length: string;
    width: string;
    height: string;
    weight: string;
  };
  insurance: number;
  securityDeposit: number;
  minimumRentalDays: number;
  maximumRentalDays: number;
  deliveryOptions: string[];
  restrictions: string[];
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ProductForm>({
    id: '',
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: 0,
    weeklyPrice: 0,
    monthlyPrice: 0,
    discount: 0,
    discountType: 'percentage',
    tax: 18, // Default GST in India
    taxType: 'percentage',
    images: [],
    primaryImage: '',
    unitOfMeasurement: 'piece',
    features: [],
    included: [],
    specs: {},
    experienceLevel: 'explorer',
    tags: [],
    available: true,
    stockQuantity: 1,
    brand: '',
    model: '',
    condition: 'like-new',
    dimensions: {
      length: '',
      width: '',
      height: '',
      weight: ''
    },
    insurance: 0,
    securityDeposit: 0,
    minimumRentalDays: 1,
    maximumRentalDays: 30,
    deliveryOptions: ['pickup', 'delivery'],
    restrictions: []
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: productService.getAllProducts,
  });

  // Check admin access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('passionfruit_user') || '{}');
    if (!user.email || !['jayant.svnit@gmail.com', 'shanker87@gmail.com'].includes(user.email)) {
      window.location.href = '/';
    }
  }, []);

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      category: '',
      subcategory: '',
      price: 0,
      weeklyPrice: 0,
      monthlyPrice: 0,
      discount: 0,
      discountType: 'percentage',
      tax: 18,
      taxType: 'percentage',
      images: [],
      primaryImage: '',
      unitOfMeasurement: 'piece',
      features: [],
      included: [],
      specs: {},
      experienceLevel: 'explorer',
      tags: [],
      available: true,
      stockQuantity: 1,
      brand: '',
      model: '',
      condition: 'like-new',
      dimensions: {
        length: '',
        width: '',
        height: '',
        weight: ''
      },
      insurance: 0,
      securityDeposit: 0,
      minimumRentalDays: 1,
      maximumRentalDays: 30,
      deliveryOptions: ['pickup', 'delivery'],
      restrictions: []
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      weeklyPrice: product.weeklyPrice,
      monthlyPrice: product.monthlyPrice,
      discount: (product as any).discount || 0,
      discountType: (product as any).discountType || 'percentage',
      tax: (product as any).tax || 18,
      taxType: (product as any).taxType || 'percentage',
      images: (product as any).images || [product.image],
      primaryImage: product.image,
      unitOfMeasurement: (product as any).unitOfMeasurement || 'piece',
      features: product.features || [],
      included: product.included || [],
      specs: product.specs || {},
      experienceLevel: product.experienceLevel,
      tags: product.tags || [],
      available: product.available,
      stockQuantity: (product as any).stockQuantity || 1,
      brand: (product as any).brand || '',
      model: (product as any).model || '',
      condition: (product as any).condition || 'like-new',
      dimensions: (product as any).dimensions || {
        length: '',
        width: '',
        height: '',
        weight: ''
      },
      insurance: (product as any).insurance || 0,
      securityDeposit: (product as any).securityDeposit || 0,
      minimumRentalDays: (product as any).minimumRentalDays || 1,
      maximumRentalDays: (product as any).maximumRentalDays || 30,
      deliveryOptions: (product as any).deliveryOptions || ['pickup', 'delivery'],
      restrictions: (product as any).restrictions || []
    });
    setEditingProduct(product.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.weeklyPrice || !formData.description) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields (Name, Category, Weekly Price, Description)',
        variant: 'destructive'
      });
      return;
    }

    // Save to localStorage for now (in a real app, this would be an API call)
    const currentProducts = JSON.parse(localStorage.getItem('passionfruit_admin_products') || '[]');
    const productIndex = currentProducts.findIndex((p: Product) => p.id === formData.id);
    
    const productToSave = {
      ...formData,
      id: formData.id || `product_${Date.now()}`,
      image: formData.primaryImage || formData.images[0] || '',
      rating: 4.5,
      reviewCount: 0
    };

    if (productIndex >= 0) {
      currentProducts[productIndex] = productToSave;
    } else {
      currentProducts.push(productToSave);
    }

    localStorage.setItem('passionfruit_admin_products', JSON.stringify(currentProducts));
    
    toast({
      title: 'Success',
      description: editingProduct ? 'Product updated successfully' : 'Product added successfully'
    });

    resetForm();
    queryClient.invalidateQueries({ queryKey: ['/api/products'] });
  };

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const currentProducts = JSON.parse(localStorage.getItem('passionfruit_admin_products') || '[]');
      const updatedProducts = currentProducts.filter((p: Product) => p.id !== productId);
      localStorage.setItem('passionfruit_admin_products', JSON.stringify(updatedProducts));
      
      toast({
        title: 'Success',
        description: 'Product deleted successfully'
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    }
  };

  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: 'features' | 'included' | 'tags' | 'images' | 'deliveryOptions' | 'restrictions', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const removeArrayItem = (field: 'features' | 'included' | 'tags' | 'images' | 'deliveryOptions' | 'restrictions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateDimension = (dimension: keyof typeof formData.dimensions, value: string) => {
    setFormData(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-muted-foreground">Manage your gear catalog</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Basic Information</h3>
                    
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormField('name', e.target.value)}
                        placeholder="Canon EOS R7"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Product Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => updateFormField('description', e.target.value)}
                        rows={4}
                        placeholder="Professional camera with advanced features..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                          id="brand"
                          value={formData.brand}
                          onChange={(e) => updateFormField('brand', e.target.value)}
                          placeholder="Canon"
                        />
                      </div>
                      <div>
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          value={formData.model}
                          onChange={(e) => updateFormField('model', e.target.value)}
                          placeholder="EOS R7"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => updateFormField('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Photography">Photography</SelectItem>
                            <SelectItem value="Music">Music</SelectItem>
                            <SelectItem value="Adventure">Adventure</SelectItem>
                            <SelectItem value="Tech">Tech</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="subcategory">Subcategory</Label>
                        <Input
                          id="subcategory"
                          value={formData.subcategory}
                          onChange={(e) => updateFormField('subcategory', e.target.value)}
                          placeholder="Digital Cameras"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="condition">Condition</Label>
                        <Select value={formData.condition} onValueChange={(value) => updateFormField('condition', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="like-new">Like New</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="experienceLevel">Experience Level</Label>
                        <Select value={formData.experienceLevel} onValueChange={(value) => updateFormField('experienceLevel', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="explorer">Explorer</SelectItem>
                            <SelectItem value="aspiring">Aspiring</SelectItem>
                            <SelectItem value="pro">Pro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="unitOfMeasurement">Unit of Measurement</Label>
                        <Select value={formData.unitOfMeasurement} onValueChange={(value) => updateFormField('unitOfMeasurement', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="piece">Piece</SelectItem>
                            <SelectItem value="set">Set</SelectItem>
                            <SelectItem value="kit">Kit</SelectItem>
                            <SelectItem value="pair">Pair</SelectItem>
                            <SelectItem value="package">Package</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="stockQuantity">Stock Quantity</Label>
                        <Input
                          id="stockQuantity"
                          type="number"
                          value={formData.stockQuantity}
                          onChange={(e) => updateFormField('stockQuantity', parseInt(e.target.value) || 0)}
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Middle Column - Pricing & Images */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Pricing & Images</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="weeklyPrice">Weekly Price (₹) *</Label>
                        <Input
                          id="weeklyPrice"
                          type="number"
                          value={formData.weeklyPrice}
                          onChange={(e) => updateFormField('weeklyPrice', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="monthlyPrice">Monthly Price (₹)</Label>
                        <Input
                          id="monthlyPrice"
                          type="number"
                          value={formData.monthlyPrice}
                          onChange={(e) => updateFormField('monthlyPrice', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="discount">Discount</Label>
                        <Input
                          id="discount"
                          type="number"
                          value={formData.discount}
                          onChange={(e) => updateFormField('discount', parseFloat(e.target.value) || 0)}
                          min="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="discountType">Type</Label>
                        <Select value={formData.discountType} onValueChange={(value) => updateFormField('discountType', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">%</SelectItem>
                            <SelectItem value="fixed">₹</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tax">Tax ({formData.taxType === 'percentage' ? '%' : '₹'})</Label>
                        <Input
                          id="tax"
                          type="number"
                          value={formData.tax}
                          onChange={(e) => updateFormField('tax', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                        <Input
                          id="securityDeposit"
                          type="number"
                          value={formData.securityDeposit}
                          onChange={(e) => updateFormField('securityDeposit', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="insurance">Insurance (₹)</Label>
                        <Input
                          id="insurance"
                          type="number"
                          value={formData.insurance}
                          onChange={(e) => updateFormField('insurance', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="primaryImage">Primary Image URL</Label>
                      <Input
                        id="primaryImage"
                        value={formData.primaryImage}
                        onChange={(e) => updateFormField('primaryImage', e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div>
                      <Label>Additional Images</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add image URL"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('images', e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            addArrayItem('images', input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {formData.images.map((image, index) => (
                          <Badge key={index} variant="secondary" className="cursor-pointer text-xs" onClick={() => removeArrayItem('images', index)}>
                            Image {index + 1} ×
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <Label htmlFor="length">Length</Label>
                        <Input
                          id="length"
                          value={formData.dimensions.length}
                          onChange={(e) => updateDimension('length', e.target.value)}
                          placeholder="cm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="width">Width</Label>
                        <Input
                          id="width"
                          value={formData.dimensions.width}
                          onChange={(e) => updateDimension('width', e.target.value)}
                          placeholder="cm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          value={formData.dimensions.height}
                          onChange={(e) => updateDimension('height', e.target.value)}
                          placeholder="cm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                          id="weight"
                          value={formData.dimensions.weight}
                          onChange={(e) => updateDimension('weight', e.target.value)}
                          placeholder="kg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Features & Settings */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Features & Settings</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="minRentalDays">Min Rental Days</Label>
                        <Input
                          id="minRentalDays"
                          type="number"
                          value={formData.minimumRentalDays}
                          onChange={(e) => updateFormField('minimumRentalDays', parseInt(e.target.value) || 1)}
                          min="1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxRentalDays">Max Rental Days</Label>
                        <Input
                          id="maxRentalDays"
                          type="number"
                          value={formData.maximumRentalDays}
                          onChange={(e) => updateFormField('maximumRentalDays', parseInt(e.target.value) || 30)}
                          min="1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Features</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add feature"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('features', e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            addArrayItem('features', input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {formData.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeArrayItem('features', index)}>
                            {feature} ×
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>What's Included</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add included item"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('included', e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            addArrayItem('included', input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {formData.included.map((item, index) => (
                          <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeArrayItem('included', index)}>
                            {item} ×
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Search Tags</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add tag"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('tags', e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            addArrayItem('tags', input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {formData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeArrayItem('tags', index)}>
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Delivery Options</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add delivery option"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('deliveryOptions', e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            addArrayItem('deliveryOptions', input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {formData.deliveryOptions.map((option, index) => (
                          <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeArrayItem('deliveryOptions', index)}>
                            {option} ×
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Restrictions/Requirements</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add restriction"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('restrictions', e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            addArrayItem('restrictions', input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {formData.restrictions.map((restriction, index) => (
                          <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeArrayItem('restrictions', index)}>
                            {restriction} ×
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <Label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.available}
                          onChange={(e) => updateFormField('available', e.target.checked)}
                        />
                        Available for Rent
                      </Label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave} className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        {editingProduct ? 'Update' : 'Save'} Product
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant={product.available ? "default" : "destructive"}>
                    {product.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{product.category} • {product.subcategory}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">₹{product.weeklyPrice}/week</span>
                  <Badge variant="outline">{product.experienceLevel}</Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  {(product as any).brand && (product as any).model && (
                    <span>{(product as any).brand} {(product as any).model} • </span>
                  )}
                  Stock: {(product as any).stockQuantity || 1}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)} className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}