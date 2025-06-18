import { useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

interface CityStepProps {
    onNext: (city: string) => void;
}

export const CityStep = ({ onNext }: CityStepProps) => {
    const [city, setCity] = useState('');

    const handleNextClick = () => {
        if (city.trim()) {
            onNext(city.trim());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && city.trim()) {
            handleNextClick();
        }
    };
    
    return (
        <div className="flex flex-col items-start gap-6 w-full">
            <ChatBubble>
                <p className="text-lg font-medium mb-4">
                    <MapPin className="inline w-5 h-5 mr-2" />
                    What city are you moving to?
                </p>
                <Input 
                    placeholder="e.g. Austin, TX or London, UK" 
                    className="text-lg"
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                />
                <p className="text-sm text-muted-foreground mt-2">
                    This helps me find the best local spots for you!
                </p>
            </ChatBubble>
            <div className="self-end animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-500 fill-mode-forwards">
                <Button onClick={handleNextClick} disabled={!city.trim()}>Continue</Button>
            </div>
        </div>
    );
};
