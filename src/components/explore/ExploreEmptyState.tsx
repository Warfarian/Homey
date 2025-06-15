
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ExploreEmptyStateProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

export const ExploreEmptyState = ({ onGenerate, isGenerating }: ExploreEmptyStateProps) => {
  return (
    <div className="text-center py-16 bg-card border rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">No Recommendations Yet</h2>
      <p className="text-muted-foreground mb-4">We couldn't find any recommendations. Try generating some!</p>
      <Button 
        onClick={onGenerate}
        disabled={isGenerating}
      >
        {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Generate My Recommendations
      </Button>
    </div>
  );
};
