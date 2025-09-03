import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Calendar, MapPin, Phone, Mail, Edit, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/lib/auth';
import { bookingService } from '@/lib/booking';
import { productService } from '@/lib/data';
import { useLocation } from 'wouter';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  pincode: z.string().min(6, 'Please enter a valid pincode'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/signin');
    }
  }, [navigate]);

  const user = authService.getCurrentUser();

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      pincode: user?.pincode || '',
    },
  });

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['/api/bookings', user?.id],
    queryFn: () => user ? bookingService.getUserBookings(user.id) : [],
    enabled: !!user,
  });

  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: () => {
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ProfileForm) => {
    updateProfileMutation.mutate(data);
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-accent text-accent-foreground';
      case 'active':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" data-testid="profile-name">
                {user.name}
              </h1>
              <p className="text-muted-foreground" data-testid="profile-email">
                {user.email}
              </p>
              <Badge variant="secondary" className="mt-2">
                Member since {new Date().getFullYear()}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" data-testid="profile-tab">
              Profile Details
            </TabsTrigger>
            <TabsTrigger value="bookings" data-testid="bookings-tab">
              My Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      data-testid="edit-profile-button"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          {...form.register('name')}
                          data-testid="name-input"
                        />
                        {form.formState.errors.name && (
                          <p className="text-sm text-destructive mt-1">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register('email')}
                          data-testid="email-input"
                        />
                        {form.formState.errors.email && (
                          <p className="text-sm text-destructive mt-1">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...form.register('phone')}
                          data-testid="phone-input"
                        />
                        {form.formState.errors.phone && (
                          <p className="text-sm text-destructive mt-1">
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          {...form.register('pincode')}
                          data-testid="pincode-input"
                        />
                        {form.formState.errors.pincode && (
                          <p className="text-sm text-destructive mt-1">
                            {form.formState.errors.pincode.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                        data-testid="save-profile-button"
                      >
                        {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          form.reset();
                        }}
                        data-testid="cancel-edit-button"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Full Name</div>
                          <div className="text-muted-foreground" data-testid="display-name">
                            {user.name}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Email</div>
                          <div className="text-muted-foreground" data-testid="display-email">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Phone</div>
                          <div className="text-muted-foreground" data-testid="display-phone">
                            {user.phone || 'Not provided'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Pincode</div>
                          <div className="text-muted-foreground" data-testid="display-pincode">
                            {user.pincode || 'Not provided'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  My Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4 space-y-3">
                        <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
                        <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
                        <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-12" data-testid="no-bookings">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start exploring our gear collection to make your first booking.
                    </p>
                    <Button onClick={() => navigate('/')} data-testid="browse-gear-button">
                      Browse Gear
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4" data-testid="bookings-list">
                    {bookings.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Booking Card Component
function BookingCard({ booking }: { booking: any }) {
  const { data: product } = useQuery({
    queryKey: ['/api/products', booking.productId],
    queryFn: () => productService.getProduct(booking.productId),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-accent text-accent-foreground';
      case 'active':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);

  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors" data-testid={`booking-${booking.id}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {product && (
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
          )}
          <div>
            <h3 className="font-semibold" data-testid="booking-product-name">
              {product?.name || 'Loading...'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Booking #{booking.id.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
        <Badge className={getStatusColor(booking.status)} data-testid="booking-status">
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <div className="font-medium flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Duration
          </div>
          <div className="text-muted-foreground">
            {booking.duration} days
          </div>
        </div>
        <div>
          <div className="font-medium">Start Date</div>
          <div className="text-muted-foreground" data-testid="booking-start-date">
            {startDate.toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="font-medium">End Date</div>
          <div className="text-muted-foreground" data-testid="booking-end-date">
            {endDate.toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="font-medium">Total</div>
          <div className="text-muted-foreground" data-testid="booking-total">
            ₹{booking.totalPrice.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
