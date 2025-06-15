
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AudioModal } from "@/components/modals/AudioModal";
import { AtoBGraphic } from "@/components/AtoBGraphic";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const [showAudioModal, setShowAudioModal] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-4">
          Feel at home, faster.
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
          Moving to a new city is hard. Homey is your personal AI friend that connects you with places and people that match your vibe, so you can settle in, not just move in.
        </p>
        
        <AtoBGraphic />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            className="group"
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
      </div>
      
      <AudioModal isOpen={showAudioModal} onClose={() => setShowAudioModal(false)} />
    </section>
  );
};
