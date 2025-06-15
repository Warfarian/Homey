
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { VoiceModal } from "@/components/modals/VoiceModal";

export const Manifesto = () => {
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  return (
    <section className="min-h-screen flex items-center px-8 py-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Title */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter leading-[0.8] font-sans">
              HOMELY
            </h1>
            <p className="text-lg font-mono text-gray-600 tracking-wider">
              [AI-ASSISTED CITY ADAPTATION]
            </p>
          </div>
          
          <Button 
            onClick={() => setShowVoiceModal(true)}
            className="bg-black text-white hover:bg-gray-800 font-mono text-sm tracking-wider px-8 py-3 rounded-none border-2 border-black hover:bg-white hover:text-black transition-colors duration-200"
          >
            START ONBOARDING →
          </Button>
        </div>
        
        {/* Right: Problem Statement */}
        <div className="space-y-8 pt-16">
          <div className="border-l-2 border-black pl-8 space-y-6">
            <p className="text-lg font-mono leading-relaxed">
              27M people move cities in the US every year. Yet most city adaptation tools 
              prioritize logistics, not lifestyle continuity.
            </p>
            
            <p className="text-lg font-mono leading-relaxed">
              Homely solves for habit displacement using AI.
            </p>
          </div>
          
          <div className="bg-gray-100 p-6 font-mono text-sm">
            <p className="mb-2">[RESEARCH_NOTE]</p>
            <p>
              Moving ranks among the top 5 most stressful life events — 
              ahead of divorce, job loss, or illness. The disruption isn't 
              just spatial; it's behavioral pattern rupture.
            </p>
          </div>
        </div>
      </div>
      
      <VoiceModal isOpen={showVoiceModal} onClose={() => setShowVoiceModal(false)} />
    </section>
  );
};
