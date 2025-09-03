import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X, User, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authService } from '@/lib/auth';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, navigate] = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('passionfruit_user') || '{}');
    setIsAdmin(user.email && ['jayant.svnit@gmail.com', 'shanker87@gmail.com'].includes(user.email));
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
      // Scroll to products section if on homepage
      setTimeout(() => {
        document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSignOut = () => {
    authService.signOut();
    setIsAuthenticated(false);
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '/explore', label: 'Explore Gear' },
    { href: '/about', label: 'Our Story' },
    { href: '/about#promise', label: 'Our Promise' },
    { href: '/about#how-it-works', label: 'How it Works' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="logo">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sprout className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">PassionFruit</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="What are you passionate about today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="search-input"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </form>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/profile" data-testid="profile-link">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href="/admin" data-testid="admin-link">
                    <Button variant="ghost" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  data-testid="signout-button"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin" data-testid="signin-link">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" data-testid="signup-link">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg md:hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sprout className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold">PassionFruit</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(false)}
                data-testid="close-mobile-menu"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-6">
              <Input
                type="text"
                placeholder="Search gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="mobile-search-input"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </form>
            
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 px-4 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="block py-2 px-4 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      data-testid="mobile-profile-link"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left py-2 px-4 rounded-md hover:bg-muted transition-colors"
                      data-testid="mobile-signout-button"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="block py-2 px-4 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      data-testid="mobile-signin-link"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="block py-2 px-4 rounded-md bg-primary text-primary-foreground text-center mt-2 hover:opacity-90 transition-opacity"
                      onClick={() => setIsMenuOpen(false)}
                      data-testid="mobile-signup-link"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}
