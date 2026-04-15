import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm group-hover:scale-105 transition-transform">
              21
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              21st DreamDev
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("services")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</button>
            <button onClick={() => scrollTo("process")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Process</button>
            <button onClick={() => scrollTo("stats")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</button>
            <Button onClick={() => scrollTo("contact")} className="rounded-full px-6">
              Let's Talk
            </Button>
          </nav>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2">
          <button onClick={() => scrollTo("services")} className="text-left text-sm font-medium p-2 hover:bg-muted rounded">Services</button>
          <button onClick={() => scrollTo("process")} className="text-left text-sm font-medium p-2 hover:bg-muted rounded">Process</button>
          <button onClick={() => scrollTo("stats")} className="text-left text-sm font-medium p-2 hover:bg-muted rounded">About</button>
          <Button onClick={() => scrollTo("contact")} className="w-full mt-2">
            Let's Talk
          </Button>
        </div>
      )}
    </header>
  );
}
