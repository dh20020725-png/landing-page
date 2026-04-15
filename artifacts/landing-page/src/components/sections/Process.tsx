import { Code, Database, Cpu, Zap } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Data & Architecture",
    description: "We architect scalable foundations that can handle tomorrow's traffic today. Clean schemas, robust APIs, and bulletproof security.",
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description: "We embed intelligence directly into your workflows. From local LLMs to cloud APIs, we make your application smart.",
  },
  {
    icon: Code,
    title: "Frontend Craft",
    description: "Pixel-perfect, highly responsive interfaces that users love. We sweat the details on animations, states, and accessibility.",
  },
  {
    icon: Zap,
    title: "Performance & Scale",
    description: "Optimized pipelines and zero-downtime deployments. We ensure your app is lightning fast worldwide.",
  }
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">How we build</h2>
          <p className="text-lg text-muted-foreground">
            A rigorous engineering process that guarantees quality from the first commit to the final deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {i !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-[1px] bg-border -z-10 group-hover:bg-primary/50 transition-colors"></div>
              )}
              <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mb-6 shadow-sm group-hover:border-primary group-hover:shadow-primary/20 transition-all duration-300">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
