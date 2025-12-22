/* ====================================================================
   HEADER COMPONENT
   ====================================================================
   SEARCH KEYWORDS:
   - HEADER_LOGO_SOURCE
   - HEADER_NAV_ITEMS
   - HEADER_DIMENSIONS
   
   Purpose:
   - Fixed navigation bar at top of page
   - Animated logo (GIF)
   - Responsive navigation (desktop/mobile)
   - Scroll-based styling changes
   ================================================================== */
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  /* ====================================================================
     HEADER NAVIGATION ITEMS
     ====================================================================
     SEARCH KEYWORDS:
     - HEADER_NAV_CONFIG
     - HEADER_NAV_LINKS
     
     Navigation Configuration:
     - Add/remove/edit navigation items here
     - Each item has: name (display text) and id (section to scroll to)
     - Order determines display order in menu
     ================================================================== */
  const navItems = [
    { name: 'HOME', id: 'hero' },        // HEADER_NAV_HOME
    { name: 'SERVICES', id: 'services' }, // HEADER_NAV_SERVICES
    { name: 'PRICING', id: 'pricing' },   // HEADER_NAV_PRICING
    { name: 'GALLERY', id: 'gallery' },   // HEADER_NAV_GALLERY
    { name: 'CONTACT', id: 'contact' }    // HEADER_NAV_CONTACT
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-xl shadow-[0_0_30px_rgba(255,180,0,0.2)]'
          : 'bg-black/50 backdrop-blur-sm'
      }`}
    >
      {/* ====================================================================
         HEADER CONTAINER
         ====================================================================
         SEARCH KEYWORDS:
         - HEADER_POSITION
         - HEADER_BACKGROUND
         - HEADER_SCROLL_EFFECT
         
         Header Behavior:
         - Fixed positioning (stays at top while scrolling)
         - Background changes when scrolled > 50px
         - Entrance animation from top
         ================================================================== */}
      {/* HEADER_ANIMATION_START - Starts above viewport */}
      {/* HEADER_ANIMATION_END - Slides down */}
      {/* HEADER_ANIMATION_DURATION */}
      {/* HEADER_BG_SCROLLED */}
      {/* HEADER_BG_DEFAULT */}
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        {/* HEADER_MAX_WIDTH - max-w-7xl = 1280px */}
        {/* HEADER_PADDING - px-3 → sm:px-4 → md:px-8 (12px → 16px → 32px) */}
        
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-24">
          {/* HEADER_HEIGHT - Responsive: h-16 → sm:h-18 → md:h-24 (64px → 72px → 96px) */}
          
          {/* ====================================================================
               HEADER LOGO
               ====================================================================
               SEARCH KEYWORDS:
               - HEADER_LOGO_IMAGE
               - REPLACE_HEADER_LOGO
               - HEADER_LOGO_SIZE
               
               Logo Configuration:
               - Animated GIF logo
               - Clickable to scroll to top (hero section)
               - Responsive sizing
               
               To Replace Logo:
               - Replace file at: /public/assets/logo-anime-header.gif
               - Or change src path below
               - Recommended: GIF, PNG, or SVG format
               - Transparent background recommended
               ================================================================== */}
          <motion.div
            whileHover={{ scale: 1.05 }}  // HEADER_LOGO_HOVER_SCALE
            className="cursor-pointer flex items-center"
            onClick={() => scrollToSection('hero')}
          >
            <img 
              src="https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/logo-anime-header.gif"  // HEADER_LOGO_PATH
              alt="MIK3VERSE Logo"
              className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
              /* HEADER_LOGO_SIZE - Responsive heights:
                 Mobile: h-12 = 48px
                 Small: h-14 = 56px
                 Medium: h-16 = 64px
                 Large: h-20 = 80px */
            />
          </motion.div>

          {/* ====================================================================
               DESKTOP NAVIGATION
               ====================================================================
               SEARCH KEYWORDS:
               - HEADER_NAV_DESKTOP
               - HEADER_NAV_SPACING
               - HEADER_NAV_BREAKPOINT
               
               Desktop Navigation:
               - Hidden on mobile/tablet (hidden lg:flex)
               - Shows at lg breakpoint (1024px+)
               - Horizontal menu with hover effects
               ================================================================== */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {/* HEADER_NAV_BREAKPOINT - Shows at lg: (1024px+) */}
            {/* HEADER_NAV_SPACING - space-x-6 → xl:space-x-8 (24px → 32px between links) */}
            {navItems.map((item, idx) => (
              <motion.button
                key={idx}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.1, y: -2 }}  // HEADER_NAV_HOVER_EFFECT
                whileTap={{ scale: 0.95 }}          // HEADER_NAV_TAP_EFFECT
                className="terminal text-amber-glow hover:terminal-glow text-base lg:text-lg uppercase tracking-wider relative group transition-all duration-300"
              >
                {/* HEADER_NAV_TEXT_SIZE - text-base → lg:text-lg (16px → 18px) */}
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-glow shadow-[0_0_8px_rgba(255,180,0,0.6)] group-hover:w-full transition-all duration-300" />
                {/* HEADER_NAV_UNDERLINE - Animated underline on hover */}
              </motion.button>
            ))}
          </nav>

          {/* ====================================================================
               MOBILE MENU BUTTON
               ====================================================================
               SEARCH KEYWORDS:
               - HEADER_MOBILE_BUTTON
               - HEADER_HAMBURGER_ICON
               
               Mobile Menu Button:
               - Shows on mobile/tablet (lg:hidden)
               - Hides at lg breakpoint (1024px+)
               - Toggles mobile menu visibility
               ================================================================== */}
          <motion.button
            whileTap={{ scale: 0.9 }}  // HEADER_MOBILE_BUTTON_TAP
            className="lg:hidden terminal-border p-2 sm:p-3 terminal text-amber-glow terminal-glow"
            onClick={() => {
              const menu = document.getElementById('mobile-menu')
              menu?.classList.toggle('hidden')
            }}
          >
            {/* HEADER_MOBILE_BUTTON_PADDING - p-2 → sm:p-3 (8px → 12px) */}
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {/* HEADER_HAMBURGER_SIZE - w-5 h-5 → sm:w-6 sm:h-6 (20px → 24px) */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>

        {/* ====================================================================
             MOBILE MENU
             ====================================================================
             SEARCH KEYWORDS:
             - HEADER_MOBILE_MENU
             - HEADER_MOBILE_NAV_ITEMS
             
             Mobile Menu:
             - Hidden by default (hidden class)
             - Toggles with hamburger button
             - Vertical stacked menu
             - Shows on mobile/tablet only (lg:hidden)
             ================================================================== */}
        <div id="mobile-menu" className="hidden lg:hidden pb-3 sm:pb-4">
          {/* HEADER_MOBILE_MENU_PADDING - pb-3 → sm:pb-4 (12px → 16px bottom) */}
          <div className="flex flex-col space-y-2 sm:space-y-3">
            {/* HEADER_MOBILE_MENU_SPACING - space-y-2 → sm:space-y-3 (8px → 12px between items) */}
            {navItems.map((item, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  scrollToSection(item.id)
                  document.getElementById('mobile-menu')?.classList.add('hidden')
                }}
                whileTap={{ scale: 0.95 }}  // HEADER_MOBILE_NAV_TAP_EFFECT
                className="terminal text-amber-glow hover:terminal-glow text-sm sm:text-base uppercase tracking-wider text-left py-2 px-3 sm:px-4 terminal-border bg-black/70 hover:bg-amber-glow/10 transition-all duration-300"
              >
                {/* HEADER_MOBILE_NAV_SIZE - text-sm → sm:text-base (14px → 16px) */}
                {/* HEADER_MOBILE_NAV_PADDING - py-2 px-3 → sm:px-4 (8px vertical, 12px → 16px horizontal) */}
                &gt; {item.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* HEADER_SCANLINE - Bottom border with gradient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-glow/30 to-transparent" />
    </motion.header>
  )
}
