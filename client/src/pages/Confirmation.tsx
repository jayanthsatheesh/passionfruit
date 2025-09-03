import { useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Calendar, MapPin, Phone, ArrowLeft, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { bookingService } from '@/lib/booking';
import { productService } from '@/lib/data';

export default function Confirmation() {
  const { bookingId } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Set page title
    document.title = 'Booking Confirmed - PassionFruit';
  }, []);

  const { data: booking, isLoading: bookingLoading } = useQuery({
    queryKey: ['/api/bookings', bookingId],
    queryFn: () => bookingService.getBookingById(bookingId!),
    enabled: !!bookingId,
  });

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['/api/products', booking?.productId],
    queryFn: () => productService.getProduct(booking!.productId),
    enabled: !!booking?.productId,
  });

  const isLoading = bookingLoading || productLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-64 bg-muted rounded-xl" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-48 bg-muted rounded-xl" />
              <div className="h-48 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The booking you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PassionFruit Booking Confirmed',
          text: `I just booked ${product.name} from PassionFruit!`,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: 'Link copied!',
          description: 'Booking link copied to clipboard.',
        });
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Booking link copied to clipboard.',
      });
    }
  };

  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="confirmation-title">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="confirmation-subtitle">
            Your gear is on its way. We'll contact you soon with delivery details.
          </p>
        </div>

        {/* Booking Details */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle data-testid="booking-details-title">Booking Details</CardTitle>
              <Badge 
                variant="secondary" 
                className="bg-primary text-primary-foreground"
                data-testid="booking-status"
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Info */}
              <div>
                <div className="flex gap-4 mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2" data-testid="product-name">
                      {product.name}
                    </h3>
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      ✓ Certified Ready
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Rental Period</div>
                      <div className="text-sm text-muted-foreground" data-testid="rental-dates">
                        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ({booking.duration} days)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <div className="font-medium">Delivery Address</div>
                      <div className="text-sm text-muted-foreground" data-testid="delivery-address">
                        {booking.deliveryAddress}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div>
                <div className="bg-muted rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Order Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Booking ID:</span>
                      <span className="font-mono text-sm" data-testid="booking-id">
                        {booking.id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rental Fee:</span>
                      <span data-testid="total-amount">
                        ₹{booking.totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Deposit:</span>
                      <span className="text-muted-foreground">₹0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span className="text-accent">Free</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                      <span>Total Paid:</span>
                      <span>₹{booking.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-sm text-muted-foreground">
                  <p className="mb-2">
                    <strong>Payment:</strong> Pay on delivery
                  </p>
                  <p>
                    <strong>Booked on:</strong> {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Confirmation Call</div>
                    <div className="text-sm text-muted-foreground">
                      We'll call you within 2 hours to confirm delivery details
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Gear Preparation</div>
                    <div className="text-sm text-muted-foreground">
                      Our team will prepare and quality-check your gear
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Delivery</div>
                    <div className="text-sm text-muted-foreground">
                      Your gear will be delivered at the scheduled time
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-1">Contact Support</div>
                  <div className="text-sm text-muted-foreground">
                    Call us at{' '}
                    <a href="tel:+919876543210" className="text-primary hover:underline">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Email Support</div>
                  <div className="text-sm text-muted-foreground">
                    <a href="mailto:support@passionfruit.rent" className="text-primary hover:underline">
                      support@passionfruit.rent
                    </a>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Modify Booking</div>
                  <div className="text-sm text-muted-foreground">
                    Contact us to change dates or delivery address
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            data-testid="browse-more-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Browse More Gear
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            data-testid="share-button"
          >
            <Share className="w-4 h-4 mr-2" />
            Share Booking
          </Button>
          <Button
            onClick={() => navigate('/profile')}
            data-testid="view-bookings-button"
          >
            View My Bookings
          </Button>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Thank You for Choosing PassionFruit!</h3>
          <p className="text-muted-foreground">
            We're excited to be part of your creative journey. Create something amazing! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
