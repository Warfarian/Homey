
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, ExternalLink } from "lucide-react";
import React from "react";
import { useToast } from "@/components/ui/use-toast";

export const UploadDataCard = () => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            console.log("Files selected:", Array.from(files));
            // Here you would handle the file upload logic
            toast({
                title: "File(s) selected!",
                description: `${files.length} file(s) ready for processing.`,
            });
        }
    };

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg"><Upload className="w-6 h-6 text-primary" /></div>
                    <CardTitle>Upload Data</CardTitle>
                </div>
                <CardDescription className="pt-2">
                    Securely upload your Google Maps location history.
                    <a href="https://takeout.google.com/settings/takeout/custom/location_history" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 mt-1 text-sm">
                        Go to Google Takeout <ExternalLink size={14}/>
                    </a>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
                <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    // Google Takeout for location history provides JSON files.
                    accept=".json"
                    multiple
                />
                <Button onClick={handleUploadClick} variant="secondary" className="w-full">
                    Upload File(s)
                </Button>
            </CardContent>
        </Card>
    );
};
