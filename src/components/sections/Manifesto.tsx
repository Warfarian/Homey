
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { VoiceModal } from "@/components/modals/VoiceModal";
import { FormModal } from "@/components/modals/FormModal";

export const Manifesto = () => {
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  return (
    <section className="min-h-screen flex items-center px-8 py-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Title */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter leading-[0.8] font-sans transition-transform duration-300 hover:-rotate-1 origin-bottom-left cursor-pointer">
              HOMEY
            </h1>
            <p className="text-lg font-mono text-gray-600 tracking-wider">
              [YOUR FRIEND IN A NEW TOWN]
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start flex-wrap">
            <Button 
              onClick={() => setShowVoiceModal(true)}
              className="bg-black text-white hover:bg-gray-800 font-mono text-sm tracking-wider px-8 py-3 rounded-none border-2 border-black hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              TALK TO HOMEY →
            </Button>
            <Button 
              onClick={() => setShowFormModal(true)}
              variant="outline"
              className="font-mono text-sm tracking-wider px-8 py-3 rounded-none border-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              OR, USE A FORM
            </Button>
          </div>
        </div>
        
        {/* Right: Problem Statement */}
        <div className="space-y-8 pt-16">
          <div className="border-l-2 border-black pl-8 space-y-6">
            <p className="text-lg font-mono leading-relaxed">
              Moving is tough. It's not just about boxes. It's about finding your places again—the spots that make a city feel like home.
            </p>
            
            <p className="text-lg font-mono leading-relaxed">
              Homey is like a friend who already knows the city and gets your vibe. We help you skip the endless searching and start feeling like a local, faster.
            </p>
          </div>
          
          <div className="bg-gray-100 p-6 font-mono text-sm">
            <p className="mb-2">[A FRIENDLY NOTE]</p>
            <p>
              We get it. The stress of moving is real. It's more than just a change of address; it's a disruption of your daily rhythm. We're here to help you find that rhythm again, one coffee shop at a time.
            </p>
          </div>
        </div>
      </div>
      
      <VoiceModal isOpen={showVoiceModal} onClose={() => setShowVoiceModal(false)} />
      <FormModal isOpen={showFormModal} onClose={() => setShowFormModal(false)} />
    </section>
  );
};
