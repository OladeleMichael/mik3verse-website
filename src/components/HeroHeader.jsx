/* ====================================================================
   HERO HEADER COMPONENT
   ====================================================================
   SEARCH KEYWORDS:
   - HERO_MEDIA_CONFIG
   - REPLACE_HERO_MEDIA
   - HERO_DIMENSIONS
   
   Purpose:
   - Full-screen hero section with video/image background
   - Terminal-style typing animation
   - Glitch effect on title
   
   Hero Media:
   - Hero media is passed as props from App.jsx
   - To replace hero media, edit the 'heroMedia' object in App.jsx
   - Supports video (MP4) or image (JPG/PNG)
   ================================================================== */
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function HeroHeader({ media, onViewGallery }) {
  const [glitch, setGlitch] = useState(false)
  const [typedText, setTypedText] = useState('')
  const fullText = '> Cinematic Films For Your Story_'  
  // HERO_TERMINAL_TEXT - Terminal typing text content

  /* ====================================================================
     HERO GLITCH EFFECT
     ====================================================================
     SEARCH KEYWORDS:
     - HERO_GLITCH_TIMING
     - HERO_GLITCH_DURATION
     
     Glitch Animation:
     - Triggers every 5000ms (5 seconds)
     - Lasts for 200ms
     - Applied to hero title
     ================================================================== */
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)  // HERO_GLITCH_DURATION
    }, 5000)  // HERO_GLITCH_INTERVAL - Time between glitch effects
    return () => clearInterval(interval)
  }, [])

  /* ====================================================================
     HERO TYPING ANIMATION
     ====================================================================
     SEARCH KEYWORDS:
     - HERO_TYPING_SPEED
     - HERO_TEXT_CONTENT
     
     Typing Effect:
     - Types out terminal text character by character
     - 80ms delay per character
     - Plays once on component mount
     ================================================================== */
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 80) // HERO_TYPING_SPEED - 80ms per character
    return () => clearInterval(typingInterval)
  }, [])

  return (
    <header className="relative h-screen w-full overflow-hidden bg-black">
      {/* ====================================================================
         HERO SECTION DIMENSIONS
         ====================================================================
         SEARCH KEYWORDS:
         - HERO_SECTION_HEIGHT
         - HERO_SECTION_WIDTH
         - HERO_BACKGROUND
         
         Section Sizing:
         - h-screen: Full viewport height (100vh)
         - w-full: Full width (100%)
         - overflow-hidden: Clips content that exceeds boundaries
         - bg-black: Fallback background color
         ================================================================== */}
      {/* HERO_SECTION_HEIGHT - h-screen = 100vh */}
      {/* HERO_SECTION_WIDTH - w-full = 100% */}
      
      <div className="scanline" />
      {/* HERO_SCANLINE_EFFECT - Animated scanline overlay (defined in styles.css) */}
      
      {/* ====================================================================
         HERO BACKGROUND MEDIA
         ====================================================================
         SEARCH KEYWORDS:
         - HERO_VIDEO_SOURCE
         - HERO_IMAGE_SOURCE
         - HERO_MEDIA_FIT
         
         Background Media:
         - Video: Autoplay, loop, muted for browser compatibility
         - Image: Fallback if video not used
         - Media source defined in App.jsx (heroMedia prop)
         ================================================================== */}
      <div className="absolute inset-0 z-0">
        {media.type === 'video' ? (
          // HERO_VIDEO_SOURCE - Video file path (defined in App.jsx)
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={media.poster}  // HERO_VIDEO_POSTER - Thumbnail before load
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              objectFit: 'cover',      // HERO_VIDEO_FIT - Options: cover, contain, fill
              objectPosition: 'center center'  // HERO_VIDEO_POSITION - Focal point
            }}
          >
            <source src={media.src} type="video/mp4" />
          </video>
        ) : (
          // HERO_IMAGE_SOURCE - Image file path (defined in App.jsx)
          <img 
            src={media.src} 
            alt="Hero" 
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              objectFit: 'cover',      // HERO_IMAGE_FIT - Options: cover, contain, fill
              objectPosition: 'center center'  // HERO_IMAGE_POSITION - Focal point
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        {/* HERO_OVERLAY_GRADIENT - Darkens media for text readability */}
        {/* from-black/70 (top) ? via-black/40 (middle) ? to-black/90 (bottom) */}
      </div>
      
      {/* ====================================================================
         HERO CONTENT CONTAINER
         ====================================================================
         SEARCH KEYWORDS:
         - HERO_CONTENT_PADDING
         - HERO_CONTENT_LAYOUT
         
         Content Layout:
         - Centered vertically and horizontally
         - z-10: Above background media layer
         - px-3 ? px-4 ? px-6: Responsive horizontal padding
         ================================================================== */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-3 sm:px-4 md:px-6">
        {/* HERO_CONTENT_PADDING - Responsive: 12px ? 16px ? 24px */}
        
        {/* ====================================================================
           HERO TITLE SECTION
           ====================================================================
           SEARCH KEYWORDS:
           - HERO_TITLE_TEXT
           - HERO_TITLE_SIZE
           - HERO_TITLE_ANIMATION
           
           Title Styling:
           - MIK3VERSE brand name
           - Responsive sizing: text-4xl ? text-9xl
           - Glitch effect applied via class
           - Neon yellow underline accent
           ================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}  // HERO_TITLE_ANIMATION_START
          animate={{ opacity: 1, y: 0 }}     // HERO_TITLE_ANIMATION_END
          transition={{ duration: 1, ease: 'easeOut' }}  // HERO_TITLE_ANIMATION_DURATION
          className={glitch ? 'glitch' : ''}
        >
          <h1 className="header-title header-glow text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-5 md:mb-6 tracking-wider">
            {/* HERO_TITLE_SIZE - Responsive scale:
                Mobile: text-4xl = 36px
                Small: text-5xl = 48px
                Medium: text-7xl = 72px
                Large: text-8xl = 96px
                XLarge: text-9xl = 128px */}
            {/* HERO_TITLE_MARGIN - mb-4 ? mb-5 ? mb-6 (16px ? 20px ? 24px) */}
            MIK3VERSE
            {/* HERO_TITLE_TEXT - Brand name, change here */}
          </h1>
          <div className="h-0.5 sm:h-1 w-20 sm:w-24 md:w-32 mx-auto bg-neon-yellow shadow-[0_0_10px_rgba(214,229,110,0.5)] mb-6 sm:mb-7 md:mb-8" />
          {/* HERO_TITLE_UNDERLINE_HEIGHT - h-0.5 ? h-1 (2px ? 4px) */}
          {/* HERO_TITLE_UNDERLINE_WIDTH - w-20 ? w-24 ? w-32 (80px ? 96px ? 128px) */}
          {/* HERO_TITLE_UNDERLINE_COLOR - bg-neon-yellow = #D6E56E */}
        </motion.div>
        
        {/* ====================================================================
           HERO TERMINAL TEXT
           ====================================================================
           SEARCH KEYWORDS:
           - HERO_TAGLINE_TEXT
           - HERO_TAGLINE_SIZE
           - HERO_TAGLINE_ANIMATION
           
           Terminal Tagline:
           - Typing animation effect
           - Terminal-style with glowing cursor
           - Responsive text sizing
           ================================================================== */}
        <motion.p
          initial={{ opacity: 0 }}           // HERO_TAGLINE_ANIMATION_START
          animate={{ opacity: 1 }}           // HERO_TAGLINE_ANIMATION_END
          transition={{ delay: 0.4, duration: 0.8 }}  // HERO_TAGLINE_ANIMATION_DELAY
          className="terminal terminal-glow text-base sm:text-lg md:text-2xl lg:text-3xl mb-8 sm:mb-10 md:mb-12 max-w-2xl font-mono px-4"
        >
          {/* HERO_TAGLINE_SIZE - Responsive scale:
              Mobile: text-base = 16px
              Small: text-lg = 18px
              Medium: text-2xl = 24px
              Large: text-3xl = 30px */}
          {/* HERO_TAGLINE_MARGIN - mb-8 ? mb-10 ? mb-12 (32px ? 40px ? 48px) */}
          {/* HERO_TAGLINE_MAX_WIDTH - max-w-2xl = 672px */}
          {typedText}
          <span className="animate-pulse">|</span>
          {/* HERO_CURSOR_ANIMATION - Blinking cursor */}
        </motion.p>
        
        {/* ====================================================================
           HERO CTA BUTTON
           ====================================================================
           SEARCH KEYWORDS:
           - HERO_BUTTON_TEXT
           - HERO_BUTTON_SIZE
           - HERO_BUTTON_ANIMATION
           
           Call-to-Action:
           - View Gallery button
           - Neon button styling (defined in styles.css)
           - Scale animation on hover/tap
           ================================================================== */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}  // HERO_BUTTON_ANIMATION_START
          animate={{ opacity: 1, scale: 1 }}    // HERO_BUTTON_ANIMATION_END
          transition={{ delay: 0.8, duration: 0.6 }}  // HERO_BUTTON_ANIMATION_DELAY
          whileHover={{ scale: 1.05 }}  // HERO_BUTTON_HOVER_SCALE - 5% zoom
          whileTap={{ scale: 0.95 }}    // HERO_BUTTON_TAP_SCALE - 5% shrink
          onClick={onViewGallery}
          className="neon-button text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3"
        >
          {/* HERO_BUTTON_SIZE - Responsive:
              Mobile: text-sm = 14px, px-4 = 16px, py-2 = 8px
              Small: text-base = 16px, px-6 = 24px, py-3 = 12px
              Medium: text-lg = 18px, px-8 = 32px */}
          [ View Gallery ]
          {/* HERO_BUTTON_TEXT - Button label */}
        </motion.button>
        
        {/* ====================================================================
           HERO SCROLL INDICATOR
           ====================================================================
           SEARCH KEYWORDS:
           - HERO_SCROLL_ICON
           - HERO_SCROLL_ANIMATION
           - HERO_SCROLL_POSITION
           
           Scroll Prompt:
           - Positioned at bottom of hero section
           - Floating animation (up/down)
           - Terminal-style arrow icon
           ================================================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}  // HERO_SCROLL_BOUNCE - Floating animation
          transition={{ delay: 1.2, duration: 2, repeat: Infinity }}  // HERO_SCROLL_ANIMATION_SPEED
          className="absolute bottom-8 sm:bottom-10 terminal text-amber-glow text-base sm:text-lg md:text-xl"
        >
          {/* HERO_SCROLL_POSITION - bottom-8 ? bottom-10 (32px ? 40px from bottom) */}
          {/* HERO_SCROLL_SIZE - text-base ? text-lg ? text-xl (16px ? 18px ? 20px) */}
          {/* HERO_SCROLL_COLOR - text-amber-glow = #FFB400 */}
           Scroll
        </motion.div>
      </div>
    </header>
  )
}
