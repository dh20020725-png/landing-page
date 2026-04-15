import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { HeroScene } from "@/components/HeroScene";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative pt-32 pb-20 md:pt-48 md:pb-36 overflow-hidden flex flex-col items-center text-center min-h-[90vh]"
      style={{ background: "linear-gradient(160deg, #0a0a14 0%, #0d0b1e 45%, #080d1a 100%)" }}
    >
      <HeroScene />

      <div className="container px-4 md:px-6 relative z-10">
        <div
          className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.35)", color: "#a5b4fc" }}
        >
          <span className="flex h-2 w-2 rounded-full mr-2 animate-pulse" style={{ background: "#818cf8" }} />
          Now accepting new enterprise clients
        </div>

        <h1 className="max-w-4xl mx-auto font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 text-white">
          Ship{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #60a5fa 100%)" }}
          >
            software
          </span>{" "}
          that defines the future.
        </h1>

        <p
          className="max-w-2xl mx-auto text-xl md:text-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200"
          style={{ color: "rgba(200,210,255,0.65)" }}
        >
          We build AI-powered platforms, resilient payment systems, and scalable
          full-stack applications for bold startups and enterprise leaders.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <Button
            size="lg"
            className="rounded-full px-8 h-14 text-base w-full sm:w-auto group"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              boxShadow: "0 0 30px rgba(99,102,241,0.4)",
              border: "none",
              color: "white",
            }}
            onClick={scrollToContact}
          >
            Start a Project
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 h-14 text-base w-full sm:w-auto group"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(200,210,255,0.85)",
              backdropFilter: "blur(8px)",
            }}
            onClick={scrollToServices}
          >
            Explore Services
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform opacity-60" />
          </Button>
        </div>
      </div>

      {/* bottom fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
