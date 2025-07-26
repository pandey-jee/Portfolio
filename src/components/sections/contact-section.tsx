import { useAudio } from "@/hooks/use-audio";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    href: "mailto:abhishek@example.com",
    icon: "fas fa-envelope",
    title: "Email",
    subtitle: "abhishek@email.com",
    color: "border-primary hover:border-primary hover:bg-primary/10",
    iconColor: "text-primary"
  },
  {
    href: "https://linkedin.com/in/abhishek",
    icon: "fab fa-linkedin",
    title: "LinkedIn",
    subtitle: "Connect with me",
    color: "border-blue-500 hover:border-blue-500 hover:bg-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    href: "https://github.com/abhishek",
    icon: "fab fa-github",
    title: "GitHub",
    subtitle: "View my code",
    color: "border-gray-400 hover:border-gray-400 hover:bg-gray-400/10",
    iconColor: "text-gray-400"
  }
];

export default function ContactSection() {
  const { playChakraSound } = useAudio();

  const handleContactClick = () => {
    playChakraSound();
  };

  const handleSendMessage = () => {
    playChakraSound();
    // TODO: Implement contact form
    console.log('Send message clicked');
  };

  const handleDownloadResume = () => {
    playChakraSound();
    // TODO: Implement resume download
    console.log('Download resume clicked');
  };

  return (
    <section id="contact" className="py-20 bg-dark-navy relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 animate-text-glow">
          SUMMON THE ENGINEER
        </h2>
        <p className="text-lg text-slate-300 mb-12 animate-slide-in-left">Ready to collaborate on the next great digital mission?</p>
        
        <div className="max-w-2xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
            alt="Modern office setup with multiple screens showing code and analytics" 
            className="w-full h-64 object-cover rounded-xl mb-8 border border-primary/30 chakra-glow" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {contactMethods.map((method, index) => (
              <a 
                key={index}
                href={method.href}
                className={`chakra-glow bg-slate-800 border ${method.color} rounded-xl p-6 transition-all block`}
                onClick={handleContactClick}
              >
                <i className={`${method.icon} text-3xl ${method.iconColor} mb-3`}></i>
                <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                <p className="text-slate-300 text-sm">{method.subtitle}</p>
              </a>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={handleSendMessage}
              className="chakra-glow bg-primary hover:bg-blue-600 text-white px-8 py-4 text-lg font-bold transform hover:scale-105"
            >
              <i className="fas fa-paper-plane mr-2"></i>Send Message
            </Button>
            <Button 
              onClick={handleDownloadResume}
              variant="outline"
              className="chakra-glow border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg font-bold"
            >
              <i className="fas fa-download mr-2"></i>Download Resume
            </Button>
          </div>
        </div>
        
        {/* Final ninja character illustration */}
        <div className="absolute bottom-0 right-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" 
            alt="Silhouette of ninja character against moonlight" 
            className="w-48 h-48 object-cover" 
          />
        </div>
      </div>
    </section>
  );
}
