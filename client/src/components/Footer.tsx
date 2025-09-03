import { Link } from 'wouter';
import { Sprout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">PassionFruit</span>
            </div>
            <p className="text-sm opacity-80">
              Own the moment, not the gear. Rent high-quality hobby equipment, hassle-free.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/#explore" className="hover:opacity-100 transition-opacity">
                  All Gear
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:opacity-100 transition-opacity">
                  Creator Kits
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-100 transition-opacity">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/faq" className="hover:opacity-100 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-100 transition-opacity">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:opacity-100 transition-opacity">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm opacity-80">
              <p>123 Hobby Lane,<br />Creativity City, 560001</p>
              <p>
                <a 
                  href="mailto:hello@passionfruit.rent"
                  className="hover:opacity-100 transition-opacity"
                >
                  hello@passionfruit.rent
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm opacity-60">
          <p>&copy; 2024 PassionFruit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
