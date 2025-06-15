
export const ValueProposition = () => {
  return (
    <section className="py-24 px-8 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          From just moved in, to truly settled.
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12">
          Homey bridges the gap between your old life and your new one, making any city feel like home.
        </p>
        
        <div className="mb-12">
          <img
            src="https://cdn.dribbble.com/userupload/23846635/file/original-b413a23156182d3008d4c00068f51576.gif"
            alt="An animated illustration of a house being moved by a truck."
            className="rounded-lg shadow-xl w-full max-w-2xl mx-auto mix-blend-multiply"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Animation by <a href="https://dribbble.com/shots/5566915-Moving-House" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Dennis Sisterson</a>
          </p>
        </div>
      </div>
    </section>
  );
};
