
export const UserTestimonials = () => {
  const testimonials = [
    "Homey knew I'd want a bookstore like the one back home.",
    "It found me a quiet coffee place where no one talks. That's all I needed.",
    "The gym recommendation came with specific class schedules. It actually understood my routine.",
    "Instead of 47 restaurant options, I got 3 that made sense for Tuesday nights.",
    "My dentist in Austin feels exactly like my dentist in Portland. Same vibe, different zip code."
  ];

  return (
    <section className="py-24 px-8 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-sans mb-16 text-muted-foreground">[WHAT_USERS_SAY]</h2>
        
        <div className="space-y-12">
          {testimonials.map((quote, index) => (
            <blockquote key={index} className="border-l-4 border-primary pl-6 transition-all duration-300 hover:pl-8 cursor-pointer">
              <p className="text-xl font-serif italic text-foreground/80">
                "{quote}"
              </p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
