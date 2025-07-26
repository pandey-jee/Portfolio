import { useAudio } from "@/hooks/use-audio";

const skillCategories = [
  {
    title: "Frontend Jutsu",
    icon: "fab fa-react",
    color: "text-primary",
    skills: [
      { name: "React", icon: "fab fa-react", color: "text-blue-400" },
      { name: "JavaScript", icon: "fab fa-js-square", color: "text-yellow-400" },
      { name: "Tailwind CSS", icon: "fas fa-palette", color: "text-cyan-400" },
      { name: "HTML/CSS", icon: "fab fa-html5", color: "text-orange-500" }
    ]
  },
  {
    title: "Backend Techniques",
    icon: "fas fa-server",
    color: "text-orange-500",
    skills: [
      { name: "Node.js", icon: "fab fa-node-js", color: "text-green-500" },
      { name: "Express.js", icon: "fas fa-bolt", color: "text-gray-300" },
      { name: "Python", icon: "fab fa-python", color: "text-blue-500" },
      { name: "REST APIs", icon: "fas fa-exchange-alt", color: "text-purple-400" }
    ]
  },
  {
    title: "Data Scrolls",
    icon: "fas fa-database",
    color: "text-green-400",
    skills: [
      { name: "MongoDB", icon: "fas fa-leaf", color: "text-green-500" },
      { name: "MySQL", icon: "fas fa-database", color: "text-blue-600" },
      { name: "Firebase", icon: "fas fa-fire", color: "text-orange-400" }
    ]
  },
  {
    title: "Ninja Tools",
    icon: "fas fa-tools",
    color: "text-purple-400",
    skills: [
      { name: "Git/GitHub", icon: "fab fa-github", color: "text-gray-300" },
      { name: "Vercel", icon: "fas fa-rocket", color: "text-black" },
      { name: "Postman", icon: "fas fa-paper-plane", color: "text-orange-500" }
    ]
  },
  {
    title: "Coding Scrolls",
    icon: "fas fa-code",
    color: "text-yellow-400",
    skills: [
      { name: "C++", icon: "fas fa-code", color: "text-blue-600" },
      { name: "Java", icon: "fab fa-java", color: "text-red-500" },
      { name: "DSA", icon: "fas fa-sitemap", color: "text-purple-500" }
    ]
  },
  {
    title: "Leadership Arts",
    icon: "fas fa-users",
    color: "text-pink-400",
    skills: [
      { name: "Team Leadership", icon: "fas fa-users-cog", color: "text-blue-400" },
      { name: "Event Management", icon: "fas fa-calendar-alt", color: "text-green-400" },
      { name: "Problem Solving", icon: "fas fa-lightbulb", color: "text-yellow-400" }
    ]
  }
];

export default function SkillsSection() {
  const { playChakraSound } = useAudio();

  const handleSkillClick = () => {
    playChakraSound();
  };

  return (
    <section id="skills" className="py-20 bg-slate-800 relative">
      <div className="container mx-auto px-6">
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-center mb-4 animate-text-glow">
          NINJA ARSENAL
        </h2>
        <p className="text-center text-slate-300 mb-16 text-lg animate-fade-in-up">My chakra-infused technical abilities and mastered jutsu</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="skill-scroll bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 chakra-glow cursor-pointer hover:from-slate-600/50 hover:to-slate-700/50 transition-all duration-300 group min-h-[280px] flex flex-col"
              onClick={handleSkillClick}
            >
              <div className="text-center mb-6">
                <i className={`${category.icon} text-4xl ${category.color} mb-3 group-hover:scale-110 transition-transform duration-300`}></i>
                <h3 className={`font-orbitron text-xl font-bold ${category.color} group-hover:text-opacity-90 transition-all duration-300`}>
                  {category.title}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex flex-col items-center text-center group hover:bg-slate-600/20 p-3 rounded-lg transition-all duration-300 relative">
                    <div className="mb-3">
                      <i className={`${skill.icon} text-3xl ${skill.color} group-hover:scale-125 transition-all duration-300 drop-shadow-lg`}></i>
                    </div>
                    
                    <span className="text-white text-sm font-medium group-hover:text-gray-100 transition-colors duration-300">
                      {skill.name}
                    </span>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
