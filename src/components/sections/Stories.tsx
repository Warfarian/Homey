
export const Stories = () => {
  const stories = [
    {
      quote: "Homey told me about a bookstore I now visit weekly. It felt… like it knew.",
      author: "Sarah Chen",
      location: "New to Berlin",
      img: "1500673922987-e212871fec22"
    },
    {
      quote: "The coffee shop recommendation came with the perfect timing. It's become my morning ritual.",
      author: "Marcus Rivera", 
      location: "Relocated to Austin",
      img: "1483058712412-4245e9b90334"
    },
    {
      quote: "It suggested a running path I never would have found. Now it's my favorite part of the day.",
      author: "Elena Kowalski",
      location: "Fresh in Portland",
      img: "1487958449943-2429e8be8625"
    }
  ];

  return (
    <section className="py-24 px-8 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-sans text-sm uppercase tracking-widest text-primary font-semibold mb-2">Success Stories</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            From new, to known.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.author} className="flex flex-col bg-background rounded-lg overflow-hidden border border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
              <div 
                className="aspect-video bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-${story.img}?q=80&w=800&auto=format&fit=crop')`,
                }}
              />
              <div className="p-6 flex-grow flex flex-col justify-between text-left">
                <blockquote className="text-base font-serif text-muted-foreground italic mb-4">
                  "{story.quote}"
                </blockquote>
                <div className="font-sans text-right">
                  <p className="font-bold text-foreground">{story.author}</p>
                  <p className="text-sm text-muted-foreground">{story.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
