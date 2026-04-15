import { Code2, Bot, CreditCard, Search } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "End-to-end web applications built with modern frameworks. Scalable architectures designed for high performance and reliability.",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent conversational agents that automate support, guide users, and integrate seamlessly with your existing data.",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    description: "Secure, compliant payment gateways for subscriptions, marketplaces, and e-commerce with robust fraud protection.",
  },
  {
    icon: Search,
    title: "AI Search Systems",
    description: "Semantic search and RAG implementations that understand context and retrieve the exact information your users need.",
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Engineering excellence across the stack</h2>
          <p className="text-lg text-muted-foreground">
            We specialize in hard problems. From complex AI integrations to mission-critical infrastructure, we deliver solutions that just work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
