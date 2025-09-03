import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ProductDetails from "@/pages/ProductDetails";
import Booking from "@/pages/Booking";
import Confirmation from "@/pages/Confirmation";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";
import Admin from "@/pages/Admin";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/explore" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/booking/:id" component={Booking} />
          <Route path="/confirmation/:bookingId" component={Confirmation} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
