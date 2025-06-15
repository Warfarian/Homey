import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FormModal } from "@/components/modals/FormModal";
import { VoiceModal } from "@/components/modals/VoiceModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Mic, ArrowRight } from "lucide-react";
import { UploadDataCard } from "@/components/UploadDataCard";

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-5xl font-bold font-serif mb-2">Welcome, {user ? user.email?.split('@')[0] : 'friend'}!</h1>
        <p className="text-xl text-muted-foreground mb-12">Let's find your new favorite places. How should we get to know you?</p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg"><Bot className="w-6 h-6 text-primary" /></div>
                <CardTitle>Chat with AI</CardTitle>
              </div>
              <CardDescription className="pt-2">Answer a few questions in a form-style chat.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button onClick={() => setIsFormModalOpen(true)} className="w-full">Start Chat <ArrowRight className="ml-2" /></Button>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col border-primary/50 ring-1 ring-primary/50 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg"><Mic className="w-6 h-6 text-primary" /></div>
                <CardTitle>Talk to Homey</CardTitle>
              </div>
              <CardDescription className="pt-2">Have a natural conversation with our voice assistant.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button onClick={() => setIsVoiceModalOpen(true)} className="w-full">Start Talking <ArrowRight className="ml-2" /></Button>
            </CardContent>
          </Card>

          <UploadDataCard />
        </div>

        <Button onClick={handleLogout} variant="outline" className="mt-12">Logout</Button>
      </div>
      <FormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} />
      <VoiceModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
    </div>
  );
};

export default Onboarding;
