
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AudioModal } from "@/components/modals/AudioModal";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { AtoBGraphic } from "../AtoBGraphic";
import { FloatingIconsBackground } from "../FloatingIconsBackground";

export const Hero = () => {
  const [showAudioModal, setShowAudioModal] = useState(false);

  const handleScrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary to-background py-20 px-4">
      <FloatingIconsBackground />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-7xl md:text-9xl font-bold text-primary mb-2">Homey</h1>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
          Feel at home, faster.
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12">
          Moving to a new city is tough. Homey is your personal AI pal that helps you find your footing, connecting you to the people and places that make a new city feel like your city.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            className="group"
            onClick={handleScrollToWaitlist}
          >
            Get Early Access
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => setShowAudioModal(true)}
          >
            Hear Homey's Voice
          </Button>
        </div>

        <div className="mt-20">
          <AtoBGraphic />
        </div>
      </div>
      
      <AudioModal isOpen={showAudioModal} onClose={() => setShowAudioModal(false)} />
    </section>
  );
};
