import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactPlayer from 'react-player'
import VideoLoader from '../shared/VideoLoader'

/* ============================================================================t React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactPlayer from 'react-player'

/* ============================================================================
   LIGHTBOX COMPONENT - ADAPTIVE VIDEO DIMENSIONS
   ============================================================================
   SEARCH KEYWORDS:
   - LIGHTBOX_VIDEO_DIMENSIONS
   - ADAPTIVE_VIDEO_SIZE
   - AUTO_VIDEO_ASPECT_RATIO
   
   This component automatically adapts to video dimensions:
   - Detects video aspect ratio on load
   - Adjusts container to match video proportions
   - Handles portrait, landscape, and square videos
   - Works automatically for any video (no manual configuration needed)
   ============================================================================ */

export default function Lightbox({ media, start, onClose }) {
  const [current, setCurrent] = useState(start)
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0, aspectRatio: 16/9 })
  const videoRef = useRef(null)

  /* ========================================================================
     KEYBOARD NAVIGATION
     ======================================================================== */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrent((c) => (c > 0 ? c - 1 : media.length - 1))
      if (e.key === 'ArrowRight') setCurrent((c) => (c < media.length - 1 ? c + 1 : 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [media.length, onClose])

  /* ========================================================================
     ADAPTIVE VIDEO DIMENSIONS - AUTO-DETECT ON MEDIA CHANGE
     ========================================================================
     SEARCH KEYWORDS:
     - LIGHTBOX_AUTO_DIMENSIONS
     - VIDEO_METADATA_DETECTION
     - RESET_VIDEO_DIMENSIONS
     
     Resets dimensions when switching between media items
     ======================================================================== */
  useEffect(() => {
    // Reset dimensions when media changes
    setVideoDimensions({ width: 0, height: 0, aspectRatio: 16/9 })
  }, [current])

  /* ========================================================================
     VIDEO METADATA HANDLER - AUTOMATIC DIMENSION DETECTION
     ========================================================================
     SEARCH KEYWORDS:
     - LIGHTBOX_VIDEO_READY
     - AUTO_ASPECT_RATIO_DETECTION
     - DYNAMIC_VIDEO_SIZING
     
     This function runs when ReactPlayer is ready
     Extracts actual video dimensions and calculates aspect ratio
     Automatically adapts container to match video proportions
     ======================================================================== */
  const handleVideoReady = (player) => {
    const internalPlayer = player.getInternalPlayer()
    if (internalPlayer && internalPlayer.videoWidth && internalPlayer.videoHeight) {
      const width = internalPlayer.videoWidth
      const height = internalPlayer.videoHeight
      const aspectRatio = width / height
      
      setVideoDimensions({
        width,
        height,
        aspectRatio
      })
    }
  }

  /* ========================================================================
     IMAGE LOAD HANDLER - AUTOMATIC DIMENSION DETECTION FOR IMAGES
     ========================================================================
     SEARCH KEYWORDS:
     - LIGHTBOX_IMAGE_DIMENSIONS
     - AUTO_IMAGE_ASPECT_RATIO
     
     Detects image dimensions when loaded
     ======================================================================== */
  const handleImageLoad = (e) => {
    const img = e.target
    const aspectRatio = img.naturalWidth / img.naturalHeight
    setVideoDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
      aspectRatio
    })
  }

  const item = media[current]

  /* ========================================================================
     ADAPTIVE CONTAINER STYLES - DYNAMIC BASED ON ASPECT RATIO
     ========================================================================
     SEARCH KEYWORDS:
     - LIGHTBOX_CONTAINER_DIMENSIONS
     - ADAPTIVE_CONTAINER_WIDTH
     - ASPECT_RATIO_RESPONSIVE
     
     Container automatically adjusts based on detected video/image aspect ratio:
     - Portrait (< 0.75): max-w-2xl (672px) for narrow videos
     - Square (~1.0): max-w-4xl (896px) for square videos
     - Landscape (> 1.5): max-w-7xl (1280px) for wide videos
     - Standard (default): max-w-6xl (1152px) for 16:9 videos
     
     To adjust container sizes, modify the maxWidth values below
     ======================================================================== */
  const getContainerClass = () => {
    const ar = videoDimensions.aspectRatio
    
    if (ar < 0.75) {
      // Portrait videos (e.g., 9:16, TikTok style)
      return 'max-w-2xl'  // LIGHTBOX_PORTRAIT_MAX_WIDTH
    } else if (ar < 1.2) {
      // Square-ish videos (e.g., 1:1, 4:5)
      return 'max-w-4xl'  // LIGHTBOX_SQUARE_MAX_WIDTH
    } else if (ar > 1.8) {
      // Ultra-wide videos (e.g., 21:9, cinematic)
      return 'max-w-7xl'  // LIGHTBOX_ULTRAWIDE_MAX_WIDTH
    } else {
      // Standard landscape (e.g., 16:9, 4:3)
      return 'max-w-6xl'  // LIGHTBOX_LANDSCAPE_MAX_WIDTH
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center"
        onClick={onClose}
      >
        {/* ================================================================
           LIGHTBOX BACKGROUND (NO SCANLINE ON MEDIA PREVIEW)
           ================================================================
           SEARCH KEYWORDS:
           - LIGHTBOX_BACKGROUND
           - MEDIA_PREVIEW_CLEAN
           
           Note: Scanline effect removed from media preview for cleaner viewing
           ================================================================ */}
        
        {/* ================================================================
           CLOSE BUTTON - TOP RIGHT
           ================================================================
           SEARCH KEYWORDS:
           - LIGHTBOX_CLOSE_BUTTON
           - LIGHTBOX_BUTTON_POSITION
           ================================================================ */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 terminal terminal-glow text-5xl hover:scale-110 transition z-50"
        >
          
        </button>
        
        {/* ================================================================
           NAVIGATION BUTTONS - LEFT/RIGHT ARROWS
           ================================================================
           SEARCH KEYWORDS:
           - LIGHTBOX_NAVIGATION_BUTTONS
           - LIGHTBOX_PREV_NEXT
           ================================================================ */}
        <button
          onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c > 0 ? c - 1 : media.length - 1)) }}
          className="absolute left-4 terminal terminal-glow text-5xl hover:scale-110 transition z-50"
        >
          
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c < media.length - 1 ? c + 1 : 0)) }}
          className="absolute right-4 terminal terminal-glow text-5xl hover:scale-110 transition z-50"
        >
          
        </button>
        
        {/* ================================================================
           ADAPTIVE MEDIA CONTAINER - DYNAMIC WIDTH BASED ON ASPECT RATIO
           ================================================================
           SEARCH KEYWORDS:
           - LIGHTBOX_MEDIA_CONTAINER
           - ADAPTIVE_VIDEO_CONTAINER
           - DYNAMIC_CONTAINER_WIDTH
           
           Container width automatically adjusts based on video/image aspect ratio
           No manual configuration needed - works for any media dimensions
           ================================================================ */}
        <div 
          className={`${getContainerClass()} max-h-[90vh] w-full mx-4 terminal-border bg-black p-2 transition-all duration-500`}
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === 'video' ? (
            /* ==============================================================
               VIDEO PLAYER - ADAPTIVE DIMENSIONS
               ==============================================================
               SEARCH KEYWORDS:
               - LIGHTBOX_VIDEO_PLAYER
               - REACTPLAYER_CONFIG
               - VIDEO_AUTOPLAY
               
               ReactPlayer automatically detects video dimensions
               onReady callback extracts metadata for container adaptation
               ============================================================== */
            <VideoLoader className="w-full" style={{ height: 'auto', maxHeight: '85vh' }}>
              <ReactPlayer
                ref={videoRef}
                url={item.src}
                controls
                playing
                width="100%"
                height="auto"
                style={{ maxHeight: '85vh' }}
                onReady={handleVideoReady}
                config={{
                  file: {
                    attributes: {
                      poster: item.poster
                    }
                  }
                }}
              />
            </VideoLoader>
          ) : (
            /* ==============================================================
               IMAGE DISPLAY - ADAPTIVE DIMENSIONS
               ==============================================================
               SEARCH KEYWORDS:
               - LIGHTBOX_IMAGE_DISPLAY
               - IMAGE_ASPECT_RATIO
               
               Image automatically detects dimensions on load
               ============================================================== */
            <VideoLoader className="w-full">
              <img 
                src={item.src} 
                alt={`Media ${current + 1}`} 
                className="w-full h-auto max-h-[85vh] object-contain" 
                onLoad={handleImageLoad}
              />
            </VideoLoader>
          )}
        </div>
        
        {/* ================================================================
           MEDIA COUNTER - BOTTOM CENTER
           ================================================================
           SEARCH KEYWORDS:
           - LIGHTBOX_COUNTER
           - MEDIA_INDEX_DISPLAY
           ================================================================ */}
        <div className="absolute bottom-6 terminal terminal-glow text-xl">
          [ {current + 1} / {media.length} ]
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
