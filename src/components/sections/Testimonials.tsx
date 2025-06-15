
export const Testimonials = () => {
  const testimonials = [
    {
      quote: "Homey told me about a bookstore I now visit weekly. It felt… like it knew.",
      author: "Sarah Chen",
      location: "New to Berlin"
    },
    {
      quote: "The coffee shop recommendation came with the perfect timing. It's become my morning ritual.",
      author: "Marcus Rivera", 
      location: "Relocated to Austin"
    },
    {
      quote: "It suggested a running path I never would have found. Now it's my favorite part of the day.",
      author: "Elena Kowalski",
      location: "Fresh in Portland"
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-stone-900 text-center mb-16">
          Stories of <span className="italic">belonging</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="space-y-6">
              <div 
                className="aspect-square rounded-lg bg-stone-200 mb-6"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-${
                    index === 0 ? '1500673922987-e212871fec22' : 
                    index === 1 ? '1483058712412-4245e9b90334' : 
                    '1487958449943-2429e8be8625'
                  }?q=80&w=1000&auto=format&fit=crop')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              
              <blockquote className="text-lg text-stone-700 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="space-y-1">
                <p className="font-medium text-stone-900">{testimonial.author}</p>
                <p className="text-sm text-stone-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
