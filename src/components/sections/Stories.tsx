
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
    },
    {
      quote: "Found a quiet park that feels like the one I left behind. It's my new reading spot.",
      author: "Aisha Khan",
      location: "Moved to Denver",
      img: "1519904214042-e3f353e8a2a5"
    }
  ];

  return (
    <section className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-sans text-sm uppercase tracking-widest text-primary font-semibold mb-4">Stories of Settling In</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Finding your place, <br />
            one recommendation at a time.
          </h2>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {stories.map((story, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <div className="space-y-6 group">
                    <div 
                      className="aspect-[4/5] rounded-xl bg-card overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    >
                      <div 
                        className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-${story.img}?q=80&w=800&auto=format&fit=crop')`,
                        }}
                      />
                    </div>
                    
                    <div className="text-center">
                      <blockquote className="text-lg font-serif text-foreground/80 italic mb-4">
                        "{story.quote}"
                      </blockquote>
                      
                      <div className="font-sans">
                        <p className="font-bold text-foreground">{story.author}</p>
                        <p className="text-sm text-muted-foreground">{story.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};
