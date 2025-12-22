import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import VideoLoader from '../shared/VideoLoader'

/* ============================================================================
   FITNESS GALLERY COMPONENT
   ============================================================================
   Self-contained gallery for fitness page with ORANGE theme (#FF6B35)
   ============================================================================ */

export default function FitnessGallery({ media, onOpen }) {
  const videoRefs = useRef({})

  const handleMouseEnter = (idx) => {
    if (videoRefs.current[idx]) {
      videoRefs.current[idx].play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }

  const handleMouseLeave = (idx) => {
    if (videoRefs.current[idx]) {
      videoRefs.current[idx].pause()
      videoRefs.current[idx].currentTime = 0
    }
  }

  return (
    <div className="relative py-20 px-6 min-h-screen bg-black">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* TITLE SECTION - FITNESS ORANGE THEME */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 max-w-7xl mx-auto"
        >
          <h2 className="terminal text-5xl md:text-6xl mb-4" style={{ color: '#FF6B35', textShadow: '0 0 20px #FF6B35' }}>
            &gt; Transformation Gallery_
          </h2>
          <div className="h-0.5 w-24" style={{ backgroundColor: '#FF6B35', boxShadow: '0 0 10px #FF6B35' }} />
          <p className="terminal text-lg mt-6 max-w-2xl" style={{ color: '#FF6B35BB' }}>
            Witness the journey of dedication, discipline, and transformation
          </p>
        </motion.div>
        
        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto">
          {media.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                delay: idx * 0.1,
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1] 
              }}
              onClick={() => onOpen(idx)}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="relative aspect-video overflow-hidden cursor-pointer group bg-black rounded-sm"
              style={{ border: '1px solid rgba(255, 107, 53, 0.3)' }}
            >
              {item.type === 'video' ? (
                <VideoLoader className="w-full h-full" theme="fitness">
                  <video
                    ref={(el) => (videoRefs.current[idx] = el)}
                    src={item.src}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center center'
                    }}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </VideoLoader>
              ) : (
                <VideoLoader className="w-full h-full" theme="fitness">
                  <img
                    src={item.src}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center center'
                    }}
                  />
                </VideoLoader>
              )}
              
              {/* HOVER OVERLAY - ORANGE THEME */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <span className="terminal text-5xl mb-2" style={{ color: '#FF6B35', textShadow: '0 0 20px #FF6B35' }}>▶</span>
                <span className="terminal text-sm" style={{ color: '#FF6B35' }}>[ View ]</span>
              </div>
              
              {/* CATALOGUE LABEL - ORANGE THEME */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="terminal text-xs" style={{ color: '#FF6B35DD' }}>
                  {item.type === 'video' ? '[ VIDEO ]' : '[ IMAGE ]'} {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
