
export const UserTestimonials = () => {
  const testimonials = [
    "Homely knew I'd want a bookstore like the one back home.",
    "It found me a quiet coffee place where no one talks. That's all I needed.",
    "The gym recommendation came with specific class schedules. It actually understood my routine.",
    "Instead of 47 restaurant options, I got 3 that made sense for Tuesday nights.",
    "My dentist in Austin feels exactly like my dentist in Portland. Same vibe, different zip code."
  ];

  return (
    <section className="py-24 px-8 bg-gray-50 border-t border-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-mono mb-16">[WHAT_USERS_SAY]</h2>
        
        <div className="space-y-12">
          {testimonials.map((quote, index) => (
            <blockquote key={index} className="border-l-2 border-black pl-6">
              <p className="text-xl font-mono italic">
                "{quote}"
              </p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
