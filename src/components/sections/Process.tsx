
export const Process = () => {
  const steps = [
    { id: "01", title: "YOU TELL HOMEY YOUR STORY", detail: "Through a quick chat or a simple form." },
    { id: "02", title: "IT LEARNS YOUR VIBE", detail: "Connects the dots from your old favorite places." },
    { id: "03", title: "FINDS YOUR NEW SPOTS", detail: "Creates a 'Nest' of personalized recommendations." },
    { id: "04", title: "YOU START LIVING, NOT SEARCHING", detail: "Settle in faster and feel at home sooner." },
  ];

  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-16 font-sans">
          HOW IT WORKS
        </h2>
        
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="grid md:grid-cols-4 gap-8 items-center border-b border-gray-200 pb-8 transition-colors duration-300 hover:bg-gray-50 -mx-4 px-4 cursor-default">
              <div className="font-mono text-2xl font-black">
                {step.id}
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-mono font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-mono">
                  {step.detail}
                </p>
              </div>
              <div className="text-right">
                <div className="w-8 h-0.5 bg-black ml-auto" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-100 p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-mono font-bold mb-4">[A PEEK AT THE MAGIC]</h4>
              <div className="bg-white p-4 border-2 border-black">
                <p className="font-mono text-sm">
                  "Hey, it's Homey. I noticed you loved that quiet bookstore back in Seattle. I found a spot here called 'South Congress Books' that has a similar feel—lots of natural light and a great poetry section. Think you'll like it."
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-mono font-bold mb-4">[YOUR NEW MAP]</h4>
              <div className="bg-black text-white p-4 font-mono text-sm leading-relaxed">
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
