import React, { useEffect, useState } from 'react'

/**
 * TypingTextAnimation Component
 * 
 * Creates a typewriter effect with a blinking cursor that loops continuously.
 * Used in service cards and landing page to create engaging text animations.
 * 
 * Features:
 * - Character-by-character typing animation
 * - Blinking cursor with glow effect
 * - Configurable loop/one-time display
 * - Theme color support (amber, olive, cyan, orange)
 * - Adjustable typing speed
 */

const TypingTextAnimation = ({ 
  text = "[ HOVER TO PREVIEW ]", 
  className = "",
  theme = "amber", // amber, olive, cyan, orange
  loop = true, // Set to false for one-time typing
  typingSpeed = 50, // ms per character
  pauseDuration = 2000, // ms to pause at end before restarting
  textSize = "text-xs sm:text-sm", // Tailwind text size classes
  uppercase = true
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [hasTypedOnce, setHasTypedOnce] = useState(false)

  // Theme colors
  const themeColors = {
    amber: { color: '#FFB400', rgb: '255, 180, 0' },
    olive: { color: '#6B8E23', rgb: '107, 142, 35' },
    cyan: { color: '#00D9FF', rgb: '0, 217, 255' },
    orange: { color: '#FF6B35', rgb: '255, 107, 53' }
  }

  const currentTheme = themeColors[theme] || themeColors.amber

  useEffect(() => {
    let timeout

    if (isTyping) {
      // Typing forward
      if (displayedText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1))
        }, typingSpeed)
      } else {
        // Finished typing
        setHasTypedOnce(true)
        
        // If looping, reset after pause
        if (loop) {
          timeout = setTimeout(() => {
            setIsTyping(false)
            setDisplayedText('')
          }, pauseDuration)
        }
      }
    } else if (loop) {
      // Reset and start typing again (only if loop is true)
      timeout = setTimeout(() => {
        setIsTyping(true)
      }, 100)
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isTyping, text, loop, typingSpeed, pauseDuration])

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="typing-text-container">
        <span 
          className={`terminal ${textSize} ${uppercase ? 'uppercase' : ''} tracking-wider`}
          style={{
            color: currentTheme.color,
            textShadow: `
              0 0 10px rgba(${currentTheme.rgb}, 0.8),
              0 0 20px rgba(${currentTheme.rgb}, 0.5),
              0 0 30px rgba(${currentTheme.rgb}, 0.3)
            `
          }}
        >
          {displayedText}
        </span>
        <span 
          className="typing-cursor"
          style={{
            backgroundColor: currentTheme.color,
            boxShadow: `0 0 10px rgba(${currentTheme.rgb}, 0.8)`
          }}
        ></span>
      </div>
    </div>
  )
}

export default TypingTextAnimation
