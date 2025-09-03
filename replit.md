# PassionFruit - Hobby Gear Rental Platform

## Overview

PassionFruit is a modern hobby gear rental platform that allows users to rent professional equipment across categories like Photography, Music, Adventure, and Tech. The platform follows the philosophy "Own the moment, not the gear" and provides access to high-quality equipment without the commitment of ownership. The application features a complete rental flow from discovery to booking confirmation, with user authentication, product browsing, and lead capture capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**September 2, 2025:**
- ✓ **Converted to fully static site** - No backend server required
- ✓ **Integrated EmailJS** for client-side email notifications (200 free emails/month)
- ✓ **GitHub Pages ready** - Created automated deployment workflow
- ✓ **Email notifications** to shanker87@gmail.com for all bookings and contact forms
- ✓ **Customer confirmations** sent automatically via EmailJS
- ✓ **Mobile number collection** added to booking and contact forms
- ✓ **Product request system** - "Couldn't Find What You Were Looking For?" forms
- ✓ **Smart form placement** - Appears on main page and when search returns no results
- ✓ **Static hosting guide** with step-by-step deployment instructions
- ✓ **Environment configuration** for EmailJS API keys
- ✓ **Cost optimization** - Reduced from $10+/month to $0/month hosting

**September 1, 2025:**
- ✓ Implemented spreadsheet-based product management using CSV files
- ✓ Created comprehensive CSV parser with support for all product fields
- ✓ Added fallback system (CSV → JSON) for reliable product loading
- ✓ Generated sample products.csv with real product data
- ✓ Created detailed documentation for CSV-based product management
- ✓ Supports complex data types (arrays, images, dimensions) via pipe-separated values
- ✓ Optimized for static site deployment with no backend dependencies

**August 28, 2025:**
- ✓ Fixed product page navigation to scroll to top when landing on product details
- ✓ Created comprehensive admin console for product management at `/admin`
- ✓ Updated SendGrid email configuration with verified sender jayant.svnit@gmail.com and recipient shanker87@gmail.com
- ✓ Added admin access restriction to jayant.svnit@gmail.com and shanker87@gmail.com only
- ✓ Integrated admin products with main product catalog using localStorage persistence
- ✓ Added admin navigation link in header for authenticated admin users

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Routing**: Wouter as a lightweight client-side router for navigation between pages
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library built on Radix UI primitives
- **State Management**: TanStack Query for server state management combined with localStorage for client-side persistence
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Icons**: Lucide React for consistent iconography

### Email & Communication
- **EmailJS Integration**: Client-side email delivery with 200 free emails per month
- **Admin Notifications**: All bookings and contact forms sent to shanker87@gmail.com
- **Customer Confirmations**: Automated booking confirmation emails
- **Static Compatibility**: No backend server required for email functionality

### Backend Architecture (Optional - for Development)
- **Server Framework**: Express.js with TypeScript for API endpoints (development only)
- **Database Layer**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations
- **Session Management**: Basic session handling with potential for database-backed sessions

### Authentication System
- **Client-Side Authentication**: localStorage-based session management for development/demo purposes
- **User Management**: Simple user registration and login system with password-based authentication
- **Authorization**: Role-based access control ready for implementation

### Data Management
- **Product Catalog**: CSV spreadsheet-based product management with automatic parsing and fallback to JSON
- **Spreadsheet Integration**: Easy product management through Excel/Google Sheets with comprehensive field support
- **Booking System**: Client-side booking simulation with localStorage persistence, ready for backend integration
- **Lead Capture**: Contact form system designed to integrate with external services like Typeform or Google Forms

### UI/UX Design Patterns
- **Mobile-First Design**: Responsive breakpoints optimized for mobile, tablet, and desktop experiences
- **Component Architecture**: Reusable UI components following shadcn/ui design patterns
- **Accessibility**: WCAG compliance with proper ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Lazy loading for images, code splitting, and optimized bundle sizes

### Development Architecture
- **Monorepo Structure**: Organized with separate client, server, and shared directories
- **Code Quality**: TypeScript strict mode, ESLint, and consistent code formatting
- **Build Pipeline**: Vite for frontend bundling, esbuild for backend compilation
- **Asset Management**: Static asset handling with proper optimization and CDN-ready structure

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Open-source icon library with React components

### Development Tools
- **Drizzle Kit**: Database schema management and migration tools
- **TanStack Query**: Powerful data synchronization for React applications
- **React Hook Form**: Performant forms with easy validation

### Database Integration
- **Neon Database**: Serverless PostgreSQL database (configured via DATABASE_URL)
- **Connection Pooling**: Built-in connection management for serverless environments

### Potential External Services
- **Lead Capture**: Ready for integration with Typeform, Tally, or Google Forms
- **Payment Processing**: Architecture supports Stripe or Razorpay integration
- **Email Service**: Prepared for transactional email providers like SendGrid or Mailgun
- **SMS Notifications**: Structure supports Twilio or similar SMS services
- **Image CDN**: Optimized for services like Cloudinary or AWS S3

### Deployment & Infrastructure
- **Primary Hosting**: GitHub Pages with automated deployment workflow
- **Alternative Hosting**: Vercel, Netlify, or any static hosting provider
- **Email Service**: EmailJS for client-side email delivery
- **Environment Configuration**: EmailJS API keys via environment variables
- **Build Pipeline**: Vite static build with environment variable injection
- **Cost**: $0/month for hosting and email (200 emails free tier)