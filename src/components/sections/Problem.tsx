
export const Problem = () => {
  const questions = [
    "Where will I get a haircut?",
    "Which café will become mine?",
    "Where do I run at 7AM?",
    "Who's my new dentist?",
    "Which grocery store feels right?"
  ];

  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-black mb-8 font-sans">
              THE PROBLEM
            </h2>
            <div className="bg-black text-white p-6 font-mono text-sm">
              <p>
                "Moving is among the top 5 most stressful events — ahead of 
                divorce, job loss, or illness."
              </p>
              <p className="mt-4 text-gray-300">
                — American Psychological Association
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <p className="text-xl font-mono mb-12 leading-relaxed">
              The stress isn't about finding A dentist. It's about finding YOUR dentist. 
              The one that fits your Tuesday 3PM schedule and doesn't play jazz.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {questions.map((question, index) => (
                <div key={index} className="border-2 border-black p-6 bg-white">
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
