
import { useMemo } from "react";
import { Recommendation } from "@/components/RecommendationCard";
import { useExploreData } from "@/hooks/useExploreData";
import { useSavedPlaces } from "@/hooks/useSavedPlaces";
import { ExploreHeader } from "@/components/explore/ExploreHeader";
import { ExploreLoadingSpinner } from "@/components/explore/ExploreLoadingSpinner";
import { ExploreEmptyState } from "@/components/explore/ExploreEmptyState";
import { RecommendationCategory } from "@/components/explore/RecommendationCategory";

const ExplorePage = () => {
  const { recommendationsData, isLoadingRecommendations, generateNewRecommendationsMutation } = useExploreData();
  const { savedPlaceIds, handleSavePlace, savePlaceMutation } = useSavedPlaces();

  const allRecommendations: Recommendation[] = (recommendationsData?.recommendations as Recommendation[]) || [];

  const categorizedRecommendations = useMemo(() => {
    if (!allRecommendations || allRecommendations.length === 0) return [];

    const unsavedRecommendations = allRecommendations.filter(rec => !savedPlaceIds.has(rec.place_id));
    
    const grouped = unsavedRecommendations.reduce((acc, rec) => {
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
  }, [allRecommendations, savedPlaceIds]);

  const isLoading = isLoadingRecommendations || generateNewRecommendationsMutation.isPending;

  return (
    <section className="min-h-screen w-full px-4 py-16 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ExploreHeader 
          onRefresh={() => generateNewRecommendationsMutation.mutate()}
          isLoading={isLoading}
        />

        {isLoading && <ExploreLoadingSpinner />}

        {!isLoading && categorizedRecommendations.length === 0 && (
           <ExploreEmptyState
              onGenerate={() => generateNewRecommendationsMutation.mutate()}
              isGenerating={generateNewRecommendationsMutation.isPending}
           />
        )}

        {!isLoading && categorizedRecommendations.length > 0 && (
          <div className="space-y-12">
            {categorizedRecommendations.map(({ category, recommendations: recs }) => (
              <RecommendationCategory
                key={category}
                category={category}
                recommendations={recs}
                onSave={handleSavePlace}
                isSaving={savePlaceMutation.isPending}
                savingPlaceId={savePlaceMutation.variables?.place_id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default ExplorePage;
