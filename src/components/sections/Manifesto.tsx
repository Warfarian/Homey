import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { FloatingIconsBackground } from "../FloatingIconsBackground";
import { ThemeToggle } from "../ThemeToggle";
import { AtoBGraphic } from "../AtoBGraphic";
import { useQuery } from "@tanstack/react-query";
import localApi from "@/integrations/local-api/client";
import { Loader2, ShoppingCart, HeartPulse, Dumbbell, Palette, GlassWater, Utensils, Trees, Coffee, Briefcase, Church } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const categoryIcons: { [key: string]: React.ElementType } = {
    'Grocery': ShoppingCart,
    'Healthcare': HeartPulse,
    'Fitness': Dumbbell,
    'Arts & Culture': Palette,
    'Nightlife': GlassWater,
    'Restaurants': Utensils,
    'Parks & Nature': Trees,
    'Coffee Shops': Coffee,
    'Co-working': Briefcase,
    'Religious/Spiritual': Church,
};

const Dashboard = ({ profile }: { profile: { full_name: string, id: string } }) => {
    const { data: onboardingData, isLoading } = useQuery({
        queryKey: ['onboarding_responses', profile.id],
        queryFn: async () => {
            try {
                const data = await localApi.getOnboarding();
                return data;
            } catch (error) {
                console.error("Error fetching onboarding responses", error);
                return { categories: [] };
            }
        },
        enabled: !!profile.id,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin" />
            </div>
        );
    }
    
    return (
        <section className="min-h-screen w-full px-4 py-16 md:px-8 bg-background">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl font-bold font-serif mb-2">Welcome, {profile.full_name}.</h1>
                    <p className="text-xl text-muted-foreground">Based on your preferences, here are categories to explore.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {onboardingData?.categories?.map((category) => {
                        const Icon = categoryIcons[category] || Utensils;
                        return (
                            <Card key={category} className="hover:border-primary transition-colors">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base font-medium">{category}</CardTitle>
                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground pt-2">Top place suggestions coming soon.</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                     {(!onboardingData?.categories || onboardingData.categories.length === 0) && (
                        <Card className="sm:col-span-2 lg:col-span-3">
                            <CardContent className="pt-6">
                                <p className="text-muted-foreground">You didn't select any categories during onboarding. You can update your preferences in your profile settings.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    );
}

export const Manifesto = () => {
  const { session, loading: authLoading, user } = useAuth();
  const navigate = useNavigate();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
        if (!user) return null;
        try {
            const data = await localApi.getProfile();
            return data;
        } catch (error) {
            console.error("Error fetching profile", error);
            throw error;
        }
    },
    enabled: !!user,
  });

  const handleGetStarted = () => {
    navigate('/auth');
  };

  if (authLoading || (session && profileLoading)) {
    return (
      <section className="min-h-screen flex items-center justify-center px-8 py-16">
        <Loader2 className="h-8 w-8 animate-spin" />
      </section>
    );
  }

  if (session && profile) {
    if (profile.onboarding_completed) {
        return <Navigate to="/explore" replace />;
    } else {
        return <Navigate to="/onboarding" replace />;
    }
  }

  if (session && !profile && !profileLoading) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <section className="relative min-h-screen flex items-center px-8 py-16">
      <FloatingIconsBackground />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Title */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter leading-[0.8] font-serif transition-transform duration-300 hover:-rotate-1 origin-bottom-left cursor-pointer">
              HOMEY
            </h1>
            <p className="text-lg text-muted-foreground tracking-wider font-sans">
              [YOUR FRIEND IN A NEW TOWN]
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start flex-wrap">
            <Button 
              onClick={handleGetStarted}
              className="font-sans text-sm tracking-wider px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started →
            </Button>
          </div>

          <div className="pt-8">
            <AtoBGraphic />
          </div>
        </div>
        
        {/* Right: Problem Statement */}
        <div className="space-y-8 pt-16">
          <div className="border-l-2 border-primary pl-8 space-y-6">
            <p className="text-lg font-sans leading-relaxed">
              Moving is tough. It's not just about boxes. It's about finding your places again—the spots that make a city feel like home.
            </p>
            
            <p className="text-lg font-sans leading-relaxed">
              Homey is like a friend who already knows the city and gets your vibe. We help you skip the endless searching and start feeling like a local, faster.
            </p>
          </div>
          
          <div className="bg-secondary p-6 rounded-lg font-sans text-sm">
            <p className="mb-2 font-bold text-secondary-foreground">[A FRIENDLY NOTE]</p>
            <p className="text-muted-foreground">
              We get it. The stress of moving is real. It's more than just a change of address; it's a disruption of your daily rhythm. We're here to help you find that rhythm again, one coffee shop at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
