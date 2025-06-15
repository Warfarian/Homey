
import { MapPin, Heart } from 'lucide-react';

export const Nest = () => {
  const nestItems = [
    { old: "Blue Bottle, Oakland", new: "Radio Coffee, Austin", vibe: "For your morning brew" },
    { old: "Golden Gate Park Run", new: "Lady Bird Lake Trail", vibe: "For your daily escape" },
    { old: "Fellow Barber, NYC", new: "Finley's Barber Shop", vibe: "For a cut that feels right" },
    { old: "State Bird, SF", new: "Odd Duck, Austin", vibe: "For a memorable quiet dinner" }
  ];

  return (
    <section className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div>
              <p className="font-sans text-sm uppercase tracking-widest text-primary font-semibold mb-4">Your Personal Map</p>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-tight">
                What's in a Nest?
              </h2>
            </div>
            <p className="text-lg font-sans text-muted-foreground leading-relaxed">
              A Nest isn't a list of tourist traps. It's a carefully curated starter pack for your new life, filled with places that feel like they were made for you—because, in a way, they were.
            </p>
            <div className="bg-secondary p-8 rounded-xl border border-border">
               <h4 className="font-sans font-bold text-foreground mb-3">How We Find Your Spots</h4>
               <p className="font-sans text-sm text-muted-foreground">
                Homey listens to your story and understands what you loved about your old haunts—the vibe, the time of day you'd go, even the music. Then it finds the closest match in your new city. It's less data, more soul.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            {nestItems.map((item, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <p className="font-sans text-sm text-muted-foreground mb-3">{item.vibe}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 flex items-center space-x-2 text-foreground/70">
                    <Heart size={16} className="text-primary/50" />
                    <span className="font-sans text-sm">{item.old}</span>
                  </div>
                  <div className="text-primary font-bold text-lg">→</div>
                  <div className="flex-1 flex items-center space-x-2 text-foreground font-semibold">
                    <MapPin size={16} className="text-primary" />
                    <span className="font-sans text-sm">{item.new}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
