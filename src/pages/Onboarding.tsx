
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold font-serif mb-4">Welcome to Homey!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          {user ? `We're glad to have you, ${user.email?.split('@')[0] || 'friend'}.` : "Let's get you settled in."}
        </p>
        <div className="bg-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Your journey starts here.</h2>
          <p className="text-muted-foreground mb-6">In the next steps, we'll ask you a few questions to help find your new favorite places. This page is where you'll choose how to share your preferences.</p>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
