
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Nest } from "@/components/sections/Nest";
import { WaitlistCTA } from "@/components/sections/WaitlistCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Process />
      <Nest />
      <WaitlistCTA />
    </div>
  );
};

export default Index;
