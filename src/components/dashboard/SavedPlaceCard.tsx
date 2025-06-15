
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ExternalLink } from "lucide-react";

export interface SavedPlace {
  id: string;
  place_id: string;
  name: string;
  location: string;
  category: string;
  match_reason: string;
  match_score: number;
  google_maps_link?: string;
}

interface SavedPlaceCardProps {
  place: SavedPlace;
}

export const SavedPlaceCard = ({ place }: SavedPlaceCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{place.name}</CardTitle>
        <CardDescription className="flex items-start gap-2 pt-1">
            <MapPin className="mt-1 h-4 w-4 flex-shrink-0" />
            <span>{place.location}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                {place.category}
            </span>
            {place.match_score && (
              <span className="flex items-center gap-1">
                  <Star className="text-amber-400 fill-amber-400 h-4 w-4" /> {place.match_score}% Match
              </span>
            )}
        </div>
        {place.match_reason && <p className="mt-4 text-sm">{place.match_reason}</p>}
      </CardContent>
      <CardFooter className="flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:justify-end">
        {place.google_maps_link && (
            <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href={place.google_maps_link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> View on Map
                </a>
            </Button>
        )}
      </CardFooter>
    </Card>
  );
};
