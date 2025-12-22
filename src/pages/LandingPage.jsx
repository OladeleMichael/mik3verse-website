/* ====================================================================
   LANDING PAGE (MIK3VERSE)
   ====================================================================
   SEARCH KEYWORDS:
   - LANDING_PAGE
   - MIK3VERSE_HUB
   - 3D_NAVIGATION_BUTTONS
   
   Purpose:
   - Main entry point to portfolio hub
   - Three 3D parallax buttons for navigation
   - Futuristic terminal aesthetic
   - Animated grid background
   - All buttons visible at a glance
   ================================================================== */
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navigation3DButton from '../components/landing/Navigation3DButton'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import TypingTextAnimation from '../components/shared/TypingTextAnimation'

export default function LandingPage() {
  console.log('LandingPage rendering...')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 960, y: 540 })
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initialize with actual window dimensions
    setCursorPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    })
    
    // Small delay to ensure everything is mounted
    setTimeout(() => setIsReady(true), 100)
    
    const handleMouseMove = (e) => {
      // Parallax effect for background
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
      
      // Cursor position for particle attraction
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  /* ====================================================================
     NAVIGATION BUTTONS CONFIGURATION
     ====================================================================
     SEARCH KEYWORDS:
     - LANDING_NAV_BUTTONS
     - PORTFOLIO_ROUTES
     - BUTTON_CONFIG
     
     Button Configuration:
     - title: Button heading text
     - subtitle: Descriptive text
     - route: React Router path
     - icon: Emoji or icon character
     - accentColor: Hex color code for theme
     ================================================================== */
  const portfolioButtons = [
    {
      title: 'VIDEOGRAPHY',
      subtitle: 'Cinematic Films & Photography',
      route: '/videography',
      icon: '🎬',
      accentColor: '#FFB400'
    },
    {
      title: 'TECH',
      subtitle: 'Full Stack Development & CV',
      route: '/tech',
      icon: '💻',
      accentColor: '#00D9FF'
    },
    {
      title: 'FITNESS',
      subtitle: 'Training & Lifestyle',
      route: '/fitness',
      icon: '💪',
      accentColor: '#FF6B35'
    }
  ]

  // Don't render particle-heavy content until ready
  if (!isReady) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="terminal text-2xl" style={{ color: '#6B8E23' }}>
          Loading MIK3VERSE...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header page="landing" />
      
      {/* ====================================================================
         ANIMATED GRID BACKGROUND
         ====================================================================
         SEARCH KEYWORDS:
         - LANDING_BACKGROUND
         - ANIMATED_GRID
         - PARALLAX_BACKGROUND
         ================================================================== */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 grid-bg opacity-30"
          style={{
            x: mousePosition.x,
            y: mousePosition.y
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30
          }}
        />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black" />
        
        {/* Interactive Animated Particles - OLIVE GREEN THEME - MAGNETIC MOUSE ATTRACTION */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(200)].map((_, i) => {
            const initialX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)
            const initialY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)
            const size = Math.random() * 3 + 1
            const attractionStrength = 0.08 + Math.random() * 0.12 // 8-20% attraction
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size + 'px',
                  height: size + 'px',
                  backgroundColor: '#6B8E23',
                  boxShadow: '0 0 8px #6B8E23, 0 0 12px #6B8E23'
                }}
                initial={{
                  x: initialX,
                  y: initialY,
                  opacity: Math.random() * 0.6 + 0.2
                }}
                animate={{
                  // Calculate magnetic pull toward cursor
                  x: initialX + (cursorPosition.x - initialX) * attractionStrength,
                  y: initialY + (cursorPosition.y - initialY) * attractionStrength,
                  opacity: [null, Math.random() * 0.6 + 0.2, Math.random() * 0.4],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 20,
                    damping: 30,
                    mass: 2
                  },
                  y: {
                    type: "spring",
                    stiffness: 20,
                    damping: 30,
                    mass: 2
                  },
                  opacity: {
                    duration: Math.random() * 8 + 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  },
                  scale: {
                    duration: Math.random() * 8 + 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  }
                }}
              />
            )
          })}
        </div>
      </div>

      {/* ====================================================================
         MAIN CONTENT - SINGLE VIEW LAYOUT
         ====================================================================
         SEARCH KEYWORDS:
         - LANDING_HERO
         - MIK3VERSE_TITLE
         - LANDING_TAGLINE
         - SINGLE_VIEW_LAYOUT
         ================================================================== */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-32 md:py-40">
        {/* Hero Title - OLIVE GREEN THEME with enhanced glow */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.h1 
            className="terminal" 
            style={{ 
              color: '#6B8E23',
              textShadow: '0 0 20px #6B8E23, 0 0 40px #6B8E23, 0 0 60px rgba(107, 142, 35, 0.5)',
              fontSize: '4rem', // ← CHANGE THIS VALUE TO ADJUST THE SIZE OF MIK3VERSE TEXT
              marginBottom: '0' // Removed default margin - control spacing via divider's marginTop instead
            }}
            animate={{
              textShadow: [
                '0 0 20px #6B8E23, 0 0 40px #6B8E23, 0 0 60px rgba(107, 142, 35, 0.5)',
                '0 0 25px #6B8E23, 0 0 50px #6B8E23, 0 0 75px rgba(107, 142, 35, 0.7)',
                '0 0 20px #6B8E23, 0 0 40px #6B8E23, 0 0 60px rgba(107, 142, 35, 0.5)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            MIK3VERSE
          </motion.h1>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto"
            style={{
              height: '6px', // ← CHANGE THIS TO ADJUST BAR THICKNESS (currently 4px)
              width: '20rem', // ← CHANGE THIS TO ADJUST BAR WIDTH (currently 20rem = 320px)
              marginTop: '0.1rem', // ← CHANGE THIS TO ADJUST SPACE ABOVE BAR (distance from MIK3VERSE)
              marginBottom: '0.5rem', // ← CHANGE THIS TO ADJUST SPACE BELOW BAR (distance from tagline)
              // Try: 1rem (closer), 3rem, 4rem, 5rem (farther)
              background: 'linear-gradient(to right, transparent, #6B8E23, transparent)',
              boxShadow: '0 0 20px rgba(107, 142, 35, 0.6)'
            }}
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              textShadow: [
                '0 0 10px rgba(139, 168, 62, 0.6), 0 0 20px rgba(139, 168, 62, 0.3)',
                '0 0 15px rgba(139, 168, 62, 0.8), 0 0 30px rgba(139, 168, 62, 0.5)',
                '0 0 10px rgba(139, 168, 62, 0.6), 0 0 20px rgba(139, 168, 62, 0.3)'
              ]
            }}
            transition={{
              opacity: { duration: 1, delay: 0.8 },
              textShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.3
              }
            }}
            className="font-terminal uppercase tracking-widest"
            style={{ 
              color: '#8BA83E',
              fontSize: '1.2rem' // ← CHANGE THIS VALUE TO ADJUST TAGLINE SIZE (currently 1.875rem = 30px)
              // Try: 2rem, 2.5rem, 3rem, 4rem, etc. for larger sizes
            }}
          >
            Creative • Technical • Physical
          </motion.p>
        </motion.div>

        {/* ====================================================================
           3D NAVIGATION BUTTONS - GRID LAYOUT (ALL VISIBLE)
           ====================================================================
           SEARCH KEYWORDS:
           - LANDING_NAVIGATION_BUTTONS
           - 3D_PARALLAX_BUTTONS
           - PORTFOLIO_NAV
           - GRID_LAYOUT
           
           Navigation Buttons:
           - Three main buttons for portfolio sections
           - Grid layout on desktop, stack on mobile
           - All visible at once (no scrolling needed)
           - 3D parallax tilt effect
           - Staggered entrance animations
           ================================================================== */}
        <div className="w-full max-w-7xl mt-8">
          {/* Desktop: 3-column grid, Tablet: 2-column, Mobile: stacked */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {portfolioButtons.map((button, index) => (
              <Navigation3DButton
                key={index}
                {...button}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Subtitle prompt - OLIVE GREEN THEME with blinking effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 md:mt-16 terminal text-xs sm:text-sm uppercase tracking-widest text-center flex items-center justify-center"
          style={{ color: 'rgba(107, 142, 35, 0.6)' }}
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 5px rgba(107, 142, 35, 0.3)',
                '0 0 15px rgba(107, 142, 35, 0.6)',
                '0 0 5px rgba(107, 142, 35, 0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            [ Select your portal
          </motion.span>
          <motion.span
            animate={{
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.5, 1]
            }}
            style={{
              color: '#6B8E23',
              textShadow: '0 0 10px #6B8E23',
              marginLeft: '0.25rem'
            }}
          >
            _
          </motion.span>
          <motion.span
            animate={{
              textShadow: [
                '0 0 5px rgba(107, 142, 35, 0.3)',
                '0 0 15px rgba(107, 142, 35, 0.6)',
                '0 0 5px rgba(107, 142, 35, 0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ]
          </motion.span>
        </motion.div>

        {/* Descriptive text with typing animation - OLIVE GREEN THEME */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-6 max-w-4xl mx-auto px-4"
        >
          <div className="terminal-border bg-black/40 backdrop-blur-sm p-6 md:p-8" style={{ borderColor: 'rgba(107, 142, 35, 0.3)' }}>
            <TypingTextAnimation 
              text="Blending creativity, technology, and movement — I craft stories that inspire, innovate, and connect. Explore my world as a Video Creative Director, Tech Enthusiast, and Fitness Enthusiast."
              theme="olive"
              loop={false}
              typingSpeed={30}
              textSize="text-sm sm:text-base md:text-lg"
              uppercase={false}
              className="text-center"
            />
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer page="landing" />
      </div>
    </div>
  )
}
