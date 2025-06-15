import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileForm } from "@/components/ProfileForm";
import { TakeoutUploadStep } from "@/components/onboarding/TakeoutUploadStep";
import { PathChoiceStep } from "@/components/onboarding/PathChoiceStep";
import { useToast } from "@/components/ui/use-toast";
import { ChatFlow } from "@/components/onboarding/chat/ChatFlow";

type OnboardingStep = 'profile' | 'takeout_upload' | 'path_choice' | 'chat_flow';

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile", error);
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!user,
  });

  const [step, setStep] = useState<OnboardingStep>('profile');

  const isProfileComplete = !!(profile && profile.full_name && profile.age && profile.gender);

  useEffect(() => {
    if (isLoadingProfile) {
      return;
    }

    if (profile) {
      if (profile.onboarding_completed) {
        navigate('/');
        return;
      }
      if (isProfileComplete) {
        setStep('takeout_upload');
      } else {
        setStep('profile');
      }
    } else {
      // No profile exists, stay on the profile creation step
      setStep('profile');
    }
  }, [isLoadingProfile, profile, navigate, isProfileComplete]);

  const handleProfileUpdateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    setStep('takeout_upload');
  };

  const handleTakeoutUploadSuccess = () => {
    setStep('path_choice');
  };

  const handlePathChoice = (path: 'chat' | 'voice') => {
    if (path === 'chat') {
      setStep('chat_flow');
    } else {
      toast({
        title: "Coming Soon!",
        description: "Voice onboarding will be available shortly.",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const renderStepContent = () => {
    switch (step) {
      case 'profile':
        return <ProfileForm onSuccess={handleProfileUpdateSuccess} />;
      case 'takeout_upload':
        return <TakeoutUploadStep onSuccess={handleTakeoutUploadSuccess} />;
      case 'path_choice':
        return <PathChoiceStep onPathSelect={handlePathChoice} />;
      case 'chat_flow':
        return <ChatFlow />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      {isLoadingProfile ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl animate-in fade-in-0 duration-500">
          {renderStepContent()}
          <div className="text-center">
            <Button onClick={handleLogout} variant="outline" className="mt-12">Logout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
