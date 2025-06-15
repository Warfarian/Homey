
import { useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Utensils, HeartPulse, Dumbbell, Palette, GlassWater, Trees, Coffee, Briefcase, Church, ShoppingCart } from 'lucide-react';

interface CategoriesStepProps {
    onNext: (data: string[]) => void;
}

const categories = [
    { value: 'Grocery', label: 'Grocery', icon: ShoppingCart },
    { value: 'Healthcare', label: 'Healthcare', icon: HeartPulse },
    { value: 'Fitness', label: 'Fitness', icon: Dumbbell },
    { value: 'Arts & Culture', label: 'Arts & Culture', icon: Palette },
    { value: 'Nightlife', label: 'Nightlife', icon: GlassWater },
    { value: 'Restaurants', label: 'Restaurants', icon: Utensils },
    { value: 'Parks & Nature', label: 'Parks & Nature', icon: Trees },
    { value: 'Coffee Shops', label: 'Coffee Shops', icon: Coffee },
    { value: 'Co-working', label: 'Co-working', icon: Briefcase },
    { value: 'Religious/Spiritual', label: 'Religious/Spiritual', icon: Church },
];

export const CategoriesStep = ({ onNext }: CategoriesStepProps) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [customCategory, setCustomCategory] = useState('');
    
    const handleNextClick = () => {
        const finalSelection = [...selected];
        if (customCategory.trim()) {
            finalSelection.push(customCategory.trim());
        }
        if (finalSelection.length > 0) {
            onNext(finalSelection);
        }
    };
    
    return (
        <div className="flex flex-col items-start gap-6 w-full">
            <ChatBubble>
                <p className="text-lg font-medium mb-4">What kinds of places matter most to you?</p>
                <ToggleGroup type="multiple" value={selected} onValueChange={setSelected} className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {categories.map(cat => (
                        <ToggleGroupItem key={cat.value} value={cat.label} className="flex flex-col h-24 gap-2 items-center justify-center text-center">
                            <cat.icon className="w-6 h-6" />
                            <span>{cat.label}</span>
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
                <Input 
                    placeholder="Add your own..." 
                    className="mt-4" 
                    value={customCategory} 
                    onChange={(e) => setCustomCategory(e.target.value)}
                />
            </ChatBubble>
            <div className="self-end animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-500 fill-mode-forwards">
                <Button onClick={handleNextClick} disabled={selected.length === 0 && !customCategory.trim()}>Continue</Button>
            </div>
        </div>
    );
};
