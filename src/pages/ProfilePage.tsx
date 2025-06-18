import { useQuery, useQueryClient } from "@tanstack/react-query";
import localApi from "@/integrations/local-api/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, User, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ProfileForm } from "@/components/ProfileForm";

const ProfilePage = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);

    const { data: profile, isLoading } = useQuery({
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
    
    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
        setIsEditing(false);
    }

    if (isLoading) {
        return (
            <section className="min-h-screen w-full flex justify-center items-center px-4 py-16 md:px-8 bg-background">
                <Loader2 className="animate-spin h-8 w-8" />
            </section>
        )
    }

    if (isEditing) {
        return (
             <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-16 md:px-8 bg-background">
                <ProfileForm 
                    onSuccess={handleSuccess} 
                    initialData={profile || {}}
                    title="Edit Your Profile"
                    description="Keep your information up to date."
                    submitButtonText="Save Changes"
                />
                <Button variant="ghost" onClick={() => setIsEditing(false)} className="mt-4">Cancel</Button>
            </section>
        )
    }

    return (
        <section className="min-h-screen w-full px-4 py-16 md:px-8 bg-background">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-wrap gap-4 justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold font-serif mb-2">My Profile</h1>
                        <p className="text-xl text-muted-foreground">Your personal information.</p>
                    </div>
                    <div>
                        <Button asChild variant="outline">
                            <Link to="/explore">Back to Explore</Link>
                        </Button>
                    </div>
                </div>
                
                { profile ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <User />
                                    {profile.full_name || 'Your Profile'}
                                </span>
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                                </Button>
                            </CardTitle>
                            <CardDescription>
                                Here are the details we have for you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div>
                                <h4 className="font-semibold">Full Name</h4>
                                <p className="text-muted-foreground">{profile.full_name || 'Not provided'}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Age</h4>
                                <p className="text-muted-foreground">{profile.age || 'Not provided'}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Gender</h4>
                                <p className="text-muted-foreground capitalize">{profile.gender?.replace(/-/g, ' ') || 'Not provided'}</p>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User />
                                Profile not found
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <p className="text-muted-foreground">We couldn't find your profile information. You may need to complete onboarding.</p>
                            <Button asChild variant="link" className="px-0">
                                <Link to="/onboarding">Go to Onboarding</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </section>
    );
};

export default ProfilePage;
