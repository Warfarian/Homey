
export const Nest = () => {
  const nestItems = [
    { category: "MORNING_COFFEE", equivalent: "Equivalent of Blue Bottle (Oakland) → Radio Coffee (Austin)" },
    { category: "WEEKEND_GROCERIES", equivalent: "Equivalent of Whole Foods (SOMA) → Central Market (North)" },
    { category: "RUNNING_ROUTE", equivalent: "Equivalent of Golden Gate Park → Lady Bird Lake Trail" },
    { category: "HAIRCUT", equivalent: "Equivalent of Fellow Barber → Finley's Barber Shop" },
    { category: "QUIET_DINNER", equivalent: "Equivalent of State Bird → Odd Duck" }
  ];

  return (
    <section className="py-24 px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-black mb-8 font-serif">
              WHAT'S IN A NEST?
            </h2>
            <p className="text-lg font-sans mb-8 leading-relaxed">
              Think of it as a starter pack for your new life, filled with places that feel like they're already yours.
            </p>
            
            <div className="bg-foreground text-background p-6 rounded-lg shadow-lg">
              <p className="font-sans text-sm mb-4 font-bold">[HOW WE FIND YOUR SPOTS]</p>
              <p className="font-sans text-sm text-background/80">
                Homey listens to your story and understands what you loved about your old haunts—the vibe, the time of day you'd go, even the music. Then it finds the closest match in your new city.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {nestItems.map((item, index) => (
              <div key={index} className="border border-border bg-card p-4 rounded-lg transition-all duration-300 hover:bg-accent hover:-translate-y-1 hover:shadow-lg cursor-default">
                <div className="font-sans text-sm text-muted-foreground mb-2">
                  {item.category}
                </div>
                <div className="font-sans text-sm">
                  {item.equivalent}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-card border border-border p-8 rounded-lg shadow-md">
            <p className="font-sans text-lg font-bold">
              YOUR NEST = A SENSE OF BELONGING
            </p>
            <p className="font-sans text-sm text-muted-foreground mt-2">
              Less searching, more living.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
