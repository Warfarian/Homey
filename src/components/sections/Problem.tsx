
export const Problem = () => {
  const questions = [
    "Where's my new go-to coffee spot?",
    "Found a good barber yet?",
    "Where can I go for a 7AM run?",
    "Is there a grocery store that just *gets* me?",
    "Who's going to be my new dentist?",
    "Any quiet spots to read a book?"
  ];

  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-black mb-8 font-sans">
              FEELING A LITTLE... LOST?
            </h2>
            <div className="bg-black text-white p-6 font-mono text-sm">
              <p>
                "The stress of moving isn't about finding A dentist. It's about finding YOUR dentist. The one that fits your vibe and doesn't play smooth jazz."
              </p>
              <p className="mt-4 text-gray-300">
                — Someone who's been there
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <p className="text-xl font-mono mb-12 leading-relaxed">
              You've handled the big stuff. The boxes are unpacked. But now comes the hard part: rebuilding your routine. It's the small, daily moments that make a place feel like home.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {questions.map((question, index) => (
                <div key={index} className="border-2 border-black p-6 bg-white transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md cursor-default">
                  <p className="font-mono text-lg">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
