import { useState, useCallback } from 'react';
import localApi from '@/integrations/local-api/client';
import { useAuth } from './useAuth';

export interface OnboardingData {
  transport: string[];
  categories: string[];
  values: string[];
  tags: string[];
  additional_notes?: string;
  destination_city?: string;
}

export const useChatFlow = () => {
  const { user } = useAuth();
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    transport: [],
    categories: [],
    values: [],
    tags: [],
    additional_notes: '',
    destination_city: ''
  });

  const updateOnboardingData = useCallback((updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  }, []);

  const saveOnboardingData = useCallback(async () => {
    if (!user) throw new Error("User not authenticated");
    
    try {
      await localApi.saveOnboarding(onboardingData);
      return { success: true };
    } catch (error: any) {
      console.error('Error saving onboarding data:', error);
      throw new Error(error.message);
    }
  }, [user, onboardingData]);

  const getChatCompletion = useCallback(async (messages: any[]) => {
    try {
      const response = await localApi.chatCompletion(messages);
      return response.completion;
    } catch (error: any) {
      console.error('Error getting chat completion:', error);
      throw new Error(error.message);
    }
  }, []);

  return {
    onboardingData,
    updateOnboardingData,
    saveOnboardingData,
    getChatCompletion
  };
};
