
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Mic, PhoneOff } from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';

interface VoiceOnboardingStepProps {
  onSuccess: () => void;
}

const retellClient = new RetellWebClient();

export const VoiceOnboardingStep = ({ onSuccess }: VoiceOnboardingStepProps) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Component did mount
    retellClient.on('conversationStarted', () => {
      console.log('Conversation started');
    });

    retellClient.on('conversationEnded', ({ code, reason }) => {
      console.log('Conversation ended:', { code, reason });
      setIsCalling(false);
      // The webhook handles data saving. We can proceed on the frontend.
      onSuccess();
    });

    retellClient.on('error', (error) => {
      console.error('Retell client error:', error);
      setError('An error occurred during the call. Please try again.');
      setIsCalling(false);
    });

    // Component will unmount
    return () => {
      // It's good practice to clean up listeners, though Retell's SDK might handle this.
      // For simplicity, we're not removing them here but would in a production app.
    };
  }, [onSuccess]);

  const startCall = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: funcError } = await supabase.functions.invoke('create-retell-call');
      if (funcError) throw funcError;
      
      await retellClient.startCall({
          call_id: data.call_id,
          sample_rate: data.sample_rate,
          enable_update: data.enable_update,
      });

      setIsCalling(true);
    } catch (err: any) {
      console.error('Failed to start call:', err);
      setError(err.message || 'Failed to start the call. Ensure your Retell Agent ID is correct.');
    } finally {
      setIsLoading(false);
    }
  };

  const stopCall = () => {
    retellClient.stopCall();
  };

  return (
    <div className="w-full max-w-2xl text-center mx-auto">
      <h1 className="text-3xl font-bold font-serif mb-2">Let's talk!</h1>
      <p className="text-xl text-muted-foreground mb-12">
        Click the button below to start a conversation with Homey to personalize your recommendations.
      </p>

      <div className="flex justify-center items-center h-40">
        {!isCalling ? (
          <Button onClick={startCall} disabled={isLoading} size="lg" className="rounded-full w-32 h-32">
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <Mic className="w-12 h-12" />
            )}
            <span className="sr-only">Start Call</span>
          </Button>
        ) : (
          <Button onClick={stopCall} variant="destructive" size="lg" className="rounded-full w-32 h-32">
            <PhoneOff className="w-12 h-12" />
            <span className="sr-only">End Call</span>
          </Button>
        )}
      </div>
      {error && <p className="text-destructive mt-4">{error}</p>}
      {isCalling && <p className="text-muted-foreground mt-4">Conversation in progress...</p>}
    </div>
  );
};
