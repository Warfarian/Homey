
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Mic, ArrowRight } from "lucide-react";

interface PathChoiceStepProps {
    onPathSelect: (path: 'chat' | 'voice') => void;
}

export const PathChoiceStep = ({ onPathSelect }: PathChoiceStepProps) => {
    return (
        <div className="w-full max-w-4xl text-center">
            <h1 className="text-3xl font-bold font-serif mb-2">Great! I’ve analyzed your past places.</h1>
            <p className="text-xl text-muted-foreground mb-12">Now, how would you like to personalize your recommendations?</p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
                <Card className="flex flex-col cursor-pointer hover:border-primary transition-colors" onClick={() => onPathSelect('voice')}>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg"><Mic className="w-8 h-8 text-primary" /></div>
                            <CardTitle className="text-2xl">Talk to Homey</CardTitle>
                        </div>
                        <CardDescription className="pt-2">Have a natural conversation with our voice assistant.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                        <Button className="w-full" variant="outline" onClick={(e) => { e.stopPropagation(); onPathSelect('voice'); }}>
                            Start Talking <ArrowRight className="ml-2" />
                        </Button>
                    </CardContent>
                </Card>
                
                <Card className="flex flex-col border-primary ring-2 ring-primary shadow-lg cursor-pointer" onClick={() => onPathSelect('chat')}>
                     <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg"><Bot className="w-8 h-8 text-primary" /></div>
                            <CardTitle className="text-2xl">Chat with Homey</CardTitle>
                        </div>
                        <CardDescription className="pt-2">Answer a few questions in a friendly, conversational form.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                        <Button className="w-full" onClick={(e) => { e.stopPropagation(); onPathSelect('chat'); }}>
                            Start Chatting <ArrowRight className="ml-2" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
