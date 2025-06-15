
export const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-secondary text-muted-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-light text-foreground mb-2">Homey</h3>
            <p className="text-sm">Making every city feel like home</p>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-xs">
          <p>&copy; 2024 Homey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
