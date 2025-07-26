import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes, FaEye, FaExternalLinkAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Project = {
  title: string;
  description: string;
  features: string;
  techStack: string;
  link?: string;
};

type Certification = {
  title: string;
};

type Achievement = {
  title: string;
  details?: string;
};

const projects: Project[] = [
  {
    title: "NFT Gallery UI",
    description:
      "Designed a digital NFT art gallery showcasing cards for individual NFTs using a clean UI layout. Replicates a real-world art gallery experience.",
    features: "NFT showcase cards, hover animations, grid layout, mobile responsiveness",
    techStack: "HTML, CSS, JavaScript, Vite, GitHub",
    link: "https://nft2-pink.vercel.app",
  },
  {
    title: "Expense Tracker",
    description:
      "Fully functional expense tracking application using React's Context API for state management. Includes form validation, dynamic rendering, and charts.",
    features: "Add/delete transactions, balance calculation, real-time updates",
    techStack: "React, CSS, Context API, Vite, Visual Studio Code",
    link: "https://expense-tracker-ten-rho-23.vercel.app",
  },
  {
    title: "CitySense",
    description:
      "Real-time web app for reporting and tracking urban issues. Geolocation-based submissions, image uploads, admin dashboard, and interactive maps.",
    features: "Real-time issue reporting, JWT auth, Cloudinary image uploads, admin analytics",
    techStack: "React.js, Tailwind CSS, Node.js, Express.js, Firebase Firestore, Cloudinary, Leaflet.js, Render",
    link: "https://your-citysense-link.com",
  },
];

const certifications: Certification[] = [
  { title: "Certificate of Recognition – Class Representative" },
  { title: "Introduction to Frontend Development – META (Coursera)" },
  { title: "Programming with JavaScript – META (Coursera)" },
  { title: "Smart India Hackathon – Student Coordinator Certificate" },
  { title: "NASA Space Apps Challenge – University Level Organizer Certificate" },
];

const achievements: Achievement[] = [
  { title: "Event Coordination", details: "Organized university-level technical events and coding competitions." },
  {
    title: "Competitive Programming",
    details:
      "CodeChef: 3-Star Coder (peak: 1657, global rank: #765). Codeforces Pupil (max: 1233).",
  },
  {
    title: "Hackathons",
    details: "3rd place at Hack With Impact 2025; Top 10 in Hack with Tricity.",
  },
  {
    title: "Project Recognition",
    details: "Built and deployed NFT Gallery UI and CitySense using React, Tailwind, and APIs.",
  },
];

export default function ResumePreviewModal({ isOpen, onClose }: ResumePreviewModalProps) {
  const resumeUrl = '/resume.pdf';

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Abhishek_Kumar_Pandey_Resume.pdf';
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-5xl w-full max-h-[95vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "backOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-chakra-blue to-blue-600">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FaEye className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Resume</h2>
                  <p className="text-blue-100 text-sm">Abhishek Kumar Pandey - Full Resume</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-chakra-orange hover:bg-orange-600 text-white rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload className="text-sm" />
                  <span>Download PDF</span>
                </motion.button>

                <motion.button
                  onClick={onClose}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="text-xl" />
                </motion.button>
              </div>
            </div>

            {/* Resume Content */}
            <div className="h-[calc(95vh-140px)] overflow-auto p-8 bg-white text-gray-800">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center border-b border-gray-200 pb-6">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Abhishek Kumar Pandey</h1>
                  <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-chakra-orange" />
                      <a href="mailto:pandeyji252002@gmail.com" className="hover:text-chakra-orange transition-colors">
                        pandeyji252002@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaPhone className="text-chakra-orange" />
                      <span>9031698085</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaLinkedin className="text-chakra-orange" />
                      <a href="https://linkedin.com/in/abhishek-kumar-pandey" target="_blank" rel="noopener noreferrer" className="hover:text-chakra-orange transition-colors">
                        abhishek kumar pandey
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaGithub className="text-chakra-orange" />
                      <a href="https://github.com/pandey-jee" target="_blank" rel="noopener noreferrer" className="hover:text-chakra-orange transition-colors">
                        pandey-jee
                      </a>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-1 h-6 bg-chakra-orange mr-3 rounded"></div>
                    Education
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">Chandigarh University</h3>
                        <span className="text-gray-600">June 2022 - June 2026</span>
                      </div>
                      <p className="text-gray-700">Bachelor of Engineering (Computer Science and Engineering)</p>
                      <p className="text-gray-600">Chandigarh, India | CGPA: 7.36</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold">Cambridge Senior Secondary School</h3>
                        <span className="text-gray-600">2021</span>
                      </div>
                      <p className="text-gray-700">Intermediate | Bihar, India | Percentage: 82.8%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold">Wood Row Senior Secondary School</h3>
                        <span className="text-gray-600">2019</span>
                      </div>
                      <p className="text-gray-700">Matriculation | Uttar Pradesh, India | Percentage: 86.4%</p>
                    </div>
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-1 h-6 bg-chakra-orange mr-3 rounded"></div>
                    Skills Summary
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-bold text-chakra-blue mb-2">Languages:</h4>
                      <p>JavaScript, Java, C/C++, PHP, SQL, HTML, CSS</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-bold text-chakra-orange mb-2">Frontend:</h4>
                      <p>HTML, CSS, JavaScript, React, Tailwind CSS, Bootstrap</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-600 mb-2">UI/UX:</h4>
                      <p>Figma, Responsive Design, Visual Studio Code</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-600 mb-2">Version Control:</h4>
                      <p>Git, GitHub</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-bold text-chakra-blue mb-2">Backend & APIs:</h4>
                      <p>Node.js, Express.js, REST APIs, JWT, Firebase Admin SDK</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-bold text-chakra-orange mb-2">Databases:</h4>
                      <p>MongoDB, MySQL, Firebase Firestore</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-600 mb-2">Deployments:</h4>
                      <p>Netlify, Vercel, Render</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-600 mb-2">Media & Cloud:</h4>
                      <p>Cloudinary, Firebase</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-700 mb-2">Tools & Others:</h4>
                      <p>Postman, Nodemailer, CORS, Env Variables</p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-bold text-indigo-600 mb-2">Soft Skills:</h4>
                      <p>Teamwork, Adaptability, Time Management, Event Management</p>
                    </div>
                  </div>
                </section>

                {/* Projects */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-1 h-6 bg-chakra-orange mr-3 rounded"></div>
                    Projects
                  </h2>
                  <div className="space-y-6">
                    {projects.map((proj, i) => (
                      <div key={i} className="bg-gray-50 p-6 rounded-lg border-l-4 border-chakra-orange">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{proj.title}</h3>
                          {proj.link && (
                            <a 
                              href={proj.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-chakra-orange hover:text-orange-600 transition-colors"
                            >
                              <FaExternalLinkAlt className="text-sm" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                        <p className="text-gray-700 mb-3">{proj.description}</p>
                        <div className="mb-3">
                          <span className="font-semibold text-gray-900">Features: </span>
                          <span className="text-gray-700">{proj.features}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Tech Stack: </span>
                          <span className="text-gray-700">{proj.techStack}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Certifications */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-1 h-6 bg-chakra-orange mr-3 rounded"></div>
                    Certifications
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certifications.map((cert, i) => (
                      <div key={i} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="text-gray-800">{cert.title}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Achievements */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-1 h-6 bg-chakra-orange mr-3 rounded"></div>
                    Achievements
                  </h2>
                  <div className="space-y-4">
                    {achievements.map((ach, i) => (
                      <div key={i} className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                        <h3 className="font-bold text-gray-900 mb-2">{ach.title}</h3>
                        {ach.details && <p className="text-gray-700">{ach.details}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-100 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Press ESC to close</span>
                <span>Resume • {new Date().getFullYear()}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
