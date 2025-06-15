import { useState, useEffect, useRef } from "react";
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
import { VoiceOnboardingStep } from "@/components/onboarding/VoiceOnboardingStep";

type OnboardingStep = 'profile' | 'takeout_upload' | 'path_choice' | 'chat_flow' | 'voice_flow';

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
  const [initialStepDetermined, setInitialStepDetermined] = useState(false);
  const isRedirecting = useRef(false);

  useEffect(() => {
    // If onboarding is complete, redirect to home. The ref prevents multiple redirects.
    if (profile?.onboarding_completed) {
      if (!isRedirecting.current) {
        console.log("Onboarding Page: Profile shows onboarding is complete. Initiating redirect.");
        isRedirecting.current = true;
        // Only redirect if we're not in the chat flow step to avoid conflicts
        if (step !== 'chat_flow') {
          navigate('/explore');
        }
      }
      return;
    }

    if (isLoadingProfile || initialStepDetermined) {
      return;
    }

    if (profile) {
      console.log("Onboarding Page: Determining initial step.");
      setInitialStepDetermined(true);
      // Onboarding is not complete, so figure out where to start.
      const isProfileComplete = !!(profile.full_name && profile.age && profile.gender);
      if (isProfileComplete) {
        setStep('takeout_upload');
      } else {
        setStep('profile');
      }
    } else if (user && !isLoadingProfile) {
      console.log("Onboarding Page: User exists, but no profile. Starting with profile form.");
      setInitialStepDetermined(true);
      setStep('profile');
    }
  }, [isLoadingProfile, profile, user, navigate, initialStepDetermined, step]);

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
      setStep('voice_flow');
    }
  };

  const handleVoiceOnboardingSuccess = () => {
    console.log("Voice onboarding successful, checking for redirect...");
    // The webhook handles setting onboarding_completed.
    // Invalidate the profile query to refetch, which will trigger the redirect in useEffect.
    queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
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
      case 'voice_flow':
        return <VoiceOnboardingStep onSuccess={handleVoiceOnboardingSuccess} />;
      default:
        return null;
    }
  };

  // If we know onboarding is done, show a dedicated redirecting screen.
  // This prevents flashing the regular onboarding UI while the useEffect triggers the redirect.
  if (profile?.onboarding_completed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-muted-foreground">Onboarding complete! Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      {isLoadingProfile && !initialStepDetermined ? (
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
