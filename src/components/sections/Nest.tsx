
export const Nest = () => {
  const nestItems = [
    { category: "MORNING_COFFEE", equivalent: "Equivalent of Bluebottle (Oakland) → Radio Coffee (Austin)" },
    { category: "WEEKEND_GROCERIES", equivalent: "Equivalent of Whole Foods (SOMA) → Central Market (North)" },
    { category: "RUNNING_ROUTE", equivalent: "Equivalent of Golden Gate Park → Lady Bird Lake Trail" },
    { category: "HAIRCUT", equivalent: "Equivalent of Fellow Barber → Finley's Barber Shop" },
    { category: "QUIET_DINNER", equivalent: "Equivalent of State Bird → Odd Duck" }
  ];

  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-black mb-8 font-sans">
              WHAT'S IN A NEST
            </h2>
            <p className="text-lg font-mono mb-8 leading-relaxed">
              Your new city's equivalent of the places that made your old city feel like home.
            </p>
            
            <div className="bg-black text-white p-6">
              <p className="font-mono text-sm mb-4">[ALGORITHM_OUTPUT]</p>
              <p className="font-mono text-sm">
                Pattern matching based on: visit frequency, time of day, 
                duration of stay, seasonal behavior, co-location with other activities.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {nestItems.map((item, index) => (
              <div key={index} className="border-2 border-black bg-white p-4 transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md cursor-default">
                <div className="font-mono text-sm text-gray-500 mb-2">
                  {item.category}
                </div>
                <div className="font-mono text-sm">
                  {item.equivalent}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-white border-2 border-black p-8">
            <p className="font-mono text-lg">
              YOUR NEST = BEHAVIORAL CONTINUITY
            </p>
            <p className="font-mono text-sm text-gray-600 mt-2">
              Not just places. Patterns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
