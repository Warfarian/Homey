
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Nest } from "@/components/sections/Nest";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { WaitlistCTA } from "@/components/sections/WaitlistCTA";
import { Journey } from "@/components/sections/Journey";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ValueProposition />
      <Journey />
      <Process />
      <Nest />
      <WaitlistCTA />
    </div>
  );
};

export default Index;
