import { Users, Award, Truck, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="about-title">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe everyone deserves access to professional-grade equipment to pursue their passions, 
            without the burden of ownership.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6" data-testid="mission-title">
                Own the Moment, Not the Gear
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  PassionFruit was born from a simple observation: amazing creative projects were being 
                  held back by the high cost of professional equipment. Whether you're a weekend photographer, 
                  an aspiring musician, or an adventure enthusiast, you shouldn't have to choose between 
                  your passion and your budget.
                </p>
                <p>
                  We started PassionFruit to democratize access to high-quality gear. Our mission is to 
                  enable creators, adventurers, and hobbyists to pursue their passions without the financial 
                  burden of owning expensive equipment.
                </p>
                <p>
                  Today, we're proud to serve creators across Bangalore with a carefully curated collection 
                  of professional-grade equipment, all backed by our commitment to quality and service excellence.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Team collaboration"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Our Promise Section */}
        <section id="promise" className="mb-16 scroll-mt-16">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="promise-title">
            Our Promise
          </h2>
          <div className="bg-muted rounded-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-6">Quality You Can Trust</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Every piece of equipment in our catalog is professionally maintained, thoroughly tested, 
                and ready to perform at its peak. We promise reliable gear that won't let you down when 
                creativity strikes.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">Quality Guarantee</h4>
                  <p className="text-sm text-muted-foreground">
                    Professional-grade equipment that meets the highest standards
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">Reliable Delivery</h4>
                  <p className="text-sm text-muted-foreground">
                    On-time delivery and pickup, exactly when you need it
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">Expert Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Friendly, knowledgeable support throughout your rental experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mb-16 scroll-mt-16">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="how-it-works-title">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold mb-2">Browse & Select</h3>
              <p className="text-sm text-muted-foreground">
                Explore our catalog and choose the perfect gear for your project
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold mb-2">Book & Schedule</h3>
              <p className="text-sm text-muted-foreground">
                Select your rental dates and provide delivery details
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold mb-2">Receive & Create</h3>
              <p className="text-sm text-muted-foreground">
                Get your gear delivered and start bringing your vision to life
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                4
              </div>
              <h3 className="font-semibold mb-2">Return & Repeat</h3>
              <p className="text-sm text-muted-foreground">
                Easy pickup when you're done, ready for your next adventure
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="values-title">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  Every piece of gear undergoes rigorous testing and maintenance to ensure peak performance.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  We're building a community of creators who support and inspire each other.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Reliable Service</h3>
                <p className="text-sm text-muted-foreground">
                  On-time delivery, responsive support, and hassle-free experiences, always.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Clear pricing, honest communication, and no hidden fees or surprises.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Journey Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="journey-title">
            Our Journey
          </h2>
          <div className="space-y-8">
            <div className="flex gap-8 items-center">
              <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                2023
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">The Beginning</h3>
                <p className="text-muted-foreground">
                  Founded in Bangalore with a vision to make professional equipment accessible to everyone. 
                  Started with a small collection of cameras and music gear.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-center">
              <div className="w-20 h-20 bg-secondary text-foreground rounded-full flex items-center justify-center font-bold text-xl">
                2024
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Expansion</h3>
                <p className="text-muted-foreground">
                  Expanded our catalog to include adventure gear, gaming equipment, and professional audio equipment. 
                  Served over 1000+ happy customers.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-center">
              <div className="w-20 h-20 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-xl">
                Now
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Today</h3>
                <p className="text-muted-foreground">
                  Operating across Bangalore with same-day delivery, 500+ gear items, and plans to expand to 
                  more cities across India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="team-title">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
                  alt="Founder"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold mb-1">Rajesh Kumar</h3>
                <p className="text-sm text-muted-foreground mb-2">Founder & CEO</p>
                <p className="text-xs text-muted-foreground">
                  Former tech executive turned entrepreneur, passionate about democratizing creativity.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
                  alt="Co-founder"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold mb-1">Priya Sharma</h3>
                <p className="text-sm text-muted-foreground mb-2">Co-founder & CTO</p>
                <p className="text-xs text-muted-foreground">
                  Tech innovator with a background in logistics and supply chain optimization.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
                  alt="Head of Operations"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold mb-1">Arjun Patel</h3>
                <p className="text-sm text-muted-foreground mb-2">Head of Operations</p>
                <p className="text-xs text-muted-foreground">
                  Operations expert ensuring every rental experience exceeds expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-muted rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-customers">2,500+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-gear">500+</div>
              <div className="text-muted-foreground">Gear Items</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-deliveries">5,000+</div>
              <div className="text-muted-foreground">Successful Deliveries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-satisfaction">99%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
