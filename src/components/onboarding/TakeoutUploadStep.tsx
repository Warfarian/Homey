
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, ExternalLink, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface TakeoutUploadStepProps {
  onSuccess: () => void;
}

export const TakeoutUploadStep = ({ onSuccess }: TakeoutUploadStepProps) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const [isParsing, setIsParsing] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            console.log("File selected:", files[0]);
            setIsParsing(true);
            
            // Simulate backend processing
            setTimeout(() => {
                toast({
                    title: "File processed!",
                    description: "We've analyzed your location history.",
                });
                setIsParsing(false);
                onSuccess();
            }, 3000);
        }
    };

    return (
        <Card className="w-full max-w-lg mx-auto text-left">
            <CardHeader>
                <CardTitle className="text-2xl font-bold font-serif">Upload Your History</CardTitle>
                <CardDescription>
                    To help me understand you better, please upload your Google Maps Timeline history from your Takeout download. It should be a JSON file. Don’t worry, we’ll guide you after this.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <a href="https://takeout.google.com/settings/takeout/custom/location_history" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 text-sm">
                        Go to Google Takeout <ExternalLink size={14}/>
                    </a>
                    <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md border">
                        <p><strong>Heads up:</strong> Google has changed its policy. You can now only download your location history (Timeline) as a JSON file from the Google Maps app on your phone. It is no longer available from the Takeout website on a computer.</p>
                    </div>
                    <Input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".json"
                        disabled={isParsing}
                    />
                    <Button onClick={handleUploadClick} variant="secondary" className="w-full" disabled={isParsing}>
                        {isParsing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Parsing...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Takeout File
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
