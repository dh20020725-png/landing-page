import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { ChatbotWidget } from "@/components/ChatbotWidget";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Stats />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
