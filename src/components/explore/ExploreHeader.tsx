
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ExploreHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export const ExploreHeader = ({ onRefresh, isLoading }: ExploreHeaderProps) => {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold font-serif mb-2">Explore</h1>
      <p className="text-xl text-muted-foreground">Your personalized recommendations are here. Discover places you'll love.</p>
      <div className="mt-4 flex flex-wrap gap-4">
        <Button asChild variant="outline">
          <Link to="/dashboard">My Saved Places</Link>
        </Button>
        <Button 
          variant="default" 
          onClick={onRefresh}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Refresh Recommendations
        </Button>
      </div>
    </div>
  );
};
