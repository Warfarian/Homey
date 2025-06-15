
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { WelcomeStep } from './WelcomeStep';
import { TransportStep } from './TransportStep';
import { CategoriesStep } from './CategoriesStep';
import { Loader2 } from 'lucide-react';
import { ChatBubble } from './ChatBubble';
import React from 'react';

type ChatOnboardingStep = 'welcome' | 'transport' | 'categories' | 'values' | 'tags' | 'review' | 'complete';

export const ChatFlow = () => {
    const { user } = useAuth();
    const [step, setStep] = useState<ChatOnboardingStep>('welcome');
    const [onboardingData, setOnboardingData] = useState<any>({});
    const [completedSteps, setCompletedSteps] = useState<React.ReactNode[]>([]);

    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile', user?.id],
        queryFn: async () => {
            if (!user) return null;
            const { data, error } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', user.id)
                .single();
            if (error) {
                console.error("Error fetching profile name", error);
                return null;
            }
            return data;
        },
        enabled: !!user,
    });

    const handleWelcomeNext = () => {
        const welcomeMessage = (
            <ChatBubble key="welcome-q">
                <p className="text-lg">
                    Hi {profile?.full_name || 'there'}, I’m Homey 👋 
                    <br/><br/>
                    I’ll help you find your new city favorites — gyms, grocery stores, cafés and more — based on what you like. Ready?
                </p>
            </ChatBubble>
        );
        const welcomeAnswer = (
            <div key="welcome-a" className="self-end bg-primary text-primary-foreground p-3 rounded-lg max-w-sm animate-in fade-in-0">
                <p>Let's go!</p>
            </div>
        );

        setCompletedSteps([welcomeMessage, welcomeAnswer]);
        setStep('transport');
    };

    const handleTransportNext = (data: string[]) => {
        setOnboardingData(prev => ({ ...prev, transport: data }));
        
        const transportQuestion = (
            <ChatBubble key="transport-q">
                <p className="text-lg font-medium">How do you usually like to get around?</p>
            </ChatBubble>
        );
        const transportAnswer = (
             <div key="transport-a" className="self-end bg-primary text-primary-foreground p-3 rounded-lg max-w-sm animate-in fade-in-0">
                <p>{data.join(', ')}</p>
            </div>
        );

        setCompletedSteps(prev => [...prev, transportQuestion, transportAnswer]);
        setStep('categories');
    };

    const handleCategoriesNext = (data: string[]) => {
        setOnboardingData(prev => ({ ...prev, categories: data }));
        
        const question = (
            <ChatBubble key="categories-q">
                <p className="text-lg font-medium">What kinds of places matter most to you?</p>
            </ChatBubble>
        );
        const answer = (
             <div key="categories-a" className="self-end bg-primary text-primary-foreground p-3 rounded-lg max-w-sm animate-in fade-in-0">
                <p>{data.join(', ')}</p>
            </div>
        );

        setCompletedSteps(prev => [...prev, question, answer]);
        setStep('values');
    }
    
    if (isLoading) {
        return <div className="flex justify-center items-center h-32"><Loader2 className="animate-spin" /></div>
    }

    const renderCurrentStep = () => {
        switch (step) {
            case 'welcome':
                return <WelcomeStep name={profile?.full_name} onNext={handleWelcomeNext} />;
            case 'transport':
                return <TransportStep onNext={handleTransportNext} />;
            case 'categories':
                return <CategoriesStep onNext={handleCategoriesNext} />;
            case 'values':
                return <ChatBubble>Next up: What's important to you in a neighborhood or place?</ChatBubble>
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6 flex flex-col">
            {completedSteps}
            <div className="w-full">
                {renderCurrentStep()}
            </div>
        </div>
    );
};
