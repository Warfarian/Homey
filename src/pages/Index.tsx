
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Nest } from "@/components/sections/Nest";
import { Stories } from "@/components/sections/Stories";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Problem />
      <Process />
      <Nest />
      <Stories />
    </div>
  );
};

export default Index;
