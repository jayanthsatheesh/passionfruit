import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface Slide {
  title: string;
  subtitle: string;
  cta: {
    primary: { text: string; href: string };
    secondary: { text: string; href: string };
  };
}

const slides: Slide[] = [
  {
    title: "Own The Moment, Not The Gear",
    subtitle: "Rent professional equipment for your passion projects. From cameras to musical instruments, we've got you covered.",
    cta: {
      primary: { text: "Explore Gear", href: "#explore" },
      secondary: { text: "How It Works", href: "#how-it-works" }
    }
  },
  {
    title: "Pro-checked Gear Delivered",
    subtitle: "Every piece of equipment is thoroughly inspected and delivered right to your doorstep when you need it.",
    cta: {
      primary: { text: "Browse Catalog", href: "#explore" },
      secondary: { text: "Our Promise", href: "#promise" }
    }
  },
  {
    title: "Your Vision, Unlocked",
    subtitle: "Don't let expensive gear hold back your creativity. Access professional tools without the professional price tag.",
    cta: {
      primary: { text: "Get Started", href: "#explore" },
      secondary: { text: "Learn More", href: "#promise" }
    }
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="hero-carousel text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=800')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="absolute inset-0"
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            data-testid="hero-title"
          >
            {currentSlideData.title}
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8 opacity-90"
            data-testid="hero-subtitle"
          >
            {currentSlideData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 rounded-md font-medium transition-colors"
              data-testid="hero-cta-primary"
            >
              {currentSlideData.cta.primary.text}
            </button>
            <button 
              onClick={() => {
                if (currentSlideData.cta.secondary.href === '#promise') {
                  window.location.href = '/about#promise';
                } else if (currentSlideData.cta.secondary.href === '#how-it-works') {
                  window.location.href = '/about#how-it-works';
                } else {
                  document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 rounded-md font-medium transition-colors"
              data-testid="hero-cta-secondary"
            >
              {currentSlideData.cta.secondary.text}
            </button>
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-opacity ${
                index === currentSlide ? 'bg-white opacity-100' : 'bg-white opacity-60'
              }`}
              data-testid={`carousel-indicator-${index}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
