
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Nest } from "@/components/sections/Nest";
import { Stories } from "@/components/sections/Stories";
import { LaunchCTA } from "@/components/sections/LaunchCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Problem />
      <Process />
      <Nest />
      <Stories />
      <LaunchCTA />
    </div>
  );
};

export default Index;
