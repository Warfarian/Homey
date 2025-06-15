
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceModal = ({ isOpen, onClose }: VoiceModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full p-8 relative">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-transparent hover:bg-gray-100 text-black"
        >
          <X size={20} />
        </Button>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-black mb-4 font-sans">
              VOICE ONBOARDING
            </h2>
            <p className="font-mono text-sm text-gray-600">
              [DEMO_MODE] - This is a preview of the onboarding experience
            </p>
          </div>
          
          <div className="bg-black text-green-400 p-6 font-mono text-sm">
            <p className="mb-4">&gt; Homey: Hi, I'm Homey. I help people settle into new cities.</p>
            <p className="mb-4">&gt; Tell me about where you just moved from and what you miss most.</p>
            <p className="mb-4">&gt; User: I moved from Portland to Austin. I miss my quiet coffee shop...</p>
            <p className="mb-4">&gt; Homey: Got it. What time did you usually go? What did you order?</p>
            <p>&gt; [CONVERSATION_CONTINUES...]</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4">
              <h3 className="font-mono font-bold mb-2">[WHAT_WE_LEARN]</h3>
              <ul className="font-mono text-sm space-y-1">
                <li>• Preferred times of day</li>
                <li>• Atmosphere preferences</li>
                <li>• Routine patterns</li>
                <li>• Social vs. solo preferences</li>
              </ul>
            </div>
            
            <div className="bg-gray-100 p-4">
              <h3 className="font-mono font-bold mb-2">[WHAT_WE_DON'T]</h3>
              <ul className="font-mono text-sm space-y-1">
                <li>• Your exact location</li>
                <li>• Financial information</li>
                <li>• Social connections</li>
                <li>• Personal relationships</li>
              </ul>
            </div>
          </div>
          
          <Button
            onClick={onClose}
            className="w-full bg-black text-white hover:bg-gray-800 font-mono tracking-wider py-3 rounded-none transition-transform duration-200 transform hover:scale-[1.03]"
          >
            OK, LET'S TALK →
          </Button>
        </div>
      </div>
    </div>
  );
};
