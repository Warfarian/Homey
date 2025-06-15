
export const BrandPhilosophy = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 leading-tight">
              Moving isn't about<br />
              <span className="italic">packing boxes.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-stone-700 leading-relaxed font-light">
              <p>
                It's about finding rhythm. Finding a café that remembers your coffee. 
                A walk that clears your head. A face that becomes familiar.
              </p>
              
              <p>
                Homey understands that settling in isn't about maps or reviews. 
                It's about discovering the small moments that make a place feel yours.
              </p>
              
              <p>
                We believe technology should feel like intuition. 
                Recommendations should feel like whispers from a friend who truly knows you.
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div 
              className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=3011&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
