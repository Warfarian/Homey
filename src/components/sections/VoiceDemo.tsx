
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const VoiceDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 4000);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-8">
          The voice of <span className="italic">Homey</span>
        </h2>
        
        <p className="text-xl text-stone-600 mb-12 font-light">
          Warm, intelligent, and personally yours
        </p>
        
        {/* Audio Waveform Visualization */}
        <div className="bg-stone-900 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center space-x-1 h-16">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className={`bg-stone-300 rounded-full transition-all duration-300 ${
                  isPlaying 
                    ? `animate-pulse opacity-${Math.random() > 0.5 ? '100' : '50'}` 
                    : 'opacity-30'
                }`}
                style={{
                  width: '3px',
                  height: `${Math.random() * 40 + 10}px`,
                  animationDelay: `${i * 50}ms`
                }}
              />
            ))}
          </div>
          
          <Button
            onClick={handlePlay}
            disabled={isPlaying}
            className="mt-6 bg-white text-stone-900 hover:bg-stone-100 px-8 py-3"
          >
            {isPlaying ? "Playing..." : "Listen to Homey"}
          </Button>
        </div>
        
        {/* Transcript */}
        <div className="bg-stone-50 rounded-xl p-6 text-left max-w-2xl mx-auto">
          <p className="text-stone-700 italic leading-relaxed">
            "Good morning! I noticed you usually grab coffee around this time. 
            There's a new place called Ritual Coffee just opened two blocks from you. 
            They roast their own beans and have that minimalist aesthetic you love. 
            Plus, they're playing some beautiful jazz this morning. 
            Should I save the location for you?"
          </p>
        </div>
      </div>
    </section>
  );
};
