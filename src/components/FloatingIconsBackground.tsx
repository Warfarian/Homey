
import { Home, MapPin, Heart, Smile, Coffee, Building } from 'lucide-react';
import { useMemo } from 'react';

const icons = [
  { Icon: Home, size: 'w-8 h-8', position: 'top-[15%] left-[10%]', animation: 'animate-float-1' },
  { Icon: MapPin, size: 'w-6 h-6', position: 'top-[25%] left-[80%]', animation: 'animate-float-2' },
  { Icon: Heart, size: 'w-7 h-7', position: 'top-[70%] left-[12%]', animation: 'animate-float-3' },
  { Icon: Smile, size: 'w-9 h-9', position: 'top-[80%] left-[90%]', animation: 'animate-float-1' },
  { Icon: Coffee, size: 'w-6 h-6', position: 'top-[50%] left-[50%]', animation: 'animate-float-2' },
  { Icon: Building, size: 'w-10 h-10', position: 'top-[5%] left-[45%]', animation: 'animate-float-3' },
];

export const FloatingIconsBackground = () => {
    const renderedIcons = useMemo(() => icons.map((icon, i) => {
        const { Icon, size, position, animation } = icon;
        return (
            <div key={i} className={`absolute ${position} text-primary/20 dark:text-primary/10 ${animation} hidden md:block`}>
                <Icon className={size} strokeWidth={1.5} />
            </div>
        )
    }), []);

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            {renderedIcons}
        </div>
    );
}
