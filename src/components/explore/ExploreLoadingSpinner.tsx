
import { Loader2 } from "lucide-react";

export const ExploreLoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 gap-4">
      <Loader2 className="animate-spin h-8 w-8" />
      <p className="text-muted-foreground">Generating your personalized recommendations...</p>
    </div>
  );
};
