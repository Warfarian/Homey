import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { RecommendationCard, Recommendation } from "@/components/RecommendationCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMemo } from "react";

const ExplorePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: recommendationsData, isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ['explore_recommendations', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('explore_recommendations')
        .select('recommendations, updated_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching recommendations", error);
        throw new Error(error.message);
      }
      
      const oneDay = 24 * 60 * 60 * 1000;
      if (!data || !data.recommendations || (new Date().getTime() - new Date(data.updated_at).getTime()) > oneDay) {
        console.log("Generating new recommendations...");
        const { data: generatedData, error: generationError } = await supabase.functions.invoke('generate-recommendations', {
          body: { userId: user.id },
        });
        
        if (generationError) {
          console.error("Error generating recommendations", generationError);
          toast({
            title: "Could not generate recommendations",
            description: "There was an issue creating your personalized recommendations. Please try again later.",
            variant: "destructive",
          });
          throw new Error(generationError.message);
        }
        return generatedData;
      }

      return data;
    },
    enabled: !!user,
  });

  const generateNewRecommendationsMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");
      const { data, error } = await supabase.functions.invoke('generate-recommendations', {
        body: { userId: user.id },
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      toast({ title: "New Recommendations Generated!", description: "We've refreshed your recommendations." });
      queryClient.invalidateQueries({ queryKey: ['explore_recommendations', user?.id] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Generating Recommendations",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const savePlaceMutation = useMutation({
    mutationFn: async (recommendation: Recommendation) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase.from("saved_places").insert({
        user_id: user.id,
        place_id: recommendation.place_id,
        name: recommendation.name,
        location: recommendation.location,
        category: recommendation.category,
        match_score: recommendation.match_score,
        match_reason: recommendation.match_reason,
        google_maps_link: recommendation.google_maps_link,
      }).select();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (_data, variables) => {
      toast({
        title: "Place Saved!",
        description: `${variables.name} has been saved to your dashboard.`,
        action: (
          <Button asChild variant="link" className="text-white">
            <Link to="/dashboard">View Dashboard</Link>
          </Button>
        ),
      });
      queryClient.invalidateQueries({ queryKey: ['saved_places', user?.id] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Saving Place",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSavePlace = (recommendation: Recommendation) => {
    savePlaceMutation.mutate(recommendation);
  };

  const recommendations: Recommendation[] = (recommendationsData?.recommendations as Recommendation[]) || [];

  const categorizedRecommendations = useMemo(() => {
    if (!recommendations || recommendations.length === 0) return [];
    
    const grouped = recommendations.reduce((acc, rec) => {
      const category = rec.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(rec);
      return acc;
    }, {} as Record<string, Recommendation[]>);

    return Object.entries(grouped)
      .map(([category, recs]) => ({
        category,
        recommendations: recs,
        maxScore: Math.max(...recs.map(r => r.match_score || 0)),
      }))
      .sort((a, b) => b.maxScore - a.maxScore);
  }, [recommendations]);

  const isLoading = isLoadingRecommendations || generateNewRecommendationsMutation.isPending;

  return (
    <section className="min-h-screen w-full px-4 py-16 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-serif mb-2">Explore</h1>
          <p className="text-xl text-muted-foreground">Your personalized recommendations are here. Discover places you'll love.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <Link to="/dashboard">My Saved Places</Link>
            </Button>
            <Button 
              variant="default" 
              onClick={() => generateNewRecommendationsMutation.mutate()}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Refresh Recommendations
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <Loader2 className="animate-spin h-8 w-8" />
            <p className="text-muted-foreground">Generating your personalized recommendations...</p>
          </div>
        )}

        {!isLoading && categorizedRecommendations.length === 0 && (
           <div className="text-center py-16 bg-card border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">No Recommendations Yet</h2>
            <p className="text-muted-foreground mb-4">We couldn't find any recommendations. Try generating some!</p>
            <Button 
              onClick={() => generateNewRecommendationsMutation.mutate()}
              disabled={generateNewRecommendationsMutation.isPending}
            >
              {generateNewRecommendationsMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate My Recommendations
            </Button>
          </div>
        )}

        {!isLoading && categorizedRecommendations.length > 0 && (
          <div className="space-y-12">
            {categorizedRecommendations.map(({ category, recommendations: recs }) => (
              <div key={category}>
                <h2 className="text-3xl font-bold font-serif mb-6">{category}</h2>
                <Carousel
                  opts={{
                    align: "start",
                    loop: recs.length > 3,
                    slidesToScroll: 1,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {recs.map((rec) => (
                      <CarouselItem key={rec.place_id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                           <RecommendationCard 
                              recommendation={rec} 
                              onSave={handleSavePlace}
                              isSaving={savePlaceMutation.isPending && savePlaceMutation.variables?.place_id === rec.place_id}
                            />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default ExplorePage;
