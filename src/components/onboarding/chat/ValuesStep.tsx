
import { useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Footprints, ShieldCheck, VolumeX, Baby, PartyPopper, CircleDollarSign, Sprout, Dog } from 'lucide-react';

interface ValuesStepProps {
    onNext: (data: string[]) => void;
}

const values = [
    { value: 'Walkability', label: 'Walkability', icon: Footprints },
    { value: 'Safety', label: 'Safety', icon: ShieldCheck },
    { value: 'Quiet', label: 'Quiet', icon: VolumeX },
    { value: 'Family-Friendly', label: 'Family-Friendly', icon: Baby },
    { value: 'Vibrant', label: 'Vibrant', icon: PartyPopper },
    { value: 'Affordability', label: 'Affordability', icon: CircleDollarSign },
    { value: 'Green Space', label: 'Green Space', icon: Sprout },
    { value: 'Dog-Friendly', label: 'Dog-Friendly', icon: Dog },
];

export const ValuesStep = ({ onNext }: ValuesStepProps) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [customValue, setCustomValue] = useState('');
    
    const handleNextClick = () => {
        const finalSelection = [...selected];
        if (customValue.trim()) {
            finalSelection.push(customValue.trim());
        }
        if (finalSelection.length > 0) {
            onNext(finalSelection);
        }
    };
    
    return (
        <div className="flex flex-col items-start gap-6 w-full">
            <ChatBubble>
                <p className="text-lg font-medium mb-4">What's most important to you about a place?</p>
                <ToggleGroup type="multiple" value={selected} onValueChange={setSelected} className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {values.map(val => (
                        <ToggleGroupItem key={val.value} value={val.label} className="flex flex-col h-24 gap-2 items-center justify-center text-center">
                            <val.icon className="w-6 h-6" />
                            <span>{val.label}</span>
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
                <Input 
                    placeholder="Add your own..." 
                    className="mt-4" 
                    value={customValue} 
                    onChange={(e) => setCustomValue(e.target.value)}
                />
            </ChatBubble>
            <div className="self-end animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-500 fill-mode-forwards">
                <Button onClick={handleNextClick} disabled={selected.length === 0 && !customValue.trim()}>Continue</Button>
            </div>
        </div>
    );
};
