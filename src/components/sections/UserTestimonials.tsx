
export const UserTestimonials = () => {
  const testimonials = [
    "Homely knew I'd want a bookstore like the one back home.",
    "It found me a quiet coffee place where no one talks. That's all I needed.",
    "The gym recommendation came with specific class schedules. It actually understood my routine.",
    "Instead of 47 restaurant options, I got 3 that made sense for Tuesday nights.",
    "My dentist in Austin feels exactly like my dentist in Portland. Same vibe, different zip code."
  ];

  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-16 font-sans">
          WHAT USERS SAY
        </h2>
        
        <div className="space-y-8">
          {testimonials.map((quote, index) => (
            <div key={index} className="border-l-4 border-black pl-8">
              <p className="text-xl font-mono italic leading-relaxed">
                "{quote}"
              </p>
              <div className="mt-4 font-mono text-sm text-gray-500">
                USER_{String(index + 1).padStart(3, '0')}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white border-2 border-black p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-mono font-bold mb-4">[SUCCESS_METRICS]</h3>
              <ul className="font-mono text-sm space-y-2">
                <li>• 89% of users visit recommended places within 7 days</li>
                <li>• 76% report feeling "settled" within 3 weeks</li>
                <li>• 12% faster city adaptation vs. control group</li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono font-bold mb-4">[BETA_INSIGHTS]</h3>
              <ul className="font-mono text-sm space-y-2">
                <li>• Most valued: time-of-day specific recommendations</li>
                <li>• Least valued: popular/trending suggestions</li>
                <li>• Key insight: familiarity > discovery</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
