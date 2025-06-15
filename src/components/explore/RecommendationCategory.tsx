
import { Recommendation, RecommendationCard } from "@/components/RecommendationCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface RecommendationCategoryProps {
  category: string;
  recommendations: Recommendation[];
  onSave: (recommendation: Recommendation) => void;
  isSaving: boolean;
  savingPlaceId?: string;
}

export const RecommendationCategory = ({ category, recommendations, onSave, isSaving, savingPlaceId }: RecommendationCategoryProps) => {
  if (recommendations.length === 0) return null;
  
  return (
    <div>
      <h2 className="text-3xl font-bold font-serif mb-6">{category}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: recommendations.length > 3,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {recommendations.map((rec) => (
            <CarouselItem key={rec.place_id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                 <RecommendationCard 
                    recommendation={rec} 
                    onSave={onSave}
                    isSaving={isSaving && savingPlaceId === rec.place_id}
                  />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};
