
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const LaunchCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "ENROLLMENT_CONFIRMED",
        description: "You're now in the beta queue. We'll contact you soon.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-32 px-8 bg-foreground text-background">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-6xl md:text-7xl font-black mb-8 font-serif tracking-tighter">
            READY TO FEEL
          </h2>
          <h2 className="text-6xl md:text-7xl font-black mb-12 font-serif tracking-tighter">
            AT HOME?
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8 mb-16">
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="EMAIL_ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent border-2 border-background/50 text-background placeholder:text-background/60 font-sans rounded-lg focus:ring-primary focus:border-primary transition-colors"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-background text-foreground hover:bg-background/90 font-sans tracking-wider px-8 rounded-lg transition-transform duration-200 transform hover:scale-105"
            >
              {isSubmitting ? "PROCESSING..." : "JOIN BETA →"}
            </Button>
          </div>
        </form>
        
        <div className="bg-background/10 p-8 font-sans text-sm rounded-lg">
          <p className="mb-4 font-bold">[PRIVACY_COMMITMENT]</p>
          <p className="text-background/80">
            Your data stays yours. Homey uses only what you consent to provide. 
            No tracking. No selling. No surveillance capitalism.
          </p>
          <p className="mt-4 text-background/60">
            Questions? Email us at research@homey.ai
          </p>
        </div>
      </div>
    </section>
  );
};
