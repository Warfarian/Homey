
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const WaitlistCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to the journey",
        description: "You're now on the Homey waitlist. We'll be in touch soon."
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return <section id="waitlist" className="py-32 px-6 bg-foreground">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-background mb-8 leading-tight">
          Begin your next chapter<br />
          <span className="italic">with Homey.</span>
        </h2>
        
        <p className="text-xl text-background/80 mb-12 font-light">
          Join the waitlist for early access to your personal city companion.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="flex-1 bg-background/5 border-background/20 text-background placeholder:text-background/60 focus:border-primary focus:ring-primary" 
            />
            <Button type="submit" disabled={isSubmitting} size="lg" className="px-8 whitespace-nowrap">
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </div>
        </form>
      </div>
    </section>;
};
