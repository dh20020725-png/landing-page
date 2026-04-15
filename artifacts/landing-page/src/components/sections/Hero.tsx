import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <div className="container px-4 md:px-6">
        <div className="inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur px-3 py-1 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Now accepting new enterprise clients
        </div>
        
        <h1 className="max-w-4xl mx-auto font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          Ship <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">software</span> that defines the future.
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          We build AI-powered platforms, resilient payment systems, and scalable full-stack applications for bold startups and enterprise leaders.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <Button size="lg" className="rounded-full px-8 h-14 text-base w-full sm:w-auto group" onClick={scrollToContact}>
            Start a Project
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base w-full sm:w-auto group" onClick={scrollToServices}>
            Explore Services
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-muted-foreground" />
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
