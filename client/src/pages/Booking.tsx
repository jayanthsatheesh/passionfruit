import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Calendar, MapPin, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { productService } from '@/lib/products';
import { bookingService } from '@/lib/booking';
import { authService } from '@/lib/auth';

const bookingSchema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  phoneNumber: z.string().min(10, 'Please provide a valid mobile number'),
  deliveryAddress: z.string().min(10, 'Please provide a complete address'),
  specialInstructions: z.string().optional(),
  emergencyContact: z.string().min(10, 'Emergency contact is required'),
});

type BookingForm = z.infer<typeof bookingSchema>;

export default function Booking() {
  const { id } = useParams();
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'weekend' | 'week' | 'month'>('week');

  // Parse URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan') as 'weekend' | 'week' | 'month';
    const date = urlParams.get('date');
    
    if (plan) setSelectedPlan(plan);
    if (date) {
      const endDate = new Date(date);
      if (plan === 'weekend') endDate.setDate(endDate.getDate() + 2);
      else if (plan === 'week') endDate.setDate(endDate.getDate() + 7);
      else endDate.setDate(endDate.getDate() + 30);
      
      form.setValue('startDate', date);
      form.setValue('endDate', endDate.toISOString().split('T')[0]);
    }
  }, []);

  const { data: product, isLoading } = useQuery({
    queryKey: ['/api/products', id],
    queryFn: () => productService.getProductById(id!),
    enabled: !!id,
  });

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      startDate: '',
      endDate: '',
      phoneNumber: '',
      deliveryAddress: '',
      specialInstructions: '',
      emergencyContact: '',
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingForm) => {
      const user = authService.getCurrentUser();
      if (!user || !product) throw new Error('User or product not found');
      
      return await bookingService.createBooking(
        user,
        product,
        data.startDate,
        data.endDate,
        data.phoneNumber,
        data.deliveryAddress,
        data.emergencyContact,
        data.specialInstructions
      );
    },
    onSuccess: (booking) => {
      toast({
        title: 'Booking confirmed!',
        description: 'Your gear will be delivered soon.',
      });
      navigate(`/confirmation/${booking.id}`);
    },
    onError: (error) => {
      toast({
        title: 'Booking failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: BookingForm) => {
    createBookingMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-96 bg-muted rounded-xl" />
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-3/4" />
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
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const plans = [
    { id: 'weekend' as const, name: 'Weekend Try', duration: 2, price: Math.round(product.weeklyPrice * 0.3) },
    { id: 'week' as const, name: 'Try for a Week', duration: 7, price: product.weeklyPrice },
    { id: 'month' as const, name: 'Best Value', duration: 30, price: product.monthlyPrice },
  ];

  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const totalPrice = selectedPlanData?.price || 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(`/product/${id}`)}
          className="mb-6"
          data-testid="back-button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Product
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle data-testid="booking-title">Book Your Rental</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Rental Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        {...form.register('startDate')}
                        min={new Date().toISOString().split('T')[0]}
                        data-testid="start-date-input"
                      />
                      {form.formState.errors.startDate && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.startDate.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        {...form.register('endDate')}
                        min={new Date().toISOString().split('T')[0]}
                        data-testid="end-date-input"
                      />
                      {form.formState.errors.endDate && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.endDate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <Label htmlFor="phone-number">Mobile Number</Label>
                    <Input
                      id="phone-number"
                      type="tel"
                      {...form.register('phoneNumber')}
                      placeholder="Enter your mobile number"
                      data-testid="phone-number-input"
                    />
                    {form.formState.errors.phoneNumber && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <Label htmlFor="delivery-address">Delivery Address</Label>
                    <Textarea
                      id="delivery-address"
                      {...form.register('deliveryAddress')}
                      placeholder="Enter your complete delivery address including landmark"
                      rows={3}
                      data-testid="delivery-address-input"
                    />
                    {form.formState.errors.deliveryAddress && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.deliveryAddress.message}
                      </p>
                    )}
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <Label htmlFor="emergency-contact">Emergency Contact</Label>
                    <Input
                      id="emergency-contact"
                      type="tel"
                      {...form.register('emergencyContact')}
                      placeholder="Emergency contact number"
                      data-testid="emergency-contact-input"
                    />
                    {form.formState.errors.emergencyContact && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.emergencyContact.message}
                      </p>
                    )}
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <Label htmlFor="special-instructions">Special Instructions (Optional)</Label>
                    <Textarea
                      id="special-instructions"
                      {...form.register('specialInstructions')}
                      placeholder="Any special handling or delivery instructions"
                      rows={2}
                      data-testid="special-instructions-input"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={createBookingMutation.isPending}
                    data-testid="confirm-booking-button"
                  >
                    {createBookingMutation.isPending ? 'Processing...' : `Confirm Booking - ₹${totalPrice.toLocaleString()}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle data-testid="order-summary-title">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Product Info */}
                  <div className="flex gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold" data-testid="product-name">
                        {product.name}
                      </h3>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        ✓ Certified Ready
                      </Badge>
                    </div>
                  </div>

                  {/* Rental Plan */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Rental Plan:</span>
                      <span data-testid="selected-plan">{selectedPlanData?.name}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{selectedPlanData?.duration} days</span>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Rental Fee:</span>
                      <span data-testid="rental-fee">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Deposit:</span>
                      <span className="text-muted-foreground">₹0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span className="text-muted-foreground">Free</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span data-testid="total-price">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Same-day delivery available</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Free delivery in Bangalore</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CreditCard className="w-4 h-4" />
                      <span>Pay on delivery</span>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">What's Included:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {product.included.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-accent rounded-full mr-2" />
                          {item}
                        </li>
                      ))}
                      {product.included.length > 3 && (
                        <li className="text-primary">
                          +{product.included.length - 3} more items
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
