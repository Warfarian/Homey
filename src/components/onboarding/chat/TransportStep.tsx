
import { useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Footprints, Bike, Car, TramFront } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TransportStepProps {
    onNext: (data: string[]) => void;
}

const options = [
    { value: 'Walk', label: 'Walk', icon: Footprints },
    { value: 'Bike', label: 'Bike', icon: Bike },
    { value: 'Drive', label: 'Drive', icon: Car },
    { value: 'Public Transport', label: 'Public Transport', icon: TramFront },
]

export const TransportStep = ({ onNext }: TransportStepProps) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [other, setOther] = useState('');
    const [showOtherInput, setShowOtherInput] = useState(false);

    const handleNextClick = () => {
        const finalSelection = [...selected];
        if (other.trim()) {
            finalSelection.push(other.trim());
        }
        if(finalSelection.length > 0) {
            onNext(finalSelection);
        }
    };
    
    return (
        <div className="flex flex-col items-start gap-6 w-full">
            <ChatBubble>
                <p className="text-lg font-medium mb-4">How do you usually like to get around?</p>
                <ToggleGroup type="multiple" value={selected} onValueChange={setSelected} className="flex-wrap justify-start gap-2">
                    {options.map(opt => (
                        <ToggleGroupItem key={opt.value} value={opt.label} className="flex gap-2 items-center">
                            <opt.icon className="w-4 h-4" />
                            {opt.label}
                        </ToggleGroupItem>
                    ))}
                     <ToggleGroupItem value="other" onClick={() => setShowOtherInput(!showOtherInput)} data-state={showOtherInput ? 'on' : 'off'}>
                        Other
                    </ToggleGroupItem>
                </ToggleGroup>
                {showOtherInput && (
                     <Input 
                        placeholder="e.g. Scooter" 
                        className="mt-4 animate-in fade-in-0" 
                        value={other} 
                        onChange={(e) => setOther(e.target.value)} 
                    />
                )}
            </ChatBubble>
            <div className="self-end animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-500 fill-mode-forwards">
                <Button onClick={handleNextClick} disabled={selected.length === 0 && !other.trim()}>Continue</Button>
            </div>
        </div>
    );
};
