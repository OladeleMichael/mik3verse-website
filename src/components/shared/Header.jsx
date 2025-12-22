/* ====================================================================
   HEADER COMPONENT (MULTI-PAGE SUPPORTED)
   ====================================================================
   SEARCH KEYWORDS:
   - HEADER_LOGO_SOURCE
   - HEADER_NAV_ITEMS
   - HEADER_DIMENSIONS
   - HEADER_MULTIPAGE_NAV
   - HEADER_PAGE_SPECIFIC
   
   Purpose:
   - Fixed navigation bar at top of page
   - Supports both single-page scrolling and multi-page routing
   - Animated logo (GIF)
   - Responsive navigation (desktop/mobile)
   - Page-specific styling and branding
   - Always includes "Back to MIK3VERSE" link
   ================================================================== */
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header({ page = 'videography' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isLandingPage = location.pathname === '/'
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

  const handleHomeClick = () => {
    if (isLandingPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  /* ====================================================================
     PAGE-SPECIFIC CONFIGURATION
     ====================================================================
     SEARCH KEYWORDS:
     - HEADER_PAGE_CONFIG
     - HEADER_COLOR_THEME
     - HEADER_BRANDING
     
     Page-Specific Settings:
     - Each page has unique title, tagline, and color
     - Consistent with page theme throughout site
     ================================================================== */
  const getPageConfig = () => {
    switch(page) {
      case 'videography':
        return {
          title: 'MIK3SHOTIT',
          tagline: 'Cinematic Storytelling',
          color: 'amber-glow',
          colorHex: '#FFB400'
        }
      case 'tech':
        return {
          title: 'MIK3.DEV',
          tagline: 'Code • Create • Deploy',
          color: 'cyan-glow',
          colorHex: '#00D9FF'
        }
      case 'fitness':
        return {
          title: 'MIK3.FIT',
          tagline: 'Train • Transform • Triumph',
          color: 'orange-glow',
          colorHex: '#FF6B35'
        }
      case 'landing':
        return {
          title: 'MIK3VERSE',
          tagline: 'Multi-Dimensional Portfolio',
          color: 'olive-glow',
          colorHex: '#6B8E23'
        }
      default:
        return {
          title: 'MIK3VERSE',
          tagline: 'Multi-Dimensional Portfolio',
          color: 'olive-glow',
          colorHex: '#6B8E23'
        }
    }
  }

  /* ====================================================================
     HEADER NAVIGATION ITEMS
     ====================================================================
     SEARCH KEYWORDS:
     - HEADER_NAV_CONFIG
     - HEADER_NAV_LINKS
     - HEADER_PAGE_SPECIFIC_NAV
     
     Navigation Configuration:
     - Different nav items per page type
     - Videography: Section scrolling
     - Tech/Fitness: Section scrolling  
     - Landing: Minimal navigation
     ================================================================== */
  const getNavItems = () => {
    switch(page) {
      case 'videography':
        return [
          { name: 'HOME', id: 'hero' },
          { name: 'SERVICES', id: 'services' },
          { name: 'PRICING', id: 'pricing' },
          { name: 'GALLERY', id: 'gallery' },
          { name: 'CONTACT', id: 'contact' }
        ]
      case 'tech':
        return [
          { name: 'HOME', id: 'hero' },
          { name: 'SKILLS', id: 'skills' },
          { name: 'PROJECTS', id: 'projects' },
          { name: 'CV', id: 'cv' },
          { name: 'CONTACT', id: 'contact' }
        ]
      case 'fitness':
        return [
          { name: 'HOME', id: 'hero' },
          { name: 'PHILOSOPHY', id: 'about' },
          { name: 'GALLERY', id: 'gallery' },
          { name: 'PROGRAMS', id: 'programs' },
          { name: 'CONTACT', id: 'contact' }
        ]
      default:
        return []
    }
  }

  const pageConfig = getPageConfig()
  const navItems = getNavItems()

  /* ====================================================================
     DYNAMIC SHADOW COLOR
     ================================================================== */
  const getShadowColor = () => {
    const opacity = scrolled ? '0.2' : '0.1'
    switch(page) {
      case 'tech':
        return `shadow-[0_0_30px_rgba(0,217,255,${opacity})]`
      case 'fitness':
        return `shadow-[0_0_30px_rgba(255,107,53,${opacity})]`
      default:
        return `shadow-[0_0_30px_rgba(255,180,0,${opacity})]`
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? `bg-black/95 backdrop-blur-xl ${getShadowColor()}`
          : 'bg-black/50 backdrop-blur-sm'
      }`}
    >
      {/* ====================================================================
         HEADER CONTAINER WITH PAGE-SPECIFIC BRANDING
         ================================================================== */}
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-24">
          
          {/* ====================================================================
               LEFT SIDE: LOGO + PAGE TITLE
               ================================================================== */}
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer flex items-center"
              onClick={handleHomeClick}
            >
              <img 
                src="https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/shared/logo-anime-header.gif"
                alt="MIK3VERSE Logo"
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
              />
            </motion.div>

            {/* Page-specific title (hidden on mobile, shown on larger screens) */}
            {!isLandingPage && (
              <div className="hidden md:block">
                <h1 
                  className="terminal text-lg lg:text-xl font-bold uppercase tracking-wider"
                  style={{
                    color: pageConfig.colorHex,
                    textShadow: `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66, 0 0 25px ${pageConfig.colorHex}33`
                  }}
                >
                  {pageConfig.title}
                </h1>
                <p className={`font-terminal text-[10px] lg:text-xs uppercase tracking-widest`}
                   style={{ color: `${pageConfig.colorHex}99` }}>
                  {pageConfig.tagline}
                </p>
              </div>
            )}
          </div>

          {/* ====================================================================
               RIGHT SIDE: BACK BUTTON + NAVIGATION
               ====================================================================
               Back to MIK3VERSE:
               - Always visible on portfolio pages
               - Positioned between branding and nav
               - Uses page-specific color
               ================================================================== */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            {!isLandingPage && (
              <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05, x: -3 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center terminal text-xs sm:text-sm lg:text-base uppercase tracking-wider transition-all duration-300 px-3 py-1.5 rounded"
                style={{
                  color: pageConfig.colorHex,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: `${pageConfig.colorHex}4D`,
                  backgroundColor: `${pageConfig.colorHex}1A`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
                  e.currentTarget.style.backgroundColor = `${pageConfig.colorHex}1A`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = 'none'
                  e.currentTarget.style.backgroundColor = `${pageConfig.colorHex}1A`
                }}
              >
                <span className="mr-2">←</span>
                <span className="hidden lg:inline">BACK TO </span>HUB
              </motion.button>
            )}

            {/* ====================================================================
                 DESKTOP NAVIGATION
                 ================================================================== */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {navItems.map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="terminal text-sm lg:text-base uppercase tracking-wider relative group transition-all duration-300"
                  style={{ color: pageConfig.colorHex }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textShadow = `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textShadow = 'none'
                  }}
                >
                  {item.name}
                  <span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ 
                      backgroundColor: pageConfig.colorHex,
                      boxShadow: `0 0 8px ${pageConfig.colorHex}` 
                    }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* ====================================================================
                 MOBILE MENU BUTTON
                 ================================================================== */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 sm:p-3 terminal"
              aria-label="Toggle navigation menu"
              title="Toggle navigation menu"
              style={{
                color: pageConfig.colorHex,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: pageConfig.colorHex,
                textShadow: `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
              }}
              onClick={() => {
                const menu = document.getElementById('mobile-menu')
                menu?.classList.toggle('hidden')
              }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* ====================================================================
             MOBILE MENU (WITH BACK TO HUB LINK)
             ================================================================== */}
        <div id="mobile-menu" className="hidden lg:hidden pb-3 sm:pb-4">
          <div className="flex flex-col space-y-2 sm:space-y-3">
            {/* Back to Hub link (mobile only) */}
            {!isLandingPage && (
              <motion.button
                onClick={() => {
                  navigate('/')
                  document.getElementById('mobile-menu')?.classList.add('hidden')
                }}
                whileTap={{ scale: 0.95 }}
                className="terminal text-sm sm:text-base uppercase tracking-wider text-left py-2 px-3 sm:px-4 bg-black/70 transition-all duration-300 font-bold"
                style={{
                  color: pageConfig.colorHex,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: pageConfig.colorHex,
                  backgroundColor: `${pageConfig.colorHex}0D`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
                  e.currentTarget.style.backgroundColor = `${pageConfig.colorHex}1A`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = 'none'
                  e.currentTarget.style.backgroundColor = `${pageConfig.colorHex}0D`
                }}
              >
                ← BACK TO MIK3VERSE
              </motion.button>
            )}
            
            {/* Regular nav items */}
            {navItems.map((item, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  scrollToSection(item.id)
                  document.getElementById('mobile-menu')?.classList.add('hidden')
                }}
                whileTap={{ scale: 0.95 }}
                className="terminal text-sm sm:text-base uppercase tracking-wider text-left py-2 px-3 sm:px-4 bg-black/70 transition-all duration-300"
                style={{
                  color: pageConfig.colorHex,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: pageConfig.colorHex,
                  backgroundColor: `${pageConfig.colorHex}0D`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
                  e.currentTarget.style.backgroundColor = `${pageConfig.colorHex}1A`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = 'none'
                  e.currentTarget.style.backgroundColor = `${pageConfig.colorHex}0D`
                }}
              >
                &gt; {item.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Page-specific scanline color */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, ${pageConfig.colorHex}40, transparent)`
        }}
      />
    </motion.header>
  )
}
