
export const Process = () => {
  const steps = [
    { id: "01", title: "USER MOVES", detail: "Relocation event occurs" },
    { id: "02", title: "HOMELY ONBOARDS", detail: "Via conversation + preferences" },
    { id: "03", title: "ANALYZES MAPS HISTORY", detail: "Pattern recognition from past behavior" },
    { id: "04", title: "RECOMMENDS YOUR NEST", detail: "Curated local equivalents" },
    { id: "05", title: "YOU LIVE, NOT SEARCH", detail: "Behavioral continuity restored" }
  ];

  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-16 font-sans">
          HOW IT WORKS
        </h2>
        
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.id} className="grid md:grid-cols-4 gap-8 items-center border-b border-gray-200 pb-8">
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
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-4">[AUDIO_SAMPLE]</h4>
              <div className="bg-white p-4 border-2 border-black">
                <p className="font-mono text-sm">
                  "Hi, it's Homely. I found three coffee shops that match your 
                  morning routine. The first one opens at 6:30 and has that 
                  quiet corner table you like..."
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-mono font-bold mb-4">[INTERFACE_PREVIEW]</h4>
              <div className="bg-black text-green-400 p-4 font-mono text-sm">
                <p>$ homely --location="austin, tx"</p>
                <p>$ analyzing behavioral patterns...</p>
                <p>$ generating local matches...</p>
                <p>$ nest created ✓</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
