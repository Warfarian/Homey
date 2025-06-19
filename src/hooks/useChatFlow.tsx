import { useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import localApi from '@/integrations/local-api/client';
import { useAuth } from './useAuth';
import { ChatBubble } from '@/components/onboarding/chat/ChatBubble';

export interface OnboardingData {
  transport: string[];
  categories: string[];
  values: string[];
  tags: string[];
  additional_notes?: string;
  destination_city?: string;
}

type ChatStep = 'welcome' | 'transport' | 'categories' | 'values' | 'tags' | 'review' | 'complete';

export const useChatFlow = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<ChatStep>('welcome');
  const [completedSteps, setCompletedSteps] = useState<JSX.Element[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    transport: [],
    categories: [],
    values: [],
    tags: [],
    additional_notes: '',
    destination_city: ''
  });

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

  const saveOnboardingData = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");
      await localApi.saveOnboarding(onboardingData);
    },
    onSuccess: () => {
      setStep('complete');
      setTimeout(() => {
        navigate('/explore');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('Error saving onboarding data:', error);
    }
  });

  const addCompletedStep = useCallback((content: JSX.Element) => {
    setCompletedSteps(prev => [...prev, content]);
  }, []);

  const handleWelcomeNext = useCallback(() => {
    addCompletedStep(
      <ChatBubble key="welcome">
        Hi {profile?.full_name || 'there'}, I'm Homey 👋 
        <br/><br/>
        I'll help you find your new city favorites — gyms, grocery stores, cafés and more — based on what you like. Ready?
      </ChatBubble>
    );
    setStep('transport');
  }, [profile?.full_name, addCompletedStep]);

  const handleTransportNext = useCallback((transport: string[]) => {
    setOnboardingData(prev => ({ ...prev, transport }));
    addCompletedStep(
      <ChatBubble key="transport">
        How do you usually like to get around?
        <br/>
        <strong>Your answer:</strong> {transport.join(', ')}
      </ChatBubble>
    );
    setStep('categories');
  }, [addCompletedStep]);

  const handleCategoriesNext = useCallback((categories: string[]) => {
    setOnboardingData(prev => ({ ...prev, categories }));
    addCompletedStep(
      <ChatBubble key="categories">
        What kinds of places matter most to you?
        <br/>
        <strong>Your answer:</strong> {categories.join(', ')}
      </ChatBubble>
    );
    setStep('values');
  }, [addCompletedStep]);

  const handleValuesNext = useCallback((values: string[]) => {
    setOnboardingData(prev => ({ ...prev, values }));
    addCompletedStep(
      <ChatBubble key="values">
        What's most important to you about a place?
        <br/>
        <strong>Your answer:</strong> {values.join(', ')}
      </ChatBubble>
    );
    setStep('tags');
  }, [addCompletedStep]);

  const handleTagsNext = useCallback((tags: string[]) => {
    setOnboardingData(prev => ({ ...prev, tags }));
    addCompletedStep(
      <ChatBubble key="tags">
        Any specific keywords or tags for what you're looking for?
        <br/>
        <strong>Your answer:</strong> {tags.length > 0 ? tags.join(', ') : 'None specified'}
      </ChatBubble>
    );
    setStep('review');
  }, [addCompletedStep]);

  const handleReviewNext = useCallback(() => {
    saveOnboardingData.mutate();
  }, [saveOnboardingData]);

  const handleNotesUpdate = useCallback((notes: string) => {
    setOnboardingData(prev => ({ ...prev, additional_notes: notes }));
  }, []);

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
    handleReviewNext,
    handleNotesUpdate,
  };
};
