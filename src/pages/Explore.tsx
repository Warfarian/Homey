import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Compass, Bookmark, Star, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { RecommendationCard, Recommendation } from "@/components/RecommendationCard";

const mockRecommendations: Recommendation[] = [
  {
    place_id: "mock1",
    name: "The Artisan Bakery",
    location: "789 Flour St, Foodieville",
    category: "Bakery",
    match_reason: "You've shown interest in handcrafted pastries and local gems.",
    match_score: 94,
  },
  {
    place_id: "mock2",
    name: "Serenity Yoga Studio",
    location: "456 Zen Ave, Calm City",
    category: "Wellness",
    match_reason: "Matches your preference for peaceful and mindful activities.",
    match_score: 91,
  },
  {
    place_id: "mock3",
    name: "Riverside Park",
    location: "101 River Rd, Greenfield",
    category: "Park",
    match_reason: "A great spot for outdoor relaxation, which you enjoy.",
    match_score: 88,
  },
];

const ExplorePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: recommendationsData, isLoading } = useQuery({
    queryKey: ['explore_recommendations', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('explore_recommendations')
        .select('recommendations')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) {
        console.error("Error fetching recommendations", error);
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!user,
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
      }).select();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Place Saved!",
        description: "You can find it in your dashboard.",
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
  
  const actualRecommendations: Recommendation[] | undefined = recommendationsData?.recommendations as unknown as Recommendation[] | undefined;
  const displayRecommendations = actualRecommendations && actualRecommendations.length > 0 ? actualRecommendations : mockRecommendations;

  return (
    <section className="min-h-screen w-full px-4 py-16 md:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-serif mb-2">Explore</h1>
          <p className="text-xl text-muted-foreground">Welcome to your Homey dashboard. These are the places we think you'll love.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <Link to="/dashboard">View My Saved Places</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/profile">My Profile</Link>
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        )}

        {!isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayRecommendations.map((rec) => (
              <RecommendationCard 
                key={rec.place_id} 
                recommendation={rec} 
                onSave={handleSavePlace}
                isSaving={savePlaceMutation.isPending}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default ExplorePage;
