import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X, User, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, signOut } = useAuth();
  const [location, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navigation = [
    { name: 'Explore Gear', href: '/#explore', id: 'nav-explore' },
    { name: 'Our Story', href: '/#story', id: 'nav-story' },
    { name: 'Our Promise', href: '/#promise', id: 'nav-promise' },
    { name: 'How it Works', href: '/#how-it-works', id: 'nav-how-it-works' },
    { name: 'Contact', href: '/#contact', id: 'nav-contact' },
  ];

  return (
    <>
      {/* Mobile Navigation Overlay */}
      <div 
        className={`mobile-nav fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg lg:hidden ${mobileMenuOpen ? 'open' : ''}`}
        data-testid="mobile-nav"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2" data-testid="mobile-logo">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="text-primary-foreground text-sm" />
              </div>
              <span className="text-lg font-semibold">PassionFruit</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="close-mobile-nav"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 px-4 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                data-testid={item.id}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="block py-2 px-4 rounded-md hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-profile"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 px-4 rounded-md hover:bg-muted transition-colors"
                    data-testid="mobile-signout"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="block py-2 px-4 rounded-md hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-signin"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block py-2 px-4 rounded-md bg-primary text-primary-foreground text-center mt-2 hover:opacity-90 transition-opacity"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-signup"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40" data-testid="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2" data-testid="logo">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="text-primary-foreground text-sm" />
              </div>
              <span className="text-xl font-bold">PassionFruit</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" data-testid="desktop-nav">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                  data-testid={item.id}
                >
                  {item.name}
                </a>
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
                  className="w-full pl-10 pr-4 py-2"
                  data-testid="search-input"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </form>
            </div>
            
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" data-testid="user-menu">
                      <User className="h-4 w-4 mr-2" />
                      {user?.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" data-testid="dropdown-profile">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut} data-testid="dropdown-signout">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/signin">
                    <Button variant="ghost" size="sm" data-testid="signin-button">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" data-testid="signup-button">
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
              onClick={() => setMobileMenuOpen(true)}
              data-testid="mobile-menu-button"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
