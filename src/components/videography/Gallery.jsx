import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import VideoLoader from '../shared/VideoLoader'

/* ============================================================================
   GALLERY COMPONENT
   ============================================================================
   SEARCH KEYWORDS:
   - GALLERY_MEDIA_CONFIG
   - GALLERY_DIMENSIONS
   - REPLACE_GALLERY_MEDIA
   
   NOTE: Gallery media is passed as props from App.jsx
   To replace gallery media, edit the 'media' array in App.jsx
   
   This component handles:
   - Grid layout display
   - Video hover auto-play
   - Lightbox trigger
   ============================================================================ */

export default function Gallery({ media, onOpen }) {
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
      {/* ========================================================================
         GALLERY SECTION DIMENSIONS
         ========================================================================
         SEARCH KEYWORDS:
         - GALLERY_SECTION_DIMENSIONS
         - GALLERY_PADDING
         - GALLERY_BACKGROUND
         
         Dimension Parameters:
         - py-20: Vertical padding (80px top/bottom)
         - px-6: Horizontal padding (24px)
         - min-h-screen: Minimum full viewport height
         - bg-black: Background color
         ======================================================================== */}
      {/* GALLERY_SECTION_PADDING */}
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 grid-bg opacity-30" />  {/* GALLERY_GRID_PATTERN_OPACITY */}
      
      {/* Content */}
      <div className="relative z-10">
        {/* ====================================================================
           GALLERY TITLE SECTION
           ====================================================================
           SEARCH KEYWORDS:
           - GALLERY_TITLE_SPACING
           - GALLERY_TITLE_TYPOGRAPHY
           
           Dimension Parameters:
           - mb-16: Title section bottom margin (64px)
           - text-5xl: Mobile title size
           - md:text-6xl: Desktop title size
           ================================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 max-w-7xl mx-auto"
        >
          {/* GALLERY_TITLE_MARGIN - Title bottom spacing (mb-16 = 64px) */}
          {/* GALLERY_TITLE_CONTAINER_WIDTH - max-w-7xl = 1280px */}
          <h2 className="terminal terminal-glow text-5xl md:text-6xl mb-4">
            {/* GALLERY_TITLE_SIZE - Font size: mobile(5xl) ? desktop(6xl) */}
            &gt; Our Work_
          </h2>
          <div className="h-0.5 w-24 bg-amber-glow shadow-[0_0_10px_rgba(255,180,0,0.5)]" />
          {/* GALLERY_TITLE_UNDERLINE - Height: 0.5 (2px), Width: 96px */}
          <p className="terminal text-amber-glow/70 text-lg mt-6 max-w-2xl">
            {/* GALLERY_SUBTITLE_SIZE - Font size: text-lg */}
            Explore our curated collection of cinematic stories
          </p>
        </motion.div>
        
        {/* ====================================================================
           GALLERY GRID LAYOUT
           ====================================================================
           SEARCH KEYWORDS:
           - GALLERY_GRID_CONFIG
           - GALLERY_GRID_SPACING
           - GALLERY_ITEM_DIMENSIONS
           
           Grid Layout:
           - grid-cols-1: Mobile (1 column)
           - sm:grid-cols-2: Tablet (2 columns at 640px+)
           - lg:grid-cols-3: Desktop (3 columns at 1024px+)
           
           Gap Spacing:
           - gap-4: Mobile (16px between items)
           - gap-5: Tablet (20px between items)
           - gap-6: Desktop (24px between items)
           ================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto">
          {/* GALLERY_GRID_LAYOUT - Change columns/gaps here */}
          
          {media.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                delay: idx * 0.1,  // GALLERY_ITEM_STAGGER - Animation delay between items (100ms)
                duration: 0.8,      // GALLERY_ITEM_ANIMATION_DURATION
                ease: [0.25, 0.1, 0.25, 1] 
              }}
              onClick={() => onOpen(idx)}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="relative aspect-video overflow-hidden terminal-border cursor-pointer group bg-black rounded-sm"
              /* GALLERY_ITEM_ASPECT - aspect-video = 16:9 ratio */
            >
              {/* GALLERY_MEDIA_ITEMS - Video and image rendering */}
              {item.type === 'video' ? (
                // GALLERY_VIDEO_SOURCE - Video files defined in App.jsx media array
                // GALLERY_VIDEO_BEHAVIOR - Shows poster until hover, then auto-plays with loading animation
                <VideoLoader theme="videography">
                  <video
                    ref={(el) => (videoRefs.current[idx] = el)}
                    src={item.src}
                    poster={item.poster}  // GALLERY_VIDEO_POSTER - Thumbnail image before play
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    // GALLERY_VIDEO_HOVER - scale-105 = 5% zoom on hover
                    // GALLERY_VIDEO_TRANSITION - 500ms transform duration
                    style={{
                      objectFit: 'cover',      // GALLERY_VIDEO_FIT - Options: cover, contain, fill
                      objectPosition: 'center center'  // GALLERY_VIDEO_POSITION - Focal point
                    }}
                    muted
                    loop
                    playsInline
                    preload="metadata"  // GALLERY_VIDEO_PRELOAD - Load metadata to trigger loading animation
                  />
                </VideoLoader>
              ) : (
                // GALLERY_IMAGE_SOURCE - Image files defined in App.jsx media array
                <VideoLoader theme="videography">
                  <img
                    src={item.src}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    // GALLERY_IMAGE_HOVER - scale-105 = 5% zoom on hover
                    // GALLERY_IMAGE_TRANSITION - 500ms transform duration
                    style={{
                      objectFit: 'cover',      // GALLERY_IMAGE_FIT - Options: cover, contain, fill
                      objectPosition: 'center center'  // GALLERY_IMAGE_POSITION - Focal point
                    }}
                  />
                </VideoLoader>
              )}
              
              {/* ====================================================================
                   GALLERY HOVER OVERLAY
                   ====================================================================
                   SEARCH KEYWORDS:
                   - GALLERY_PLAY_ICON
                   - GALLERY_OVERLAY_GRADIENT
                   - GALLERY_VIEW_BUTTON
                   
                   Overlay Behavior:
                   - Appears on hover (group-hover:opacity-100)
                   - Gradient fade (from-black/80 to transparent)
                   - Play icon and View button
                   ================================================================== */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                {/* GALLERY_OVERLAY_GRADIENT - from-black/80 (bottom) to transparent (top) */}
                {/* GALLERY_OVERLAY_TRANSITION - 300ms fade duration */}
                <span className="terminal terminal-glow text-5xl mb-2">?</span>
                {/* GALLERY_PLAY_ICON_SIZE - text-5xl = 48px */}
                {/* GALLERY_PLAY_ICON_MARGIN - mb-2 = 8px spacing */}
                <span className="terminal text-amber-glow text-sm">[ View ]</span>
                {/* GALLERY_VIEW_BUTTON_SIZE - text-sm = 14px */}
                {/* GALLERY_VIEW_BUTTON_COLOR - text-amber-glow = #FFB400 */}
              </div>
              
              {/* ====================================================================
                   GALLERY CATALOGUE LABEL
                   ====================================================================
                   SEARCH KEYWORDS:
                   - GALLERY_LABEL_TEXT
                   - GALLERY_LABEL_POSITION
                   
                   Label Display:
                   - Shows media type (VIDEO/IMAGE) and index number
                   - Positioned at bottom of item
                   - Appears on hover
                   ================================================================== */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* GALLERY_LABEL_GRADIENT - from-black/90 to transparent */}
                {/* GALLERY_LABEL_PADDING - p-4 = 16px all sides */}
                <div className="terminal text-amber-glow/90 text-xs">
                  {/* GALLERY_LABEL_SIZE - text-xs = 12px */}
                  {/* GALLERY_LABEL_COLOR - text-amber-glow/90 = #FFB400 at 90% opacity */}
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
