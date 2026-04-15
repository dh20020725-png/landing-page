import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "NexaTech didn't just build what we asked for, they built what we actually needed. Their architectural decisions saved us months of rework.",
    author: "Sarah Chen",
    role: "CTO, DataFlow Analytics",
    company: "DataFlow",
  },
  {
    quote: "The payment infrastructure they designed handles our peak volumes without breaking a sweat. Flawless execution from day one.",
    author: "Marcus Rodriguez",
    role: "Founder, Zenith Commerce",
    company: "Zenith",
  },
  {
    quote: "Integrating their RAG search system transformed our product. User engagement is up 40% because people can finally find what they're looking for.",
    author: "Elena Miskova",
    role: "VP Product, Lexical AI",
    company: "Lexical",
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-card border-y border-border">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Trusted by engineering leaders</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what technical founders and CTOs have to say about our work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-background rounded-2xl p-8 border border-border/50 shadow-sm relative group hover:border-primary/30 transition-colors">
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-lg mb-8 leading-relaxed">"{t.quote}"</p>
              <div className="mt-auto">
                <p className="font-bold font-display">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
