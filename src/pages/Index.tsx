
import { Manifesto } from "@/components/sections/Manifesto";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Nest } from "@/components/sections/Nest";
import { TechStack } from "@/components/sections/TechStack";
import { UserTestimonials } from "@/components/sections/UserTestimonials";
import { LaunchCTA } from "@/components/sections/LaunchCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Manifesto />
      <Problem />
      <Process />
      <Nest />
      <TechStack />
      <UserTestimonials />
      <LaunchCTA />
    </div>
  );
};

export default Index;
