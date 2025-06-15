
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ChatBubble } from '@/components/onboarding/chat/ChatBubble';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

export type ChatOnboardingStep = 'welcome' | 'transport' | 'categories' | 'values' | 'tags' | 'review' | 'complete';

export const useChatFlow = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [step, setStep] = useState<ChatOnboardingStep>('welcome');
    const [onboardingData, setOnboardingData] = useState<any>({});
    const [completedSteps, setCompletedSteps] = useState<React.ReactNode[]>([]);
    const [isAiThinking, setIsAiThinking] = useState(false);

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

    const saveOnboardingData = useMutation({
        mutationFn: async (data: any) => {
            if (!user) throw new Error("User not found");

            const { error: responseError } = await supabase
                .from('onboarding_responses')
                .upsert({
                    user_id: user.id,
                    transport: data.transport,
                    categories: data.categories,
                    values: data.values,
                    tags: data.tags,
                }, { onConflict: 'user_id' });

            if (responseError) throw responseError;

            const { error: profileError } = await supabase
                .from('profiles')
                .update({ onboarding_completed: true })
                .eq('id', user.id);
            
            if (profileError) throw profileError;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
            toast({
                title: "Preferences saved!",
                description: "We're now tailoring your experience.",
            });
            
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

            setTimeout(() => {
                navigate('/');
            }, 2000);
        },
        onError: (error) => {
            console.error("Error saving onboarding data", error);
            toast({
                title: "Oh no!",
                description: "Something went wrong while saving your preferences. Please try again.",
                variant: "destructive"
            });
        }
    });

    const { mutate: getAiResponse } = useMutation({
        mutationFn: async (messages: { role: string; content: string }[]) => {
            const { data, error } = await supabase.functions.invoke('homey-chat-completion', {
                body: { messages },
            });
            if (error) {
                throw error;
            }
            return data.completion;
        },
        onSuccess: (completion: string) => {
            const aiResponseBubble = (
                <ChatBubble key="ai-welcome-response">
                    <p>{completion}</p>
                </ChatBubble>
            );
            setCompletedSteps(prev => [...prev, aiResponseBubble]);
            setStep('transport');
        },
        onError: (error) => {
            console.error("Error getting AI response", error);
            // Fallback: if AI fails, just move to the next step without AI message
            toast({
                title: "AI assistant hiccup!",
                description: "Couldn't get a response, but we can continue without it.",
                variant: "default",
            });
            setStep('transport');
        },
        onSettled: () => {
            setIsAiThinking(false);
        }
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
        setIsAiThinking(true);
        
        getAiResponse([
            { role: 'system', content: `You are Homey, a friendly and enthusiastic assistant helping a user named ${profile?.full_name || 'a new friend'} to find their new home. They just said they are ready to start. Your response should be short, one or two sentences. Express excitement and tell them you'll start with a few questions.` },
            { role: 'user', content: "Let's go!" }
        ]);
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
        saveOnboardingData.mutate(onboardingData);
    };

    return {
        isLoading,
        completedSteps,
        isAiThinking,
        step,
        profile,
        onboardingData,
        saveOnboardingData,
        handleWelcomeNext,
        handleTransportNext,
        handleCategoriesNext,
        handleValuesNext,
        handleTagsNext,
        handleReviewNext
    };
};
