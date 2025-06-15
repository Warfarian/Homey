
export const Process = () => {
  const steps = [
    { id: "01", title: "YOU TELL HOMEY YOUR STORY", detail: "Through a quick chat or a simple form." },
    { id: "02", title: "IT LEARNS YOUR VIBE", detail: "Connects the dots from your old favorite places." },
    { id: "03", title: "FINDS YOUR NEW SPOTS", detail: "Creates a 'Nest' of personalized recommendations." },
    { id: "04", title: "YOU START LIVING, NOT SEARCHING", detail: "Settle in faster and feel at home sooner." },
  ];

  return (
    <section className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-16 font-serif">
          HOW IT WORKS
        </h2>
        
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="grid md:grid-cols-4 gap-8 items-center border-b border-border pb-8 transition-colors duration-300 hover:bg-accent -mx-4 px-4 cursor-default rounded-lg">
              <div className="font-sans text-2xl font-black text-primary">
                {step.id}
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-sans font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-sans">
                  {step.detail}
                </p>
              </div>
              <div className="text-right">
                <div className="w-8 h-0.5 bg-foreground/20 ml-auto" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-secondary p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-sans font-bold mb-4 text-secondary-foreground">[A PEEK AT THE MAGIC]</h4>
              <div className="bg-card p-4 border border-border rounded-md shadow-sm">
                <p className="font-sans text-sm text-foreground italic">
                  "Hey, it's Homey. I noticed you loved that quiet bookstore back in Seattle. I found a spot here called 'South Congress Books' that has a similar feel—lots of natural light and a great poetry section. Think you'll like it."
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-sans font-bold mb-4 text-secondary-foreground">[YOUR NEW MAP]</h4>
              <div className="bg-foreground text-background p-4 font-mono text-sm leading-relaxed rounded-md shadow-sm">
                <p className="text-green-400"><span className="text-gray-500">$</span> homey --settle-in="austin"</p>
                <p className="text-gray-400">Analyzing your routine...</p>
                <p className="text-green-400">Matching your vibe...</p>
                <p className="text-white font-bold">✓ Your Nest is ready!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
