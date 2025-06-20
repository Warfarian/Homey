
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Phone } from "lucide-react";

interface AudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioModal = ({ isOpen, onClose }: AudioModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-center mb-6">
            Listen to Homey
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isPlaying ? 'bg-green-500 border-green-500 scale-110' : 'border-muted hover:border-muted-foreground'}`}>
              <Phone className={`w-8 h-8 ${isPlaying ? 'text-white animate-pulse' : 'text-muted-foreground'}`} />
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-muted-foreground italic">
              "Hey Sarah, I found this cozy bookstore called Chapter & Verse about 10 minutes from your new place. They have that poetry section you mentioned loving, plus they serve single-origin coffee. Want me to save it for you?"
            </p>
          </div>
          
          <Button 
            onClick={handlePlay}
            disabled={isPlaying}
            variant="secondary"
            className="w-full"
          >
            {isPlaying ? "Playing..." : "Play Sample Call"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
