
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { WelcomeStep } from './WelcomeStep';
import { TransportStep } from './TransportStep';
import { CategoriesStep } from './CategoriesStep';
import { ValuesStep } from './ValuesStep';
import { TagsStep } from './TagsStep';
import { ReviewStep } from './ReviewStep';
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

    const handleValuesNext = (data: string[]) => {
        setOnboardingData(prev => ({ ...prev, values: data }));
        
        const question = (
            <ChatBubble key="values-q">
                <p className="text-lg font-medium">What's most important to you about a place?</p>
            </ChatBubble>
        );
        const answer = (
             <div key="values-a" className="self-end bg-primary text-primary-foreground p-3 rounded-lg max-w-sm animate-in fade-in-0">
                <p>{data.join(', ')}</p>
            </div>
        );

        setCompletedSteps(prev => [...prev, question, answer]);
        setStep('tags');
    };

    const handleTagsNext = (data: string[]) => {
        setOnboardingData(prev => ({ ...prev, tags: data }));
        
        const question = (
            <ChatBubble key="tags-q">
                <p className="text-lg font-medium">Any specific keywords or tags for what you're looking for?</p>
            </ChatBubble>
        );
        const answer = (
             <div key="tags-a" className="self-end bg-primary text-primary-foreground p-3 rounded-lg max-w-sm animate-in fade-in-0">
                <p>{data.join(', ')}</p>
            </div>
        );

        setCompletedSteps(prev => [...prev, question, answer]);
        setStep('review');
    };
    
    const handleReviewNext = () => {
        // In the next phase, we'll save this data to the database.
        console.log("Final Onboarding Data:", onboardingData);

        const question = (
            <ChatBubble key="review-q">
                 <p className="text-lg font-medium">Here’s what I’ve got. Does this look right?</p>
            </ChatBubble>
        );
        const answer = (
             <div key="review-a" className="self-end bg-primary text-primary-foreground p-3 rounded-lg max-w-sm animate-in fade-in-0">
                <p>Looks good, finish!</p>
            </div>
        );

        setCompletedSteps(prev => [...prev, question, answer]);
        setStep('complete');
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
                return <ValuesStep onNext={handleValuesNext} />;
            case 'tags':
                return <TagsStep onNext={handleTagsNext} />;
            case 'review':
                return <ReviewStep data={onboardingData} onNext={handleReviewNext} />;
            case 'complete':
                 return <ChatBubble>All done! I'm now finding recommendations based on your preferences.</ChatBubble>;
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
