import { useAudio } from "@/hooks/use-audio";

const achievements = [
  {
    title: "CodeChef 3-Star",
    subtitle: "Elite Coding Ninja",
    icon: "fas fa-code",
    bgGradient: "bg-gradient-to-br from-yellow-500 to-orange-500",
    badge: (
      <div className="flex justify-center space-x-1">
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
      </div>
    )
  },
  {
    title: "Codeforces Pupil",
    subtitle: "Algorithm Warrior",
    icon: "fas fa-trophy",
    bgGradient: "bg-gradient-to-br from-blue-500 to-purple-500",
    badge: <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">PUPIL RANK</span>
  },
  {
    title: "Hack with Impact",
    subtitle: "3rd Place Winner",
    icon: "fas fa-medal",
    bgGradient: "bg-gradient-to-br from-green-500 to-emerald-500",
    badge: <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">🥉 BRONZE</span>
  },
  {
    title: "META Certified",
    subtitle: "JS & Frontend Master",
    icon: "fas fa-certificate",
    bgGradient: "bg-gradient-to-br from-purple-500 to-pink-500",
    badge: <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs">CERTIFIED</span>
  }
];

const additionalHonors = [
  { icon: "fas fa-users", text: "Event Management Leader", color: "border-primary text-primary" },
  { icon: "fas fa-graduation-cap", text: "Dean's List Student", color: "border-orange-500 text-orange-500" },
  { icon: "fas fa-project-diagram", text: "Multiple Project Completions", color: "border-green-500 text-green-500" }
];

export default function AchievementsSection() {
  const { playChakraSound } = useAudio();

  const handleAchievementClick = () => {
    playChakraSound();
  };

  return (
    <section id="achievements" className="py-20 bg-slate-800 relative">
      <div className="container mx-auto px-6">
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-center mb-4 animate-text-glow">
          NINJA RANKS & HONORS
        </h2>
        <p className="text-center text-slate-300 mb-16 text-lg animate-fade-in-up">Recognition from the Academy and Battle Competitions</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="achievement-badge text-center chakra-glow cursor-pointer"
              onClick={handleAchievementClick}
            >
              <div className={`${achievement.bgGradient} rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center`}>
                <i className={`${achievement.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="font-orbitron text-lg font-bold mb-2">{achievement.title}</h3>
              <p className="text-sm text-slate-300 mb-4">{achievement.subtitle}</p>
              <div className="mt-4">
                {achievement.badge}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="font-orbitron text-2xl font-bold mb-6 text-primary">Additional Honors</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {additionalHonors.map((honor, index) => (
              <span 
                key={index}
                className={`bg-slate-700 border ${honor.color} px-4 py-2 rounded-lg cursor-pointer chakra-glow`}
                onClick={handleAchievementClick}
              >
                <i className={`${honor.icon} mr-2`}></i>{honor.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
