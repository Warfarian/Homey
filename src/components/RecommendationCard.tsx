import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Star, MapPin, ExternalLink } from "lucide-react";

export interface Recommendation {
  place_id: string;
  name: string;
  location: string;
  category: string;
  match_reason: string;
  match_score: number;
  google_maps_link?: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onSave: (recommendation: Recommendation) => void;
  isSaving: boolean;
}

export const RecommendationCard = ({ recommendation, onSave, isSaving }: RecommendationCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{recommendation.name}</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                {recommendation.category}
            </span>
            <span className="flex items-center gap-1">
                <Star className="text-amber-400 fill-amber-400 h-4 w-4" /> {recommendation.match_score}% Match
            </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm">{recommendation.match_reason}</p>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <Button onClick={() => onSave(recommendation)} className="w-full sm:w-auto flex-grow" disabled={isSaving}>
            <Bookmark className="mr-2 h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Place'}
        </Button>
        {recommendation.google_maps_link && (
            <Button asChild variant="outline" className="w-full sm:w-auto flex-grow">
                <a href={recommendation.google_maps_link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> View on Map
                </a>
            </Button>
        )}
      </CardFooter>
    </Card>
  );
};
