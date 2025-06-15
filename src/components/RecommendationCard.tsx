
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Star, MapPin } from "lucide-react";

export interface Recommendation {
  place_id: string;
  name: string;
  location: string;
  category: string;
  match_reason: string;
  match_score: number;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onSave: (recommendation: Recommendation) => void;
  isSaving: boolean;
}

export const RecommendationCard = ({ recommendation, onSave, isSaving }: RecommendationCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{recommendation.name}</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
            <MapPin /> {recommendation.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                {recommendation.category}
            </span>
            <span className="flex items-center gap-1">
                <Star className="text-amber-400 fill-amber-400" /> {recommendation.match_score}% Match
            </span>
        </div>
        <p className="mt-4 text-sm">{recommendation.match_reason}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSave(recommendation)} className="w-full" disabled={isSaving}>
            <Bookmark className="mr-2" /> {isSaving ? 'Saving...' : 'Save Place'}
        </Button>
      </CardFooter>
    </Card>
  );
};
