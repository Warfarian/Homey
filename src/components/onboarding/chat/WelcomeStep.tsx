
import { ChatBubble } from "./ChatBubble";
import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
    name?: string;
    onNext: () => void;
}

export const WelcomeStep = ({ name, onNext }: WelcomeStepProps) => {
    return (
        <div className="flex flex-col items-start gap-6 w-full">
            <ChatBubble>
                <p className="text-lg">
                    Hi {name || 'there'}, I’m Homey 👋 
                    <br/><br/>
                    I’ll help you find your new city favorites — gyms, grocery stores, cafés and more — based on what you like. Ready?
                </p>
            </ChatBubble>
            <div className="self-end animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-500 fill-mode-forwards">
                 <Button onClick={onNext}>Let's go!</Button>
            </div>
        </div>
    );
};
