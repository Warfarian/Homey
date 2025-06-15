
export const Process = () => {
  const steps = [
    { title: "Share Your Story", detail: "Through a friendly chat or a simple form, you tell us about the places and routines you loved in your old city." },
    { title: "We Find The Vibe", detail: "Homey analyzes the unique atmosphere—the sights, sounds, and feelings—that made those spots special to you." },
    { title: "Discover Your Nest", detail: "We deliver a curated 'Nest' of places in your new city that match the soul of your old favorites." },
    { title: "Live, Don't Search", detail: "Settle in faster by stepping into places that already feel familiar, so you can focus on building your new life." },
  ];

  return (
    <section className="py-24 px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-sans text-sm uppercase tracking-widest text-primary font-semibold mb-4">The Process</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-tight">
            How Homey Works Its Magic
          </h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 bg-background border-4 border-primary/20 rounded-full mb-6">
                <span className="font-serif text-2xl font-bold text-primary">{`0${index + 1}`}</span>
              </div>
              <h3 className="text-lg font-bold font-sans text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-background p-10 rounded-xl shadow-lg border border-border">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
               <h4 className="font-sans text-sm uppercase tracking-widest text-primary font-semibold">A Peek at the Magic</h4>
               <p className="font-serif text-xl text-foreground italic">
                "Hey, it's Homey. I noticed you loved that quiet bookstore back in Seattle. I found a spot here called 'South Congress Books' that has a similar feel—lots of natural light and a great poetry section. Think you'll like it."
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border/50">
              <h4 className="font-sans text-sm uppercase tracking-widest text-primary font-semibold mb-4">Your New Map</h4>
              <div className="font-sans text-sm space-y-2 text-foreground/80">
                <p>✓ Your go-to morning coffee</p>
                <p>✓ The perfect quiet park</p>
                <p>✓ A barber that gets it right</p>
                <p>✓ That grocery store with your favorite snacks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
