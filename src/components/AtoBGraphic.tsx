
import { Home, User, MoveRight } from 'lucide-react';

export const AtoBGraphic = () => {
  return (
    <div className="flex items-center justify-center gap-8 md:gap-16 my-12">
      {/* Point A */}
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <Home className="w-12 h-12 md:w-16 md:h-16" />
        <p className="font-sans text-xs md:text-sm">Old City</p>
      </div>

      {/* Journey Path */}
      <div className="relative flex-1 max-w-xs">
        <svg width="100%" height="2" className="text-border">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-1 rounded-full">
            <MoveRight className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
        </div>
      </div>

      {/* Point B */}
      <div className="relative flex flex-col items-center gap-2 text-primary">
        <Home className="w-12 h-12 md:w-16 md:h-16" />
        <p className="font-sans text-xs md:text-sm">Homey</p>
        <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-primary text-primary-foreground rounded-full p-1.5 md:p-2 shadow-lg animate-bounce">
            <User className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>
    </div>
  );
};
