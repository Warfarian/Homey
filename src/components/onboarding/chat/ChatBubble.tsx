
import { Bot } from "lucide-react";
import React from "react";

export const ChatBubble = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-start gap-4 animate-in fade-in-0 slide-in-from-bottom-5 duration-500">
            <div className="bg-primary/10 p-2 rounded-full">
                <Bot className="w-6 h-6 text-primary" />
            </div>
            <div className="bg-muted rounded-lg p-4 max-w-lg">
                {children}
            </div>
        </div>
    );
};
