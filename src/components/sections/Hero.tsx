
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
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3) contrast(1.2)"
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-stone-900/60 to-emerald-900/40 z-10 animate-pulse" 
           style={{ animationDuration: '8s' }} />
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        {/* Experimental Typography Hero */}
        <div className="mb-12">
          <h1 className="font-serif text-7xl md:text-9xl lg:text-[12rem] font-black text-white leading-[0.8] tracking-tighter mb-6">
            <span className="block transform -rotate-2 origin-left hover:rotate-0 transition-transform duration-700">Home</span>
            <span className="block transform rotate-1 origin-right hover:rotate-0 transition-transform duration-700 text-transparent bg-gradient-to-r from-orange-300 via-rose-300 to-violet-300 bg-clip-text">y</span>
          </h1>
          
          {/* Playful subtitle with mixed typography */}
          <div className="space-y-4">
            <p className="text-2xl md:text-4xl font-light text-stone-200 transform -rotate-1">
              Your AI friend who
            </p>
            <p className="text-3xl md:text-5xl font-black text-orange-300 transform rotate-1 tracking-wide">
              ACTUALLY GETS YOU
            </p>
          </div>
        </div>
        
        {/* Description with better spacing */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          <p className="text-xl md:text-2xl text-stone-300 font-light leading-relaxed">
            Moving to a new city? Homey learns your vibe and calls you with 
            <span className="italic text-orange-300"> perfect </span> 
            local recommendations.
          </p>
          
          <p className="text-lg text-stone-400 font-light">
            Like having a best friend who knows every hidden gem in town.
          </p>
        </div>
        
        {/* Enhanced CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            onClick={() => setShowAudioModal(true)}
            className="group bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-10 py-4 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <span className="flex items-center gap-3">
              🎧 Hear Homey's Voice
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            </span>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-2 border-white/50 text-white hover:bg-white hover:text-black px-10 py-4 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            See How It Works ✨
          </Button>
        </div>
        
        {/* Fun floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-3 h-3 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-32 w-5 h-5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
        
        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/70 text-sm font-light">Discover more</p>
            <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center animate-bounce">
              <div className="w-2 h-4 bg-gradient-to-b from-orange-400 to-transparent rounded-full mt-2" />
            </div>
          </div>
        </div>
      </div>
      
      <AudioModal isOpen={showAudioModal} onClose={() => setShowAudioModal(false)} />
    </section>
  );
};
