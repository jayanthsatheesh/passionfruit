import { Link } from 'wouter';
import { Sprout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4" data-testid="footer-logo">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="text-primary-foreground text-sm" />
              </div>
              <span className="text-xl font-bold">PassionFruit</span>
            </Link>
            <p className="text-sm opacity-80">
              Own the moment, not the gear. Rent high-quality hobby equipment, hassle-free.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="/#explore" className="hover:opacity-100 transition-opacity" data-testid="footer-all-gear">
                  All Gear
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity" data-testid="footer-creator-kits">
                  Creator Kits
                </a>
              </li>
              <li>
                <a href="/#story" className="hover:opacity-100 transition-opacity" data-testid="footer-our-story">
                  Our Story
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity" data-testid="footer-faq">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:opacity-100 transition-opacity" data-testid="footer-contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity" data-testid="footer-terms">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm opacity-80">
              <p data-testid="footer-address">
                123 Hobby Lane,<br>
                Creativity City, 560001
              </p>
              <p data-testid="footer-email">
                <a href="mailto:hello@passionfruit.rent" className="hover:opacity-100 transition-opacity">
                  hello@passionfruit.rent
                </a>
              # thoughts

Looking at the provided HTML files and the design reference, I need to convert the static PassionFruit hobby gear rental site into a production-ready React application. The reference design shows a modern, responsive layout with:

1. **Brand colors**: Passion Purple (#6A1B9A), Golden Pulp (#F4B400), Fresh Leaf Green (#4CAF50), etc.
2. **Hero carousel** with 3 slides and specific messaging
3. **Generic hobby gear focus** (not just cameras) - photography, music, adventure, tech
4. **Responsive layout** with sticky filters and product grid
5. **Mobile-first design** with hamburger navigation

Key features to implement:
- Client-side authentication using localStorage
- Product catalog with filtering and search
- Browse → details → booking → confirmation flow
- Contact forms using external services
- Mobile-responsive design with proper typography
- SEO optimization with meta tags
- Accessibility improvements

I'll create a React application with proper routing, components, and state management while maintaining the design aesthetics from the reference.

# useful_guidelines_from_blueprints

From the development guidelines:
- Use modern web application patterns with frontend-focused architecture
- Minimize file count by collapsing similar components
- Use wouter for routing and register pages in App.tsx
- Implement proper form handling with react-hook-form and zod validation
- Use @tanstack/react-query for data fetching
- Add data-testid attributes to interactive elements
- Use shadcn + Tailwind CSS setup instead of custom components
- Implement proper SEO with unique titles and meta descriptions
- Follow the color customization format in index.css using HSL values

# directory_structure

```json
[
    {"path": "client/src/index.css", "status": "overwritten"},
    {"path": "client/src/App.tsx", "status": "overwritten"},
    {"path": "client/src/components/Header.tsx", "status": "new"},
    {"path": "client/src/components/Footer.tsx", "status": "new"},
    {"path": "client/src/components/ProductCard.tsx", "status": "new"},
    {"path": "client/src/components/ProductModal.tsx", "status": "new"},
    {"path": "client/src/components/HeroCarousel.tsx", "status": "new"},
    {"path": "client/src/pages/Home.tsx", "status": "new"},
    {"path": "client/src/pages/SignIn.tsx", "status": "new"},
    {"path": "client/src/pages/SignUp.tsx", "status": "new"},
    {"path": "client/src/pages/ProductDetails.tsx", "status": "new"},
    {"path": "client/src/pages/Booking.tsx", "status": "new"},
    {"path": "client/src/pages/Confirmation.tsx", "status": "new"},
    {"path": "client/src/pages/Contact.tsx", "status": "new"},
    {"path": "client/src/pages/About.tsx", "status": "new"},
    {"path": "client/src/pages/Profile.tsx", "status": "new"},
    {"path": "client/src/lib/auth.ts", "status": "new"},
    {"path": "client/src/lib/products.ts", "status": "new"},
    {"path": "client/src/data/products.json", "status": "new"},
    {"path": "client/src/types/index.ts", "status": "new"},
    {"path": "tailwind.config.ts", "status": "overwritten"},
    {"path": "client/index.html", "status": "overwritten"}
]
