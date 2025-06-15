
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceModal = ({ isOpen, onClose }: VoiceModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-background max-w-2xl w-full p-8 relative rounded-lg shadow-2xl">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 rounded-full"
        >
          <X size={20} />
        </Button>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-black mb-4 font-serif">
              VOICE ONBOARDING
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              [DEMO_MODE] - This is a preview of the onboarding experience
            </p>
          </div>
          
          <div className="bg-foreground text-green-400 p-6 font-mono text-sm rounded-md">
            <p className="mb-4">&gt; Homey: Hi, I'm Homey. I help people settle into new cities.</p>
            <p className="mb-4">&gt; Tell me about where you just moved from and what you miss most.</p>
            <p className="mb-4">&gt; User: I moved from Portland to Austin. I miss my quiet coffee shop...</p>
            <p className="mb-4">&gt; Homey: Got it. What time did you usually go? What did you order?</p>
            <p>&gt; [CONVERSATION_CONTINUES...]</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary p-4 rounded-md">
              <h3 className="font-sans font-bold mb-2">[WHAT_WE_LEARN]</h3>
              <ul className="font-sans text-sm space-y-1 text-muted-foreground">
                <li>• Preferred times of day</li>
                <li>• Atmosphere preferences</li>
                <li>• Routine patterns</li>
                <li>• Social vs. solo preferences</li>
              </ul>
            </div>
            
            <div className="bg-secondary p-4 rounded-md">
              <h3 className="font-sans font-bold mb-2">[WHAT_WE_DON'T]</h3>
              <ul className="font-sans text-sm space-y-1 text-muted-foreground">
                <li>• Your exact location</li>
                <li>• Financial information</li>
                <li>• Social connections</li>
                <li>• Personal relationships</li>
              </ul>
            </div>
          </div>
          
          <Button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans tracking-wider py-3 rounded-lg transition-transform duration-200 transform hover:scale-[1.03]"
          >
            OK, LET'S TALK →
          </Button>
        </div>
      </div>
    </div>
  );
};
