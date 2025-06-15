import { ChatBubble } from './ChatBubble';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ReviewStepProps {
    data: {
        transport?: string[];
        categories?: string[];
        values?: string[];
        tags?: string[];
        additional_notes?: string;
    };
    onNext: () => void;
    isLoading?: boolean;
    onNotesChange: (notes: string) => void;
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

export const ReviewStep = ({ data, onNext, isLoading, onNotesChange }: ReviewStepProps) => {
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
                        <div className="space-y-2 pt-2">
                            <Label htmlFor="additional-notes" className="font-semibold text-muted-foreground">Anything else to add? (Optional)</Label>
                            <Textarea
                                id="additional-notes"
                                placeholder="e.g., I'm looking for a place near a dog park, or I prefer modern architecture."
                                value={data.additional_notes || ''}
                                onChange={(e) => onNotesChange(e.target.value)}
                                className="bg-background"
                            />
                        </div>
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
