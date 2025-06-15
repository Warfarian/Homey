
import { useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TagsStepProps {
    onNext: (data: string[]) => void;
}

export const TagsStep = ({ onNext }: TagsStepProps) => {
    const [tags, setTags] = useState('');
    
    const handleNextClick = () => {
        const finalTags = tags.split(',').map(tag => tag.trim()).filter(Boolean);
        if (finalTags.length > 0) {
            onNext(finalTags);
        } else {
            onNext([]); // Allow skipping
        }
    };
    
    return (
        <div className="flex flex-col items-start gap-6 w-full">
            <ChatBubble>
                <p className="text-lg font-medium mb-4">Any specific keywords or tags for what you're looking for? (e.g. "vegan", "live music", "dog park")</p>
                <p className="text-sm text-muted-foreground mb-4">Separate tags with a comma. This is optional.</p>
                <Input 
                    placeholder="e.g. vegan, live music, dog park" 
                    value={tags} 
                    onChange={(e) => setTags(e.target.value)}
                />
            </ChatBubble>
            <div className="self-end animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-500 fill-mode-forwards">
                <Button onClick={handleNextClick}>Continue</Button>
            </div>
        </div>
    );
};
