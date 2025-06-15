
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AudioModal } from "@/components/modals/AudioModal";

export const Hero = () => {
  const [showAudioModal, setShowAudioModal] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2940&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4) contrast(1.1)"
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-light text-white mb-8 leading-tight tracking-wide">
          Belong<br />
          <span className="italic font-normal">anywhere.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-stone-200 mb-4 font-light max-w-2xl mx-auto leading-relaxed">
          With a voice that knows you.
        </p>
        
        <p className="text-lg text-stone-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Homey is your personal voice AI that helps you settle into new cities — one meaningful recommendation at a time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => setShowAudioModal(true)}
            className="bg-white text-black hover:bg-stone-100 px-8 py-3 text-lg font-medium transition-all duration-300"
          >
            Listen to a sample call
          </Button>
          
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-medium transition-all duration-300"
          >
            Explore How It Works
          </Button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
      
      <AudioModal isOpen={showAudioModal} onClose={() => setShowAudioModal(false)} />
    </section>
  );
};
