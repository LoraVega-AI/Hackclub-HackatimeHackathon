'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface UIOverlayProps {
  selectedSection: string | null
  onClose: () => void
  showProjects?: boolean
  onCloseProjects?: () => void
}

interface Project {
  title: string
  description: string
  image: string
  link: string
}

const sectionContent: { [key: string]: { title: string; content: string } } = {
  projects: {
    title: 'Projects',
    content:
      'Explore my portfolio of creative projects and technical solutions. Each project showcases different skills and technologies.',
  },
  experience: {
    title: 'Experience',
    content:
      'My professional journey and the skills I\'ve developed along the way. From internships to full-time roles.',
  },
  about: {
    title: 'About Me',
    content:
      'Learn more about who I am, my passions, and what drives me in my work and life.',
  },
  contact: {
    title: 'Contact',
    content:
      'Get in touch! I\'m always open to discussing new opportunities and collaborations.',
  },
}

// Sample projects - replace with your actual projects
const projects: Project[] = [
  {
    title: 'Project One',
    description: 'A beautiful web application built with modern technologies. This project showcases my skills in frontend development and user experience design.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    link: 'https://example.com/project1'
  },
  {
    title: 'Project Two',
    description: 'An innovative mobile app that solves real-world problems. Built with React Native and featuring a clean, intuitive interface.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    link: 'https://example.com/project2'
  },
  {
    title: 'Project Three',
    description: 'A creative design project that combines art and technology. This showcases my ability to work across different mediums and platforms.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
    link: 'https://example.com/project3'
  },
]

export default function UIOverlay({ selectedSection, onClose, showProjects = false, onCloseProjects }: UIOverlayProps) {
  const content = selectedSection ? sectionContent[selectedSection] : null
  const [showWelcome, setShowWelcome] = useState(false)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  useEffect(() => {
    // Show welcome popup every time someone enters the site
    setTimeout(() => setShowWelcome(true), 500) // Small delay for smooth entrance
  }, [])

  useEffect(() => {
    // Reset to first project when popup opens
    if (showProjects) {
      setCurrentProjectIndex(0)
    }
  }, [showProjects])

  const handleCloseWelcome = () => {
    setShowWelcome(false)
  }

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
  }

  const handlePrevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleCloseProjects = () => {
    if (onCloseProjects) {
      onCloseProjects()
    }
    // Clear selectedSection if it was 'projects' to prevent old modal from showing
    if (selectedSection === 'projects') {
      onClose()
    }
  }

  const currentProject = projects[currentProjectIndex]

  return (
    <>
      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={handleCloseWelcome}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ 
                scale: 1, 
                rotate: 0, 
                opacity: 1,
                y: [0, -10, 0]
              }}
              exit={{ 
                scale: 0.5, 
                rotate: 180, 
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              transition={{ 
                type: "spring", 
                damping: 15, 
                stiffness: 200,
                y: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-6 md:p-8 max-w-sm mx-4 shadow-2xl border-4 border-amber-200/60 backdrop-blur-sm overflow-hidden"
              style={{
                boxShadow: '0 20px 60px rgba(217, 119, 6, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
            >
              {/* Bamboo texture pattern overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(180, 83, 9, 0.1) 2px,
                  rgba(180, 83, 9, 0.1) 4px
                )`
              }} />
              
              {/* Animated warm gradient background overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-orange-200/20 to-yellow-200/30"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
              />
              
              {/* Nature-themed decorative elements - leaves/orange slices */}
              <motion.div
                className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full opacity-80"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                animate={{
                  rotate: [0, 15, -15, 15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-70"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                animate={{
                  rotate: [0, -20, 20, -20, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              <motion.div
                className="absolute top-1/2 -right-5 w-8 h-8 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full opacity-75"
                style={{ borderRadius: '50% 50% 50% 0' }}
                animate={{
                  rotate: 360,
                  y: [0, -15, 0],
                }}
                transition={{
                  rotate: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              
              {/* Bamboo segment lines */}
              <div className="absolute top-0 left-1/4 w-0.5 h-full bg-amber-300/20" />
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-amber-300/20" />
              <div className="absolute top-0 left-3/4 w-0.5 h-full bg-amber-300/20" />
              
              <motion.button
                onClick={handleCloseWelcome}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-3 right-3 text-amber-700 hover:text-orange-800 text-2xl md:text-3xl transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-amber-100/50 z-10 font-bold"
                aria-label="Close"
              >
                ×
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="text-center relative z-10"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: [0, 10, -10, 10, -10, 0]
                  }}
                  transition={{ 
                    delay: 0.4, 
                    type: "spring", 
                    stiffness: 200,
                    rotate: {
                      delay: 0.6,
                      duration: 0.5,
                      ease: "easeInOut"
                    }
                  }}
                  className="text-5xl mb-4 inline-block"
                >
                  🌿
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 bg-clip-text text-transparent"
                  style={{ fontFamily: 'serif' }}
                >
                  Hi there! I'm Lora Vega
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-amber-900/80 leading-relaxed text-sm md:text-base mb-1"
                  style={{ fontFamily: 'serif' }}
                >
                  Welcome to my 3D portfolio! I'm a creative developer passionate about building beautiful, interactive experiences.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-amber-800/70 leading-relaxed text-sm md:text-base"
                  style={{ fontFamily: 'serif' }}
                >
                  Explore the world around you and discover my projects, experience, and more!
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -3, 3, -3, 0],
                    boxShadow: "0 20px 40px rgba(217, 119, 6, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCloseWelcome}
                  className="mt-5 px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-full font-semibold text-sm shadow-lg relative overflow-hidden border-2 border-amber-300/50"
                  style={{ 
                    boxShadow: '0 4px 15px rgba(180, 83, 9, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <motion.span
                    className="relative z-10"
                    style={{ fontFamily: 'serif' }}
                  >
                    Let's explore! 🍃
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Popup */}
      <AnimatePresence>
        {showProjects && currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={handleCloseProjects}
          >
            <motion.div
              key={currentProjectIndex}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ 
                scale: 1, 
                rotate: 0, 
                opacity: 1,
                y: [0, -10, 0]
              }}
              exit={{ 
                scale: 0.5, 
                rotate: 180, 
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              transition={{ 
                type: "spring", 
                damping: 15, 
                stiffness: 200,
                y: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-6 md:p-8 max-w-lg mx-4 shadow-2xl border-4 border-amber-200/60 backdrop-blur-sm overflow-hidden"
              style={{
                boxShadow: '0 20px 60px rgba(217, 119, 6, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
            >
              {/* Bamboo texture pattern overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(180, 83, 9, 0.1) 2px,
                  rgba(180, 83, 9, 0.1) 4px
                )`
              }} />
              
              {/* Animated warm gradient background overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-orange-200/20 to-yellow-200/30"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
              />
              
              {/* Nature-themed decorative elements */}
              <motion.div
                className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full opacity-80"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                animate={{
                  rotate: [0, 15, -15, 15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-70"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                animate={{
                  rotate: [0, -20, 20, -20, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              
              {/* Bamboo segment lines */}
              <div className="absolute top-0 left-1/3 w-0.5 h-full bg-amber-300/20" />
              <div className="absolute top-0 left-2/3 w-0.5 h-full bg-amber-300/20" />
              
              {/* Close button */}
              <motion.button
                onClick={handleCloseProjects}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-3 right-3 text-amber-700 hover:text-orange-800 text-2xl md:text-3xl transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-amber-100/50 z-10 font-bold"
                aria-label="Close"
              >
                ×
              </motion.button>
              
              {/* Navigation buttons */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevProject()
                }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-700 hover:text-orange-800 text-3xl md:text-4xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-amber-100/50 z-10 font-bold"
                aria-label="Previous project"
              >
                ‹
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextProject()
                }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-700 hover:text-orange-800 text-3xl md:text-4xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-amber-100/50 z-10 font-bold"
                aria-label="Next project"
              >
                ›
              </motion.button>
              
              {/* Project content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative z-10"
              >
                {/* Project image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4 rounded-2xl overflow-hidden border-2 border-amber-300/50 shadow-lg"
                >
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                </motion.div>
                
                {/* Project title */}
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 bg-clip-text text-transparent text-center"
                  style={{ fontFamily: 'serif' }}
                >
                  {currentProject.title}
                </motion.h2>
                
                {/* Project description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-amber-900/80 leading-relaxed text-sm md:text-base mb-4 text-center"
                  style={{ fontFamily: 'serif' }}
                >
                  {currentProject.description}
                </motion.p>
                
                {/* Project link button */}
                <motion.a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -3, 3, -3, 0],
                    boxShadow: "0 20px 40px rgba(217, 119, 6, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="block text-center mt-5 px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-full font-semibold text-sm shadow-lg relative overflow-hidden border-2 border-amber-300/50"
                  style={{ 
                    boxShadow: '0 4px 15px rgba(180, 83, 9, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    fontFamily: 'serif'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="relative z-10">View Project 🍃</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.a>
                
                {/* Project counter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center mt-3 text-amber-700/60 text-xs"
                  style={{ fontFamily: 'serif' }}
                >
                  {currentProjectIndex + 1} / {projects.length}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute top-4 left-4 z-10 bg-gradient-to-br from-indigo-500/90 to-purple-600/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-2xl max-w-xs text-xs md:text-sm border border-white/20">
        <h3 className="font-bold text-base md:text-lg mb-2 text-white">Controls</h3>
        <p className="text-white/90">
          Use <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-white/20 rounded text-xs font-semibold">WASD</kbd> or{' '}
          <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-white/20 rounded text-xs font-semibold">Arrows</kbd> to
          move the cat
        </p>
        <p className="text-white/90 mt-2">
          🖱️ Drag to rotate • 🔍 Scroll to zoom
        </p>
        <p className="text-white/80 mt-2 hidden md:block text-xs">
          💡 Approach the glowing landmarks to explore sections
        </p>
      </div>

      {/* Section Modal */}
      <AnimatePresence>
        {selectedSection && content && !(selectedSection === 'projects' && showProjects) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 max-w-md mx-4 shadow-2xl border-2 border-gray-200"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl md:text-3xl transition-colors duration-200 hover:rotate-90 transition-transform"
                aria-label="Close"
              >
                ×
              </button>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {content.title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {content.content}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

