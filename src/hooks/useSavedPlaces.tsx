
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { Recommendation } from "@/components/RecommendationCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export const useSavedPlaces = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: savedPlaces } = useQuery({
        queryKey: ['saved_places', user?.id],
        queryFn: async () => {
            if (!user) return [];
            const { data, error } = await supabase
                .from('saved_places')
                .select('place_id')
                .eq('user_id', user.id);
            if (error) {
                console.error("Error fetching saved places", error);
                return [];
            }
            return data;
        },
        enabled: !!user,
    });

    const savedPlaceIds = useMemo(() => {
        return new Set(savedPlaces?.map((p) => p.place_id));
    }, [savedPlaces]);

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
    
    return {
        savedPlaceIds,
        handleSavePlace,
        savePlaceMutation
    }
}
