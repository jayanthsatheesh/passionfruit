import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { sendProductRequestEmail } from '@/lib/emailjs';

const productRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid mobile number'),
  productName: z.string().min(3, 'Please describe what you\'re looking for'),
  category: z.string().min(2, 'Please specify a category'),
  description: z.string().min(10, 'Please provide more details about what you need'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

type ProductRequestForm = z.infer<typeof productRequestSchema>;

interface ProductRequestFormProps {
  variant?: 'default' | 'no-results';
  searchQuery?: string;
}

export default function ProductRequestForm({ variant = 'default', searchQuery }: ProductRequestFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProductRequestForm>({
    resolver: zodResolver(productRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      productName: searchQuery || '',
      category: '',
      description: '',
      budget: '',
      timeline: '',
    },
  });

  const onSubmit = async (data: ProductRequestForm) => {
    setIsLoading(true);
    try {
      const emailSent = await sendProductRequestEmail(data);
      
      if (!emailSent) {
        throw new Error('Failed to send product request');
      }

      toast({
        title: 'Request submitted!',
        description: 'We\'ll get back to you soon with product options.',
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Failed to send request',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const title = variant === 'no-results' 
    ? "Let us find it for you!" 
    : "Couldn't Find What You Were Looking For?";
    
  const description = variant === 'no-results'
    ? "We didn't find any products matching your search, but we might have exactly what you need in our extended inventory."
    : "We have access to a much larger inventory than what's listed online. Tell us what you need and we'll source it for you!";

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid={`product-request-${variant}`}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Search className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl" data-testid="product-request-title">
          {title}
        </CardTitle>
        <p className="text-muted-foreground">
          {description}
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="request-name">Your Name</Label>
              <Input
                id="request-name"
                {...form.register('name')}
                placeholder="Enter your name"
                data-testid="request-name-input"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="request-phone">Mobile Number</Label>
              <Input
                id="request-phone"
                type="tel"
                {...form.register('phone')}
                placeholder="Your mobile number"
                data-testid="request-phone-input"
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="request-email">Email Address</Label>
            <Input
              id="request-email"
              type="email"
              {...form.register('email')}
              placeholder="your.email@example.com"
              data-testid="request-email-input"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="request-product">Product/Equipment Name</Label>
              <Input
                id="request-product"
                {...form.register('productName')}
                placeholder="e.g., Sony A7IV, DJI Mavic Pro"
                data-testid="request-product-input"
              />
              {form.formState.errors.productName && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.productName.message}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="request-category">Category</Label>
              <Input
                id="request-category"
                {...form.register('category')}
                placeholder="e.g., Photography, Music, Adventure"
                data-testid="request-category-input"
              />
              {form.formState.errors.category && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="request-description">Detailed Description</Label>
            <Textarea
              id="request-description"
              {...form.register('description')}
              placeholder="Tell us more about what you need, including any specific features, brand preferences, or use case..."
              rows={4}
              data-testid="request-description-input"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="request-budget">Budget Range (Optional)</Label>
              <Input
                id="request-budget"
                {...form.register('budget')}
                placeholder="e.g., ₹500-1000 per day"
                data-testid="request-budget-input"
              />
            </div>
            
            <div>
              <Label htmlFor="request-timeline">When do you need it? (Optional)</Label>
              <Input
                id="request-timeline"
                {...form.register('timeline')}
                placeholder="e.g., Next weekend, March 15th"
                data-testid="request-timeline-input"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
            data-testid="submit-product-request-button"
          >
            {isLoading ? (
              'Sending Request...'
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Product Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}