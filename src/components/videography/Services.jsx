import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoLoader from '../shared/VideoLoader'
import TypingTextAnimation from '../shared/TypingTextAnimation'

/* ============================================================================
   MEDIA REPLACEMENT GUIDE - SERVICES PAGE CAROUSEL
   ============================================================================
   SEARCH KEYWORDS: 
   - MEDIA_SERVICES_CAROUSEL
   - REPLACE_SERVICES_MEDIA
   - CAROUSEL_MEDIA_ASSETS
   
   LOCATION: Services page hover-triggered carousel (appears on card hover)
   
   Instructions:
   - Each service has 3 media items (video or image)
   - Supported types: 'video' or 'image'
   - Path format: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/filename.ext'
   - Recommended: Keep 3 items per service for consistent carousel timing
   - Video formats: .mp4, .webm
   - Image formats: .jpg, .png, .webp
   ============================================================================ */

// MEDIA_SERVICES_CAROUSEL - Service media collections for hover carousel
const serviceMedia = {
  // WEDDING_CAROUSEL_MEDIA - Wedding Films carousel (3 items)
  'Wedding Films': [
    { type: 'image', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/wedding.jpg', alt: 'Wedding Ceremony' },           // Item 1
    { type: 'video', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/TerryandAmankwa.mp4', alt: 'Wedding Film' },      // Item 2
    { type: 'image', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/diego.PNG', alt: 'Wedding Portrait' },            // Item 3
  ],
  
  // CORPORATE_CAROUSEL_MEDIA - Corporate Videos carousel (3 items)
  'Corporate Videos': [
    { type: 'video', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/HBH_final_2.mp4', alt: 'Corporate Production' },  // Item 1
    { type: 'video', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/visuals.mp4', alt: 'Brand Story' },               // Item 2
    { type: 'image', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/DSC00509.JPG', alt: 'Corporate Event' },          // Item 3
  ],
  
  // DOCUMENTARY_CAROUSEL_MEDIA - Documentary carousel (3 items)
  'Documentary': [
    { type: 'video', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/black_model_vid.mp4', alt: 'Documentary Film' },  // Item 1
    { type: 'image', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/big_slap-22.jpg', alt: 'Documentary Scene' },     // Item 2
    { type: 'video', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/final_export.mp4', alt: 'Documentary Story' },    // Item 3
  ],
  
  // MUSIC_CAROUSEL_MEDIA - Music Videos carousel (3 items)
  'Music Videos': [
    { type: 'video', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/porche-reel.mp4', alt: 'Music Video Production' }, // Item 1
    { type: 'video', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/ig_reel.mp4', alt: 'Music Video' },                // Item 2
    { type: 'image', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/car.png', alt: 'Music Video Scene' },              // Item 3
  ],
}

/* ============================================================================
   SERVICE CARDS CONFIGURATION
   ============================================================================
   SEARCH KEYWORDS:
   - SERVICES_CARD_CONFIG
   - SERVICE_TITLES
   - SERVICE_DESCRIPTIONS
   
   LOCATION: Services page card display (4 cards in grid)
   
   Instructions:
   - Each card has: title, description, icon (emoji)
   - Title must match key in serviceMedia object above
   - Icons: Use emoji or replace with icon component
   - Descriptions: Keep concise (under 60 characters recommended)
   ============================================================================ */

const services = [
  { 
    title: 'Wedding Films',  // WEDDING_CARD - Must match serviceMedia key
    description: 'Timeless cinematic coverage of your special day.',
    icon: '💍'
  },
  { 
    title: 'Corporate Videos',  // CORPORATE_CARD - Must match serviceMedia key
    description: 'Professional brand storytelling and promotional content.',
    icon: '🎬'
  },
  { 
    title: 'Documentary',  // DOCUMENTARY_CARD - Must match serviceMedia key
    description: 'Tell compelling stories through documentary-style filmmaking.',
    icon: '📽️'
  },
  { 
    title: 'Music Videos',  // MUSIC_CARD - Must match serviceMedia key
    description: 'Creative and artistic music video production for artists.',
    icon: '🎵'
  },
]

/* ============================================================================
   CAROUSEL TIMING & ANIMATION SETTINGS
   ============================================================================
   SEARCH KEYWORDS:
   - CAROUSEL_TIMING
   - CAROUSEL_ANIMATION_CONFIG
   - CAROUSEL_AUTO_ADVANCE
   
   LOCATION: Inside FuturisticCarousel component
   ============================================================================ */

// Futuristic Carousel Component
const FuturisticCarousel = ({ media, isActive }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRefs = useRef({})

  useEffect(() => {
    if (!isActive) return
    
    // CAROUSEL_AUTO_ADVANCE - Dynamic timing based on media type
    // Videos: 10 seconds, Images: 4 seconds
    const currentItem = media[currentIndex]
    const duration = currentItem.type === 'video' ? 10000 : 4000 // 10s for videos, 4s for images
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length)
    }, duration)

    return () => clearInterval(interval)
  }, [isActive, media.length, currentIndex, media])

  useEffect(() => {
    // Auto-play videos when active
    Object.values(videoRefs.current).forEach((video, idx) => {
      if (video && idx === currentIndex && isActive) {
        video.play().catch(() => {})
      } else if (video) {
        video.pause()
      }
    })
  }, [currentIndex, isActive])

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <AnimatePresence mode="wait">
        {media.map((item, idx) => (
          idx === currentIndex && (
            <motion.div
              key={`${item.src}-${idx}`}
              initial={{ 
                opacity: 0,
                scale: 0.8,
                rotateY: -30,
                z: -200,
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                rotateY: 0,
                z: 0,
              }}
              exit={{ 
                opacity: 0,
                scale: 1.1,
                rotateY: 30,
                z: -200,
              }}
              transition={{
                duration: 1.2,  // CAROUSEL_MORPH_DURATION - Entrance animation duration
                ease: [0.25, 0.1, 0.25, 1],  // CAROUSEL_EASE_CURVE - Animation easing
                scale: { type: "spring", stiffness: 100, damping: 20 }  // CAROUSEL_SPRING_PHYSICS
              }}
              className="absolute inset-0 overflow-hidden rounded-lg"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              {/* Holographic glow effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  boxShadow: [
                    '0 0 20px rgba(214, 229, 110, 0.3)',
                    '0 0 40px rgba(255, 180, 0, 0.5), inset 0 0 20px rgba(214, 229, 110, 0.2)',
                    '0 0 20px rgba(214, 229, 110, 0.3)',
                  ]
              }}
              transition={{ 
                duration: 2,  // CAROUSEL_GLOW_DURATION - Glow pulse duration
                repeat: Infinity,
                ease: "easeInOut"
              }}
              />

              {/* Media content */}
              {item.type === 'video' ? (
                <VideoLoader className="w-full h-full">
                  <video
                    ref={(el) => (videoRefs.current[idx] = el)}
                    src={item.src}  // CAROUSEL_VIDEO_SOURCE - Video file path
                    className="w-full h-full object-cover object-center"
                    style={{
                      objectFit: 'cover',  // CAROUSEL_VIDEO_FIT - Options: cover, contain, fill
                      objectPosition: 'center center'  // CAROUSEL_VIDEO_POSITION - Adjust focal point
                    }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                </VideoLoader>
              ) : (
                <VideoLoader className="w-full h-full">
                  <img
                    src={item.src}  // CAROUSEL_IMAGE_SOURCE - Image file path
                    alt={item.alt}
                    className="w-full h-full object-cover object-center"
                    style={{
                      objectFit: 'cover',  // CAROUSEL_IMAGE_FIT - Options: cover, contain, fill
                      objectPosition: 'center center'  // CAROUSEL_IMAGE_POSITION - Adjust focal point
                    }}
                  />
                </VideoLoader>
              )}              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* ================================================================
                 SCANNING LINE EFFECT REMOVED FROM MEDIA PREVIEW
                 ================================================================
                 SEARCH KEYWORDS:
                 - SERVICES_CAROUSEL_CLEAN
                 - MEDIA_PREVIEW_NO_SCANLINE
                 
                 Note: Scanning line removed for cleaner media viewing
                 ================================================================ */}

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-neon-yellow/50" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-neon-yellow/50" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-glow/50" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-glow/50" />

              {/* Media type indicator */}
              <motion.div 
                className="absolute bottom-4 right-4 terminal text-amber-glow/80 text-xs bg-black/60 px-3 py-1 backdrop-blur-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                {item.type === 'video' ? '[ VIDEO ]' : '[ IMAGE ]'} {idx + 1}/{media.length}
              </motion.div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Carousel navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 pointer-events-auto z-20">
        {media.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'bg-amber-glow w-8' 
                : 'bg-amber-glow/30 hover:bg-amber-glow/60'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Services({ backgroundImage }) {
  const [hoveredService, setHoveredService] = useState(null)

  return (
    <section 
      id="services" 
      className="relative py-16 md:py-24 lg:py-28 px-4 md:px-6 overflow-hidden"
      style={{ 
        backgroundColor: '#4A4A1A',
        minHeight: 'auto'
      }}
    >
      {/* ========================================================================
         SERVICES SECTION DIMENSIONS
         ========================================================================
         SEARCH KEYWORDS:
         - SERVICES_SECTION_DIMENSIONS
         - SERVICES_PADDING
         - SERVICES_BACKGROUND_COLOR
         
         Dimension Parameters:
         - py-16: Mobile padding (64px top/bottom)
         - py-24: Tablet padding (96px top/bottom) 
         - py-28: Desktop padding (112px top/bottom)
         - px-4: Mobile horizontal padding (16px)
         - px-6: Desktop horizontal padding (24px)
         - backgroundColor: Section background color (#4A4A1A)
         ======================================================================== */}
      {/* SERVICES_SECTION_PADDING */}
      {/* SERVICES_BG_COLOR - Change olive background color */}
      
      {/* Service Content - Title & Interactive Cards */}
      <div className="relative z-20 max-w-7xl mx-auto">  {/* SERVICES_MAX_WIDTH - Container max width (1280px) */}
        
        {/* ====================================================================
           SERVICES TITLE SECTION
           ====================================================================
           SEARCH KEYWORDS:
           - SERVICES_TITLE_SPACING
           - SERVICES_TITLE_TYPOGRAPHY
           
           Dimension Parameters:
           - mb-8: Mobile margin bottom (32px)
           - mb-12: Tablet margin bottom (48px)
           - mb-16: Desktop margin bottom (64px)
           - text-3xl to text-6xl: Responsive font sizes
           ================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="mb-8 md:mb-12 lg:mb-16"  // SERVICES_TITLE_MARGIN - Title bottom spacing
        >
          <h2 className="terminal terminal-glow text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 drop-shadow-[0_0_25px_rgba(255,180,0,0.9)]">
            {/* SERVICES_TITLE_SIZE - Responsive: mobile(3xl) → tablet(4xl) → desktop(6xl) */}
            &gt; Services_
          </h2>
          <div className="h-0.5 w-16 sm:w-20 md:w-24 bg-amber-glow shadow-[0_0_15px_rgba(255,180,0,0.6)]" />
          {/* SERVICES_TITLE_UNDERLINE - Height: 0.5 (2px), Width: mobile(64px) → tablet(80px) → desktop(96px) */}
        </motion.div>
        
        {/* ====================================================================
           SERVICE CARDS GRID
           ====================================================================
           SEARCH KEYWORDS:
           - SERVICES_GRID_LAYOUT
           - SERVICES_CARD_SPACING
           - SERVICES_CARD_DIMENSIONS
           
           Grid Layout:
           - grid-cols-1: Mobile (1 column)
           - sm:grid-cols-2: Tablet (2 columns at 640px+)
           - lg:grid-cols-4: Desktop (4 columns at 1024px+)
           
           Gap Spacing:
           - gap-4: Mobile (16px between cards)
           - gap-5: Tablet (20px between cards)
           - gap-6: Desktop (24px between cards)
           ================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {/* SERVICES_GRID_CONFIG - Change columns/gaps here */}
          
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                delay: i * 0.08,  // SERVICES_CARD_STAGGER - Delay between card animations (80ms)
                duration: 0.5,    // SERVICES_CARD_ANIMATION_DURATION
                ease: [0.25, 0.1, 0.25, 1] 
              }}
              whileHover={{ 
                scale: 1.03,  // SERVICES_CARD_HOVER_SCALE - Scale on hover
                y: -8         // SERVICES_CARD_HOVER_LIFT - Lift amount on hover (pixels)
              }}
              onHoverStart={() => setHoveredService(s.title)}
              onHoverEnd={() => setHoveredService(null)}
              className="relative terminal-border bg-black/90 backdrop-blur-xl hover:bg-black/95 transition-all duration-300 group cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.7)] hover:shadow-[0_0_50px_rgba(255,180,0,0.4)] overflow-hidden aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]"
              /* SERVICES_CARD_ASPECT - Card proportions:
                 - aspect-[3/4]: Mobile portrait (0.75 ratio)
                 - sm:aspect-[4/5]: Tablet balanced (0.8 ratio)
                 - lg:aspect-[3/4]: Desktop portrait (0.75 ratio) */
              style={{
                minHeight: '280px',  // SERVICES_CARD_MIN_HEIGHT - Minimum card height
                maxHeight: '400px'   // SERVICES_CARD_MAX_HEIGHT - Maximum card height
              }}
            >
              {/* Futuristic Carousel - Morphs in on hover */}
              <AnimatePresence>
                {hoveredService === s.title && (
                  <FuturisticCarousel 
                    media={serviceMedia[s.title]} 
                    isActive={hoveredService === s.title}
                  />
                )}
              </AnimatePresence>

              {/* Original card content - with fade out on hover */}
              <motion.div
                animate={{
                  opacity: hoveredService === s.title ? 0 : 1,
                  scale: hoveredService === s.title ? 0.95 : 1,
                }}
                transition={{ 
                  duration: 0.5,  // SERVICES_CARD_FADE_DURATION - Card content fade timing
                  ease: [0.25, 0.1, 0.25, 1] 
                }}
                className="relative z-20 h-full flex flex-col justify-between p-4 sm:p-5 md:p-6"
                /* SERVICES_CARD_PADDING - Card internal padding:
                   - p-4: Mobile (16px)
                   - sm:p-5: Tablet (20px)
                   - md:p-6: Desktop (24px) */
              >
                <div>
                  <div className="terminal text-amber-glow text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 terminal-glow">
                    {/* SERVICES_ICON_SIZE - Icon font sizes: mobile(3xl) → tablet(4xl) → desktop(5xl) */}
                    {s.icon}
                  </div>
                  <h3 className="terminal text-xl sm:text-2xl md:text-2xl mb-2 sm:mb-3 group-hover:terminal-glow transition-all leading-tight">
                    {/* SERVICES_CARD_TITLE_SIZE - Title font sizes: mobile(xl) → tablet(2xl) */}
                    {s.title}
                  </h3>
                  <p className="text-amber-glow/70 font-terminal text-xs sm:text-sm leading-relaxed uppercase tracking-wide">
                    {/* SERVICES_CARD_DESC_SIZE - Description font sizes: mobile(xs) → tablet(sm) */}
                    {s.description}
                  </p>
                </div>
                
                {/* Interactive indicator with typing animation - centralized */}
                <TypingTextAnimation 
                  text="[ HOVER TO PREVIEW ]"
                  className="mt-4 group-hover:scale-110 transition-transform"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
