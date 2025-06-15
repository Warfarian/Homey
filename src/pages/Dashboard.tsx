
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Bookmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DashboardPage = () => {
    const { user } = useAuth();

    const { data: savedPlaces, isLoading } = useQuery({
        queryKey: ['saved_places', user?.id],
        queryFn: async () => {
            if (!user) return [];
            const { data, error } = await supabase
                .from('saved_places')
                .select('*')
                .eq('user_id', user.id);

            if (error) {
                console.error("Error fetching saved places", error);
                throw new Error(error.message);
            }
            return data;
        },
        enabled: !!user,
    });

    return (
        <section className="min-h-screen w-full px-4 py-16 md:px-8 bg-background">
             <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold font-serif mb-2">My Saved Places</h1>
                     <p className="text-xl text-muted-foreground">Your personal collection of places that feel like home.</p>
                     <div className="mt-4">
                        <Button asChild variant="outline">
                            <Link to="/explore">Explore Recommendations</Link>
                        </Button>
                    </div>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin h-8 w-8" />
                    </div>
                )}

                {!isLoading && (!savedPlaces || savedPlaces.length === 0) && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bookmark />
                                Your collection is empty
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">You haven't saved any places yet. Start by exploring recommendations and adding places you like!</p>
                        </CardContent>
                    </Card>
                )}
                
                {/* Placeholder for actual saved places */}
             </div>
        </section>
    );
};

export default DashboardPage;
