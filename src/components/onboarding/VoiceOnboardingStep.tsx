import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import localApi from '@/integrations/local-api/client';
import { Loader2, PhoneOutgoing, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VoiceOnboardingStepProps {
  onSuccess: () => void;
}

export const VoiceOnboardingStep = ({ onSuccess }: VoiceOnboardingStepProps) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isCalling && !isLoading) {
      // After the call is initiated, start polling to check if the webhook has marked onboarding as complete.
      intervalId = setInterval(() => {
        onSuccess(); // This invalidates the profile query in the parent component.
      }, 5000); // Check every 5 seconds.
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isCalling, isLoading, onSuccess]);

  const startCall = async () => {
    if (!phoneNumber.trim()) {
        setError('Please enter your phone number.');
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await localApi.createRetellCall(phoneNumber);
      setIsCalling(true);
    } catch (err: any) {
      console.error('Failed to start call:', err);
      setError(err.message || 'Failed to start the call. Please check the number and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCalling) {
    return (
      <div className="w-full max-w-2xl text-center mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-2">Calling you now...</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Please answer the call from +15075193337 to continue. The page will redirect automatically when you're done.
        </p>
        <div className="flex justify-center items-center h-40">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Waiting for call to complete...</p>
            </div>
        </div>
        {error && <p className="text-destructive mt-4">{error}</p>}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl text-center mx-auto">
      <h1 className="text-3xl font-bold font-serif mb-2">Let's talk!</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Enter your phone number below and we'll call you to personalize your recommendations.
      </p>
      
      {/* Demo Link */}
      <div className="mb-8">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open('https://drive.google.com/drive/folders/1SItf4KvZF2u9IC2X1zYWWSDfCOqIF3-9?usp=sharing', '_blank', 'noopener,noreferrer')}
          className="mb-4"
        >
          <Play className="w-4 h-4 mr-2" />
          Listen to Demo Call
        </Button>
        <p className="text-sm text-muted-foreground">
          Hear what a conversation with Homey sounds like
        </p>
      </div>

      <div className="max-w-sm mx-auto space-y-4">
          <div className="text-left">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isLoading}
              />
          </div>
          <Button onClick={startCall} disabled={isLoading} size="lg" className="w-full">
              {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                  <>
                    <PhoneOutgoing className="mr-2" /> Call Me
                  </>
              )}
          </Button>
      </div>
      {error && <p className="text-destructive mt-4">{error}</p>}
    </div>
  );
};
