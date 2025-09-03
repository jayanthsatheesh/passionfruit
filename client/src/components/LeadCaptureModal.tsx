import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { leadService } from '@/lib/booking';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().optional(),
});

type LeadForm = z.infer<typeof leadSchema>;

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: LeadForm) => {
    setIsLoading(true);
    try {
      await leadService.submitLead(data);
      toast({
        title: 'Thank you!',
        description: 'We\'ll get back to you soon with the perfect gear recommendations.',
      });
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: 'Submission failed',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4" data-testid="lead-modal">
      <div className="bg-card rounded-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold" data-testid="modal-title">
              Get in Touch
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              data-testid="modal-close"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="lead-form">
            <div>
              <Label htmlFor="lead-name">Your Name</Label>
              <Input
                id="lead-name"
                {...form.register('name')}
                placeholder="Enter your name"
                className="mt-1"
                data-testid="input-name"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="lead-email">Email</Label>
              <Input
                id="lead-email"
                type="email"
                {...form.register('email')}
                placeholder="Enter your email"
                className="mt-1"
                data-testid="input-email"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="lead-phone">Phone</Label>
              <Input
                id="lead-phone"
                type="tel"
                {...form.register('phone')}
                placeholder="Enter your phone number"
                className="mt-1"
                data-testid="input-phone"
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="lead-message">What gear are you interested in?</Label>
              <Textarea
                id="lead-message"
                {...form.register('message')}
                placeholder="Tell us about your project..."
                rows={3}
                className="mt-1"
                data-testid="input-message"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="submit-lead"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
