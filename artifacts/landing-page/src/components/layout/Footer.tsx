import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl">
                N
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                NexaTech
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Building the future of software engineering. We deliver premium, AI-powered applications that drive real business results.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-foreground transition-colors">Full Stack Development</button></li>
              <li><button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-foreground transition-colors">AI Chatbots</button></li>
              <li><button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-foreground transition-colors">Payment Integration</button></li>
              <li><button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-foreground transition-colors">AI Search Systems</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><button onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-foreground transition-colors">About Us</button></li>
              <li><button onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-foreground transition-colors">Our Process</button></li>
              <li><button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-foreground transition-colors">Contact</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NexaTech Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
