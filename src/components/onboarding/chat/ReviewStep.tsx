import { ChatBubble } from './ChatBubble';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface ReviewStepProps {
    data: {
        transport?: string[];
        categories?: string[];
        values?: string[];
        tags?: string[];
    };
    onNext: () => void;
    isLoading?: boolean;
}

const DataSection = ({ title, items }: { title: string, items?: string[] }) => {
    if (!items || items.length === 0) return null;
    return (
        <div>
            <h4 className="font-semibold text-muted-foreground mb-1">{title}</h4>
            <p className="text-sm">{items.join(', ')}</p>
        </div>
    )
}

export const ReviewStep = ({ data, onNext, isLoading }: ReviewStepProps) => {
    return (
        <div className="flex flex-col items-start gap-6 w-full">
            <ChatBubble>
                <p className="text-lg font-medium mb-4">Here’s what I’ve got. Does this look right?</p>
                <Card className="bg-background/50">
                    <CardContent className="pt-6 space-y-4">
                        <DataSection title="Getting Around" items={data.transport} />
                        <DataSection title="Important Places" items={data.categories} />
                        <DataSection title="Place Vibe" items={data.values} />
                        <DataSection title="Keywords" items={data.tags} />
                    </CardContent>
                </Card>
            </ChatBubble>
            <div className="self-end animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-500 fill-mode-forwards">
                 <Button onClick={onNext} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Looks good, finish!
                 </Button>
            </div>
        </div>
    );
};
