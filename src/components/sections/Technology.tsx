
export const Technology = () => {
  const partners = [
    "Retell AI",
    "Twilio", 
    "Google Maps",
    "Gemini",
    "Claude"
  ];

  return (
    <section className="py-24 px-6 bg-stone-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-light text-stone-900 mb-6">
          Technology, <span className="italic">elegantly hidden</span>
        </h2>
        
        <p className="text-lg text-stone-600 mb-12 font-light leading-relaxed">
          Crafted with privacy-first AI, and a love for everyday elegance.
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="text-stone-500 font-medium tracking-wide text-sm"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
