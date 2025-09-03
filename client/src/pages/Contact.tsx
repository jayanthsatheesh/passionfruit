import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { sendContactEmail } from '@/lib/emailjs';
import { leadService } from '@/lib/booking';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsLoading(true);
    try {
      // Send email using EmailJS
      const emailSent = await sendContactEmail(
        data.name, 
        data.email, 
        `${data.subject}\n\n${data.message}`,
        data.phone
      );
      
      if (!emailSent) {
        throw new Error('Failed to send message');
      }

      toast({
        title: 'Message sent!',
        description: 'Thanks for reaching out. We\'ll get back to you soon.',
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Failed to send message',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="contact-title">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our gear or need help with your booking? We're here to help you create something amazing.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle data-testid="contact-form-title">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      {...form.register('name')}
                      placeholder="Your name"
                      data-testid="name-input"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...form.register('phone')}
                      placeholder="Your phone number"
                      data-testid="phone-input"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register('email')}
                    placeholder="your.email@example.com"
                    data-testid="email-input"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    {...form.register('subject')}
                    placeholder="How can we help?"
                    data-testid="subject-input"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    {...form.register('message')}
                    placeholder="Tell us about your project or question..."
                    rows={5}
                    data-testid="message-input"
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                  data-testid="send-message-button"
                >
                  {isLoading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                        +91 98765 43210
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">Available 9 AM - 9 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:hello@passionfruit.rent" className="hover:text-primary transition-colors">
                        hello@passionfruit.rent
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      123 Hobby Lane<br />
                      Creativity City, 560001<br />
                      Bangalore, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                      <p>Saturday: 10:00 AM - 6:00 PM</p>
                      <p>Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Booking Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Need help with an existing booking? Email us at{' '}
                      <a href="mailto:bookings@passionfruit.rent" className="text-primary hover:underline">
                        bookings@passionfruit.rent
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Technical Issues</h3>
                    <p className="text-sm text-muted-foreground">
                      Having trouble with our website? Email{' '}
                      <a href="mailto:tech@passionfruit.rent" className="text-primary hover:underline">
                        tech@passionfruit.rent
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Partnership Inquiries</h3>
                    <p className="text-sm text-muted-foreground">
                      Interested in partnering with us? Contact{' '}
                      <a href="mailto:partnerships@passionfruit.rent" className="text-primary hover:underline">
                        partnerships@passionfruit.rent
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How does the rental process work?</h3>
                <p className="text-muted-foreground text-sm">
                  Browse our catalog, select your gear, choose rental dates, and we'll deliver it to your doorstep. 
                  After your rental period, we'll pick it up.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What if the gear gets damaged?</h3>
                <p className="text-muted-foreground text-sm">
                  Minor wear and tear is covered. For major damage, we'll assess and communicate costs upfront. 
                  We believe in transparent pricing.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Do you deliver across India?</h3>
                <p className="text-muted-foreground text-sm">
                  Currently, we deliver within Bangalore and surrounding areas. We're expanding to other cities soon!
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Can I extend my rental period?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes! Contact us before your rental ends, and we'll help extend your rental period based on availability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
