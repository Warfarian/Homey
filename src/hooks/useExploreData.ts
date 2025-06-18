import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import localApi from "@/integrations/local-api/client";
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
      
      try {
        const data = await localApi.getRecommendations();
        
        // If no recommendations or stale, generate new ones
        if (!data.recommendations || data.stale) {
          console.log("Generating new recommendations...");
          const generatedData = await localApi.generateRecommendations();
          return generatedData;
        }

        return data;
      } catch (error: any) {
        console.error("Error fetching recommendations", error);
        toast({
          title: "Could not fetch recommendations",
          description: "There was an issue loading your recommendations. Please try again later.",
          variant: "destructive",
        });
        throw new Error(error.message);
      }
    },
    enabled: !!user,
  });

  const generateNewRecommendationsMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");
      return await localApi.generateRecommendations();
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
