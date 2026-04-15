import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const { toast } = useToast();
  const submitMutation = useSubmitContact();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    submitMutation.mutate({ data }, {
      onSuccess: () => {
        setIsSubmitted(true);
        toast({
          title: "Message received",
          description: "We'll get back to you within 24 hours.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section id="contact" className="py-24 bg-card border-t border-border">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">extraordinary?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Whether you need a full-stack platform, an AI integration, or a secure payment system, we have the engineering firepower to deliver.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-lg">Discovery Call</h4>
                  <p className="text-muted-foreground">We discuss your goals and technical constraints.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  02
                </div>
                <div>
                  <h4 className="font-bold text-lg">Architecture Plan</h4>
                  <p className="text-muted-foreground">We design the system and timeline.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-lg">Execution</h4>
                  <p className="text-muted-foreground">We build, test, and deploy to production.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-display text-3xl font-bold mb-4">Request Received</h3>
                <p className="text-muted-foreground mb-8">
                  Thank you for reaching out. One of our lead engineers will contact you shortly to discuss your project.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full">
                  Send another message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4 mb-8">
                    <h3 className="font-display text-2xl font-bold">Let's talk</h3>
                    <p className="text-muted-foreground">Fill out the form below and we'll get back to you promptly.</p>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="h-12 bg-card" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@company.com" type="email" className="h-12 bg-card" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about what you're trying to build..." 
                            className="min-h-[120px] resize-none bg-card" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full rounded-full h-14 text-base group mt-4"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? "Sending..." : "Submit Request"}
                    {!submitMutation.isPending && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
