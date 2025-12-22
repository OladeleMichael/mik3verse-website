import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactPlayer from 'react-player'
import VideoLoader from '../shared/VideoLoader'

/* ============================================================================
   FITNESS LIGHTBOX COMPONENT - ADAPTIVE VIDEO DIMENSIONS
   ============================================================================
   Self-contained lightbox for fitness page
   ============================================================================ */

export default function FitnessLightbox({ media, start, onClose }) {
  const [current, setCurrent] = useState(start)
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0, aspectRatio: 16/9 })
  const videoRef = useRef(null)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrent((c) => (c > 0 ? c - 1 : media.length - 1))
      if (e.key === 'ArrowRight') setCurrent((c) => (c < media.length - 1 ? c + 1 : 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [media.length, onClose])

  useEffect(() => {
    setVideoDimensions({ width: 0, height: 0, aspectRatio: 16/9 })
  }, [current])

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

  const getContainerClass = () => {
    const ar = videoDimensions.aspectRatio
    
    if (ar < 0.75) {
      return 'max-w-2xl'
    } else if (ar < 1.2) {
      return 'max-w-4xl'
    } else if (ar > 1.8) {
      return 'max-w-7xl'
    } else {
      return 'max-w-6xl'
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 terminal text-5xl hover:scale-110 transition z-50"
          style={{ color: '#FF6B35', textShadow: '0 0 20px #FF6B35' }}
        >
          ✕
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c > 0 ? c - 1 : media.length - 1)) }}
          className="absolute left-4 terminal text-5xl hover:scale-110 transition z-50"
          style={{ color: '#FF6B35', textShadow: '0 0 20px #FF6B35' }}
        >
          ‹
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c < media.length - 1 ? c + 1 : 0)) }}
          className="absolute right-4 terminal text-5xl hover:scale-110 transition z-50"
          style={{ color: '#FF6B35', textShadow: '0 0 20px #FF6B35' }}
        >
          ›
        </button>
        
        <div 
          className={`${getContainerClass()} max-h-[90vh] w-full mx-4 bg-black p-2 transition-all duration-500`}
          style={{ border: '2px solid rgba(255, 107, 53, 0.5)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === 'video' ? (
            <VideoLoader className="w-full" theme="fitness" style={{ height: 'auto', maxHeight: '85vh' }}>
              <ReactPlayer
                ref={videoRef}
                url={item.src}
                controls
                playing
                width="100%"
                height="auto"
                style={{ maxHeight: '85vh' }}
                onReady={handleVideoReady}
              />
            </VideoLoader>
          ) : (
            <VideoLoader className="w-full" theme="fitness">
              <img 
                src={item.src} 
                alt={`Media ${current + 1}`} 
                className="w-full h-auto max-h-[85vh] object-contain" 
                onLoad={handleImageLoad}
              />
            </VideoLoader>
          )}
        </div>
        
        <div className="absolute bottom-6 terminal text-xl" style={{ color: '#FF6B35', textShadow: '0 0 20px #FF6B35' }}>
          [ {current + 1} / {media.length} ]
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
