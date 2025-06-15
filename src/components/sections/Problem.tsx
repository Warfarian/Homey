export const Problem = () => {
  const questions = [
    {
      q: "Where's my new go-to coffee spot?",
      sub: "That doesn't require a secret handshake to order."
    },
    {
      q: "Found a good barber yet?",
      sub: "Who understands 'just a trim' isn't a philosophical concept."
    },
    {
      q: "Where can I go for a 7AM run?",
      sub: "That doesn't accidentally end in a different time zone."
    },
    {
      q: "A grocery store that just *gets* me?",
      sub: "And my emotional support pint of ice cream."
    },
    {
      q: "Who's going to be my new dentist?",
      sub: "Preferably one who doesn't hum along to the drill."
    },
    {
      q: "Any quiet spots to read a book?",
      sub: "Where the loudest sound is my own internal monologue."
    }
  ];

  return (
    <section className="py-24 px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-black mb-8 font-serif">
              FEELING A LITTLE... LOST?
            </h2>
            <div className="bg-foreground text-background p-6 rounded-lg font-sans text-sm shadow-lg">
              <p>
                "The stress of moving isn't about finding A dentist. It's about finding YOUR dentist. You know, the one who won't judge your life choices while their hands are in your mouth."
              </p>
              <p className="mt-4 text-background/70">
                — Someone who's definitely been there
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <p className="text-xl font-sans mb-12 leading-relaxed">
              You've handled the big stuff. The boxes are unpacked. But now comes the hard part: rebuilding your routine. It's the small, daily moments that make a place feel like home.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {questions.map((item, index) => (
                <div key={index} className="border border-border p-6 bg-card rounded-lg transition-all duration-300 hover:bg-accent hover:-translate-y-1 hover:shadow-lg cursor-default flex flex-col">
                  <p className="font-sans text-lg font-medium">
                    {item.q}
                  </p>
                  <p className="font-sans text-sm text-muted-foreground mt-2">
                    {item.sub}
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
