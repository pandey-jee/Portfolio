export default function LoadingScroll() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="skill-scroll rounded-xl p-8 text-center animate-pulse-glow">
        <div className="mb-4">
          <i className="fas fa-scroll text-4xl text-primary animate-chakra-spin"></i>
        </div>
        <h3 className="font-orbitron text-xl font-bold text-primary mb-2 animate-neon-flicker">
          Loading Chakra Scrolls...
        </h3>
        <p className="text-slate-300 text-sm animate-fade-in-up">
          Summoning project data from the digital realm
        </p>
        
        {/* Animated chakra particles */}
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-float"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  );
}