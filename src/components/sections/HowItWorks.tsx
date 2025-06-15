
import { Mic, Search, Phone } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Mic,
      title: "You move. Homey listens.",
      description: "Share your preferences, habits, and the little things that matter to you. Homey learns what makes you feel at home."
    },
    {
      icon: Search,
      title: "It learns your pace, habits, and tastes.",
      description: "Our AI studies your patterns, understanding not just what you like, but how you like to discover new places."
    },
    {
      icon: Phone,
      title: "Then it calls. Like a friend with great taste.",
      description: "Receive personalized calls with thoughtful recommendations that feel like they came from someone who truly knows you."
    }
  ];

  return (
    <section className="py-24 px-6 bg-stone-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
            How it <span className="italic">works</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Three simple steps to feeling at home anywhere
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-stone-800 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-medium text-stone-900 leading-tight">
                {step.title}
              </h3>
              
              <p className="text-stone-600 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
