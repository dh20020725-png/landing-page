import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is your typical engagement size?",
    answer: "We typically engage in projects starting at $50k, which usually maps to a 2-3 month engagement with a dedicated engineering team. We also offer long-term retainer models for ongoing product development."
  },
  {
    question: "Do you work with existing codebases or only greenfield projects?",
    answer: "Both. While we love architecting greenfield projects, a significant portion of our work involves modernizing legacy systems, migrating monoliths to microservices, or untangling complex technical debt."
  },
  {
    question: "How do you handle IP and security?",
    answer: "You own 100% of the IP. We use enterprise-grade security practices, sign comprehensive NDAs, and can operate within your existing security compliance frameworks (SOC2, HIPAA, etc)."
  },
  {
    question: "What is your tech stack?",
    answer: "Our core stack is TypeScript (React/Next.js/Node.js) and Python (for AI/Data workloads). We deploy primarily on AWS and Vercel. However, we choose the right tool for the job and are comfortable adapting to your organizational standards."
  },
  {
    question: "How quickly can we start?",
    answer: "Depending on team availability and project scope, we can typically kick off the discovery phase within 1-2 weeks of signing."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Common questions</h2>
            <p className="text-muted-foreground mb-6">
              Everything you need to know about working with NexaTech Solutions.
            </p>
            <p className="text-sm text-muted-foreground">
              Can't find what you're looking for? Reach out via our contact form.
            </p>
          </div>
          
          <div className="lg:col-span-8 lg:col-start-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/50">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
