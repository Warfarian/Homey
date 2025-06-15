
import { Hero } from "@/components/sections/Hero";
import { BrandPhilosophy } from "@/components/sections/BrandPhilosophy";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { VoiceDemo } from "@/components/sections/VoiceDemo";
import { Technology } from "@/components/sections/Technology";
import { Testimonials } from "@/components/sections/Testimonials";
import { WaitlistCTA } from "@/components/sections/WaitlistCTA";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Hero />
      <BrandPhilosophy />
      <HowItWorks />
      <VoiceDemo />
      <Technology />
      <Testimonials />
      <WaitlistCTA />
      <Footer />
    </div>
  );
};

export default Index;
