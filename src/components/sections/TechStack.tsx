
export const TechStack = () => {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-16 font-sans">
          TECH STACK
        </h2>
        
        <div className="bg-black text-green-400 p-8 font-mono text-sm overflow-x-auto">
          <div className="whitespace-nowrap space-y-2">
            <p>GEMINI_AI → FIREBASE → FLASK_API → GOOGLE_MAPS_TAKEOUT → CONVERSATIONAL_LAYER</p>
            <p>├── Retell (voice interface)</p>
            <p>├── ElevenLabs (speech synthesis)</p>
            <p>├── Places API (location data)</p>
            <p>└── Firestore (user patterns)</p>
          </div>
        </div>
        
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-6">
            <h3 className="font-mono font-bold mb-4">[PRIVACY_ARCHITECTURE]</h3>
            <ul className="font-mono text-sm space-y-2">
              <li>• Local processing where possible</li>
              <li>• Encrypted data transmission</li>
              <li>• User-controlled data retention</li>
              <li>• No location tracking post-analysis</li>
            </ul>
          </div>
          
          <div className="bg-gray-100 p-6">
            <h3 className="font-mono font-bold mb-4">[PERFORMANCE_METRICS]</h3>
            <ul className="font-mono text-sm space-y-2">
              <li>• 0.3s average response time</li>
              <li>• 94% accuracy in pattern matching</li>
              <li>• 12 minute average onboarding</li>
              <li>• 8/10 user satisfaction score</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
