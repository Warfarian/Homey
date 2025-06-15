
export const Process = () => {
  const steps = [
    { title: "Share Your Story", detail: "Tell us about the places and routines you loved in your old city." },
    { title: "We Find The Vibe", detail: "Homey analyzes the unique atmosphere that made those spots special." },
    { title: "Discover Your Nest", detail: "Get a curated 'Nest' of places in your new city that match your old favorites." },
    { title: "Live, Don't Search", detail: "Settle in faster by stepping into places that already feel familiar." },
  ];

  return (
    <section className="py-24 px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-sans text-sm uppercase tracking-widest text-primary font-semibold mb-2">How It Works</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
            Your New City, Personalized
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-background p-8 rounded-lg border border-border/50 text-left space-y-4 transition-all hover:shadow-lg hover:-translate-y-1">
              <span className="font-serif text-4xl font-bold text-primary/40">{`0${index + 1}`}</span>
              <h3 className="text-xl font-bold font-sans text-foreground !mt-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
