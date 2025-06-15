
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Compass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ExplorePage = () => {
    const { user } = useAuth();

    const { data: recommendations, isLoading } = useQuery({
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

    return (
        <section className="min-h-screen w-full px-4 py-16 md:px-8 bg-background">
             <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold font-serif mb-2">Explore</h1>
                    <p className="text-xl text-muted-foreground">Welcome to your Nested dashboard. These are the places we think you'll love.</p>
                    <div className="mt-4">
                        <Button asChild variant="outline">
                            <Link to="/dashboard">View My Saved Places</Link>
                        </Button>
                    </div>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin h-8 w-8" />
                    </div>
                )}

                {!isLoading && !recommendations && (
                    <Card className="sm:col-span-2 lg:col-span-3">
                        <CardHeader>
                           <CardTitle className="flex items-center gap-2">
                                <Compass />
                                Recommendations on the way!
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Our AI is curating the best places for you based on your preferences. Please check back soon.</p>
                        </CardContent>
                    </Card>
                )}

                {/* Placeholder for actual recommendations */}
             </div>
        </section>
    );
};

export default ExplorePage;
