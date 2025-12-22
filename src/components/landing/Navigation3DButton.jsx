/* ====================================================================
   3D PARALLAX NAVIGATION BUTTON
   ====================================================================
   SEARCH KEYWORDS:
   - NAVIGATION_3D_BUTTON
   - PARALLAX_TILT_BUTTON
   - LANDING_PAGE_BUTTON
   
   Purpose:
   - Stunning 3D button with parallax tilt effect
   - Mouse tracking for dynamic perspective
   - Scroll-reveal animation
   - Smooth spring physics
   ================================================================== */
import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Navigation3DButton({ 
  title, 
  subtitle, 
  route, 
  icon, 
  index,
  accentColor = '#FFB400' 
}) {
  const navigate = useNavigate()
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse tracking for parallax tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth animation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 30
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 30
  })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)
    
    mouseX.set(percentX)
    mouseY.set(percentY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleClick = (e) => {
    e.preventDefault()
    console.log('Button clicked, navigating to:', route)
    window.scrollTo(0, 0)
    navigate(route)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, rotateX: -15, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="relative w-full max-w-2xl mx-auto"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          height: 'clamp(280px, 35vh, 400px)' // Responsive height that adapts to screen
        }}
        whileHover={{ 
          scale: 1.05,
          z: 50
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="relative w-full rounded-2xl overflow-hidden group cursor-pointer active:scale-95"
      >
        {/* Background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          style={{
            transform: 'translateZ(-20px)'
          }}
        />

        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${accentColor}40, transparent, ${accentColor}60)`,
            transform: 'translateZ(-10px)'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Inner content container */}
        <div 
          className="absolute inset-[2px] bg-black rounded-2xl flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 relative"
          style={{
            transform: 'translateZ(20px)'
          }}
        >
          {/* Main content - centered vertically */}
          <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
            {/* Icon */}
            <motion.div
              animate={{
                y: isHovered ? -10 : 0,
                rotateY: isHovered ? 360 : 0
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                rotateY: {
                  duration: 0.8,
                  ease: "easeInOut"
                }
              }}
              className="text-6xl sm:text-7xl md:text-8xl mb-4"
              style={{
                textShadow: `0 0 30px ${accentColor}`,
                transform: 'translateZ(40px)'
              }}
            >
              {icon}
            </motion.div>

            {/* Title */}
            <motion.h3
              className="terminal terminal-glow text-2xl sm:text-3xl md:text-4xl mb-2 text-center"
              style={{
                color: accentColor,
                textShadow: `0 0 20px ${accentColor}`,
                transform: 'translateZ(30px)'
              }}
              animate={{
                scale: isHovered ? 1.1 : 1
              }}
            >
              {title}
            </motion.h3>

            {/* Subtitle */}
            <motion.p
              className="font-terminal text-xs sm:text-sm md:text-base text-center uppercase tracking-widest mb-3"
              style={{
                color: `${accentColor}99`,
                transform: 'translateZ(25px)'
              }}
            >
              {subtitle}
            </motion.p>

            {/* Animated underline */}
            <motion.div
              className="h-1 rounded-full mb-2"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 20px ${accentColor}`,
                transform: 'translateZ(30px)'
              }}
              animate={{
                width: isHovered ? '60%' : '30%'
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            />
          </div>

          {/* Enter indicator with blinking effect - Fixed at bottom */}
          <motion.div
            className="terminal text-xs uppercase tracking-widest flex items-center flex-shrink-0"
            style={{
              color: `${accentColor}66`,
              transform: 'translateZ(20px)',
              paddingBottom: '0.5rem'
            }}
            animate={{
              opacity: isHovered ? 1 : 0.5,
              y: isHovered ? 0 : 5
            }}
          >
            <span>[ CLICK TO ENTER </span>
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
                color: accentColor,
                textShadow: `0 0 10px ${accentColor}`
              }}
            >
              _
            </motion.span>
            <span>]</span>
          </motion.div>
        </div>

        {/* Corner accents */}
        <div 
          className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 opacity-50"
          style={{
            borderColor: accentColor,
            transform: 'translateZ(35px)'
          }}
        />
        <div 
          className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 opacity-50"
          style={{
            borderColor: accentColor,
            transform: 'translateZ(35px)'
          }}
        />
        <div 
          className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 opacity-50"
          style={{
            borderColor: accentColor,
            transform: 'translateZ(35px)'
          }}
        />
        <div 
          className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 opacity-50"
          style={{
            borderColor: accentColor,
            transform: 'translateZ(35px)'
          }}
        />

        {/* Holographic glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at center, ${accentColor}20, transparent 70%)`,
            transform: 'translateZ(40px)'
          }}
          animate={{
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0.2,
            scale: isHovered ? [1, 1.05, 1] : 1
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Scan line effect (only on hover) */}
        {isHovered && (
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
              boxShadow: `0 0 10px ${accentColor}`,
              transform: 'translateZ(45px)'
            }}
            animate={{
              top: ['0%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
      </motion.div>

      {/* Shadow layer */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-10 blur-2xl"
        style={{
          backgroundColor: `${accentColor}40`,
          transform: 'translateZ(-30px)'
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.1 : 1
        }}
      />
    </motion.div>
  )
}
