import { useAudio } from "@/hooks/use-audio";

const skillCategories = [
  {
    title: "Frontend Jutsu",
    icon: "fab fa-react",
    color: "text-primary",
    skills: [
      { name: "React", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "HTML/CSS", level: 95 }
    ]
  },
  {
    title: "Backend Techniques",
    icon: "fas fa-server",
    color: "text-orange-500",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 70 },
      { name: "Python", level: 80 },
      { name: "REST APIs", level: 75 }
    ]
  },
  {
    title: "Data Scrolls",
    icon: "fas fa-database",
    color: "text-green-400",
    skills: [
      { name: "MongoDB", level: 75 },
      { name: "MySQL", level: 70 },
      { name: "Firebase", level: 65 }
    ]
  },
  {
    title: "Ninja Tools",
    icon: "fas fa-tools",
    color: "text-purple-400",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Vercel", level: 85 },
      { name: "Postman", level: 80 }
    ]
  },
  {
    title: "Coding Scrolls",
    icon: "fas fa-code",
    color: "text-yellow-400",
    skills: [
      { name: "C++", level: 85 },
      { name: "Java", level: 70 },
      { name: "DSA", level: 80 }
    ]
  },
  {
    title: "Leadership Arts",
    icon: "fas fa-users",
    color: "text-pink-400",
    skills: [
      { name: "Team Leadership", level: 90 },
      { name: "Event Management", level: 85 },
      { name: "Problem Solving", level: 95 }
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
        <p className="text-center text-slate-300 mb-16 text-lg animate-fade-in-up">My chakra-infused technical abilities</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="skill-scroll rounded-xl p-6 chakra-glow cursor-pointer"
              onClick={handleSkillClick}
            >
              <div className="text-center mb-4">
                <i className={`${category.icon} text-4xl ${category.color} mb-2`}></i>
                <h3 className={`font-orbitron text-xl font-bold ${category.color}`}>
                  {category.title}
                </h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center justify-between">
                    <span>{skill.name}</span>
                    <div className="w-24 h-2 bg-slate-700 rounded-full">
                      <div 
                        className={`h-2 rounded-full animate-pulse-glow ${category.color.replace('text-', 'bg-')}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
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
