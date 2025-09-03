import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/lib/auth';

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  pincode: z.string().min(6, 'Please enter a valid pincode'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      pincode: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    try {
      await authService.signUp(data.email, data.password, data.name, data.phone, data.pincode);
      toast({
        title: 'Account created!',
        description: 'Welcome to PassionFruit. You can now start exploring gear.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Sign up failed',
        description: error instanceof Error ? error.message : 'An error occurred during sign up.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center" data-testid="signup-title">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-center">
              Just a few details to get you started on your next adventure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  {...form.register('name')}
                  placeholder="Enter your full name"
                  className="mt-1"
                  data-testid="name-input"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive mt-1" data-testid="name-error">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email ID</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  placeholder="Enter your email"
                  className="mt-1"
                  data-testid="email-input"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1" data-testid="email-error">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Contact Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register('phone')}
                  placeholder="Enter your phone number"
                  className="mt-1"
                  data-testid="phone-input"
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-destructive mt-1" data-testid="phone-error">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pincode">Area Pincode</Label>
                <Input
                  id="pincode"
                  type="text"
                  {...form.register('pincode')}
                  placeholder="Enter your area pincode"
                  className="mt-1"
                  data-testid="pincode-input"
                />
                {form.formState.errors.pincode && (
                  <p className="text-sm text-destructive mt-1" data-testid="pincode-error">
                    {form.formState.errors.pincode.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register('password')}
                  placeholder="Create a password"
                  className="mt-1"
                  data-testid="password-input"
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1" data-testid="password-error">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...form.register('confirmPassword')}
                  placeholder="Confirm your password"
                  className="mt-1"
                  data-testid="confirm-password-input"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1" data-testid="confirm-password-error">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="signup-button"
              >
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/signin" className="text-primary hover:underline" data-testid="signin-link">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
