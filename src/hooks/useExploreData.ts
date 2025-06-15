
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

export const useExploreData = () => {
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

  return { recommendationsData, isLoadingRecommendations, generateNewRecommendationsMutation };
}
