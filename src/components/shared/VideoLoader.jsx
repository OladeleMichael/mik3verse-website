/* ====================================================================
   VIDEO LOADER COMPONENT - RETRO STYLE WITH DYNAMIC THEMING
   ====================================================================
   Purpose:
   - Displays retro/modern loading animation while media loads
   - CRT-style scanlines and VHS tracking effect
   - Terminal-style "LOADING" text with glowing brackets
   - Spinning loader with progress bar
   - Automatically fades out when media is ready
   - Supports dynamic color themes per page
   
   Usage:
   - Wrap around <video> or <img> elements
   - Pass theme prop: 'videography', 'tech', 'fitness', 'landing'
   - Automatically detects when media is loaded
   - Fade-out transition when content is ready
   
   Color Themes:
   - videography: Amber/Yellow (#FFB400)
   - tech: Cyan/Blue (#00D9FF)
   - fitness: Orange/Red (#FF6B35)
   - landing: Olive/Green (#6B8E23)
   ================================================================== */
import React, { useState } from 'react'

const themeColors = {
  videography: '#FFB400',  // Amber glow
  tech: '#00D9FF',         // Cyan glow
  fitness: '#FF6B35',      // Orange glow
  landing: '#6B8E23',      // Olive glow
  default: '#FFB400'       // Default amber
}

export default function VideoLoader({ children, type = 'video', className = '', theme = 'videography', style = {} }) {
  const [loaded, setLoaded] = useState(false)
  
  const themeColor = themeColors[theme] || themeColors.default

  // Clone the child element and add loading event handlers
  const childWithLoadHandler = React.cloneElement(children, {
    onLoadedMetadata: (e) => {
      // For videos with preload="metadata", this fires when metadata is ready
      setLoaded(true)
      // Call original handler if it exists
      if (children.props.onLoadedMetadata) {
        children.props.onLoadedMetadata(e)
      }
    },
    onLoadedData: (e) => {
      setLoaded(true)
      // Call original handler if it exists
      if (children.props.onLoadedData) {
        children.props.onLoadedData(e)
      }
    },
    onCanPlay: (e) => {
      setLoaded(true)
      // Call original handler if it exists
      if (children.props.onCanPlay) {
        children.props.onCanPlay(e)
      }
    },
    onLoad: (e) => {
      // For images
      setLoaded(true)
      // Call original handler if it exists
      if (children.props.onLoad) {
        children.props.onLoad(e)
      }
    }
  })

  return (
    <div 
      className={`video-loading-container ${className}`}
      style={{
        ...style,
        '--loader-color': themeColor,
        '--loader-color-rgb': hexToRgb(themeColor)
      }}
    >
      {/* Retro Loading Screen */}
      <div className={`retro-video-loader ${loaded ? 'loaded' : ''}`}>
        <div className="vhs-tracking" />
        <div className="retro-loader-text">
          <span className="retro-loader-brackets">[</span> LOADING <span className="retro-loader-brackets">]</span>
        </div>
        <div className="retro-spinner" />
        <div className="retro-progress-bar">
          <div className="retro-progress-fill" />
        </div>
      </div>
      
      {/* Actual Media Content */}
      {childWithLoadHandler}
    </div>
  )
}

// Helper function to convert hex to RGB for CSS variables
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 180, 0' // Default amber RGB
}
