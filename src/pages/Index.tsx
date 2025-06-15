
import { Manifesto } from "@/components/sections/Manifesto";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Nest } from "@/components/sections/Nest";
import { UserTestimonials } from "@/components/sections/UserTestimonials";
import { LaunchCTA } from "@/components/sections/LaunchCTA";
import { Stories } from "@/components/sections/Stories";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Manifesto />
      <Problem />
      <Process />
      <Nest />
      <Stories />
      <UserTestimonials />
      <LaunchCTA />
    </div>
  );
};

export default Index;
