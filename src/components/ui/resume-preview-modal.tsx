import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes, FaEye } from 'react-icons/fa';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
          className="fixed inset-0 z-50 flex items-center justify-center"
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
            className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-chakra-orange/30 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "backOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-600/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-chakra-orange/20 rounded-lg">
                  <FaEye className="text-chakra-orange text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Resume Preview</h2>
                  <p className="text-gray-400 text-sm">Abhishek Kumar Pandey - Full Resume</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-gradient-to-r from-chakra-orange to-orange-600 hover:from-orange-600 hover:to-chakra-orange text-white rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload className="text-sm" />
                  <span>Download PDF</span>
                </motion.button>

                <motion.button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="text-xl" />
                </motion.button>
              </div>
            </div>

            {/* Full PDF Viewer - Multiple approaches for compatibility */}
            <div className="relative h-[calc(90vh-120px)] overflow-auto bg-gray-100">
              {/* Primary: Object element for PDF */}
              <object
                data={resumeUrl}
                type="application/pdf"
                className="w-full h-full min-h-[800px]"
                title="Abhishek Kumar Pandey Resume"
              >
                {/* Fallback: iframe if object fails */}
                <iframe
                  src={resumeUrl}
                  className="w-full h-full min-h-[800px] border-0"
                  title="Resume Preview - Iframe Fallback"
                />
                
                {/* Final fallback: Download option */}
                <div className="flex items-center justify-center h-full bg-slate-800 text-white">
                  <div className="text-center p-8">
                    <FaEye className="text-6xl text-chakra-orange mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Unable to Display PDF</h3>
                    <p className="mb-6 text-gray-300">Your browser cannot display this PDF inline.</p>
                    <motion.button
                      onClick={handleDownload}
                      className="px-6 py-3 bg-gradient-to-r from-chakra-orange to-orange-600 text-white rounded-lg flex items-center space-x-2 mx-auto transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaDownload />
                      <span>Download Resume PDF</span>
                    </motion.button>
                  </div>
                </div>
              </object>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-800/50 border-t border-slate-600/50">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Press ESC to close</span>
                <span>PDF • {new Date().getFullYear()}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
