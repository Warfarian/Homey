
import { WelcomeStep } from './WelcomeStep';
import { TransportStep } from './TransportStep';
import { CategoriesStep } from './CategoriesStep';
import { ValuesStep } from './ValuesStep';
import { TagsStep } from './TagsStep';
import { ReviewStep } from './ReviewStep';
import { Loader2 } from 'lucide-react';
import { ChatBubble } from './ChatBubble';
import React from 'react';
import { useChatFlow } from '@/hooks/useChatFlow';

export const ChatFlow = () => {
    const {
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
    } = useChatFlow();

    if (isLoading) {
        return <div className="flex justify-center items-center h-32"><Loader2 className="animate-spin" /></div>
    }

    const renderCurrentStep = () => {
        if (isAiThinking) {
            return (
                <ChatBubble>
                    <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Thinking...</span>
                    </div>
                </ChatBubble>
            );
        }

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
                return <ReviewStep 
                    data={onboardingData} 
                    onNext={handleReviewNext} 
                    isLoading={saveOnboardingData.isPending}
                    onNotesChange={handleNotesUpdate} 
                />;
            case 'complete':
                 return <ChatBubble>All done! Taking you to your personalized dashboard now...</ChatBubble>;
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
