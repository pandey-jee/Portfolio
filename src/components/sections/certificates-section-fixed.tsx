import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaCertificate, FaEye } from 'react-icons/fa';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  link: string;
  type: 'course' | 'certification' | 'achievement';
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    link: "https://freecodecamp.org/certification/example",
    type: "certification"
  },
  {
    id: 2,
    title: "React - The Complete Guide",
    issuer: "Udemy",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    link: "https://udemy.com/certificate/example",
    type: "course"
  },
  {
    id: 3,
    title: "MongoDB Developer Path",
    issuer: "MongoDB University",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop",
    link: "https://university.mongodb.com/certificate/example",
    type: "certification"
  },
  {
    id: 4,
    title: "Cloud Practitioner",
    issuer: "AWS",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    link: "https://aws.amazon.com/certification/example",
    type: "certification"
  },
  {
    id: 5,
    title: "Full Stack Web Development",
    issuer: "Coursera",
    date: "2023",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    link: "https://coursera.org/certificate/example",
    type: "course"
  },
  {
    id: 6,
    title: "Docker Mastery",
    issuer: "Docker",
    date: "2023",
    imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop",
    link: "https://docker.com/certificate/example",
    type: "certification"
  }
];

export default function CertificatesSection() {
  const [showAll, setShowAll] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const visibleCertificates = showAll ? certificates : certificates.slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-br from-dark-navy via-gray-900 to-dark-navy relative overflow-hidden">
      {/* Background chakra effects */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-chakra-orange rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 section-reveal"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-chakra-orange to-yellow-400 bg-clip-text text-transparent">
              Ninja Certificates
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Scrolls of wisdom and mastery earned through countless hours of training
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <AnimatePresence>
            {visibleCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="cert-card group relative"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: showAll ? 0 : index * 0.2,
                  ease: "backOut"
                }}
                layout
                onHoverStart={() => setHoveredId(cert.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                {/* Certificate Image Card */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-chakra-orange/20 hover:border-chakra-orange/50 transition-all duration-300">
                  {/* Certificate Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Hover overlay with chakra effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-chakra-blue/20 to-chakra-orange/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === cert.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Certificate Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{cert.title}</h3>
                    <p className="text-chakra-orange text-sm font-medium">{cert.issuer}</p>
                    <p className="text-gray-300 text-xs">{cert.date}</p>
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    className="absolute top-4 right-4 flex gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredId === cert.id ? 1 : 0,
                      scale: hoveredId === cert.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-chakra-orange/90 hover:bg-chakra-orange text-white rounded-full transition-colors duration-200"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                    </a>
                  </motion.div>

                  {/* Chakra energy border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-transparent"
                    animate={{
                      borderColor: hoveredId === cert.id 
                        ? ['rgba(59, 130, 246, 0.5)', 'rgba(255, 165, 0, 0.5)', 'rgba(59, 130, 246, 0.5)']
                        : 'rgba(255, 165, 0, 0.2)'
                    }}
                    transition={{ duration: 2, repeat: hoveredId === cert.id ? Infinity : 0 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More/Less Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-4 bg-gradient-to-r from-chakra-blue to-chakra-orange text-white font-bold rounded-full hover:from-chakra-orange hover:to-chakra-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-chakra-orange/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <FaEye className="w-4 h-4" />
              {showAll ? 'Show Less Certificates' : `Show All ${certificates.length} Certificates`}
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
