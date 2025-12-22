/* ====================================================================
   FOOTER COMPONENT (MIK3VERSE - PAGE SPECIFIC)
   ====================================================================
   SEARCH KEYWORDS:
   - FOOTER_SHARED
   - FOOTER_MIK3VERSE
   - FOOTER_SOCIAL_LINKS
   - FOOTER_PAGE_SPECIFIC
   
   Purpose:
   - Page-specific footer across all pages
   - Unique branding per portfolio
   - Always includes link back to MIK3VERSE hub
   - Social media links
   - Copyright information
   ================================================================== */
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Footer({ page = 'landing' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentYear = new Date().getFullYear()
  const isLandingPage = location.pathname === '/'

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  /* ====================================================================
     PAGE-SPECIFIC CONFIGURATION
     ================================================================== */
  const getPageConfig = () => {
    switch(page) {
      case 'videography':
        return {
          title: 'MIK3SHOTIT',
          tagline: 'Cinematic Storytelling',
          description: 'Crafting Visual Narratives That Captivate',
          color: 'amber-glow',
          colorHex: '#FFB400',
          socialLinks: [
            { name: 'IG', label: 'Instagram', url: 'https://instagram.com' },
            { name: 'VI', label: 'Vimeo', url: 'https://vimeo.com' },
            { name: 'YT', label: 'YouTube', url: 'https://youtube.com' }
          ]
        }
      case 'tech':
        return {
          title: 'MIK3.DEV',
          tagline: 'Code • Create • Deploy',
          description: 'Building Digital Solutions That Scale',
          color: 'cyan-glow',
          colorHex: '#00D9FF',
          socialLinks: [
            { name: 'GH', label: 'GitHub', url: 'https://github.com' },
            { name: 'LI', label: 'LinkedIn', url: 'https://linkedin.com' },
            { name: 'TW', label: 'Twitter', url: 'https://twitter.com' }
          ]
        }
      case 'fitness':
        return {
          title: 'MIK3.FIT',
          tagline: 'Train • Transform • Triumph',
          description: 'Your Journey To Peak Performance',
          color: 'orange-glow',
          colorHex: '#FF6B35',
          socialLinks: [
            { name: 'IG', label: 'Instagram', url: 'https://instagram.com' },
            { name: 'TK', label: 'TikTok', url: 'https://tiktok.com' },
            { name: 'YT', label: 'YouTube', url: 'https://youtube.com' }
          ]
        }
      case 'landing':
        return {
          title: 'MIK3VERSE',
          tagline: 'Creative • Technical • Physical',
          description: 'A Multi-Dimensional Portfolio Experience',
          color: 'olive-glow',
          colorHex: '#6B8E23',
          socialLinks: [
            { name: 'IG', label: 'Instagram', url: 'https://instagram.com' },
            { name: 'GH', label: 'GitHub', url: 'https://github.com' },
            { name: 'LI', label: 'LinkedIn', url: 'https://linkedin.com' }
          ]
        }
      default:
        return {
          title: 'MIK3VERSE',
          tagline: 'Creative • Technical • Physical',
          description: 'A Multi-Dimensional Portfolio Experience',
          color: 'olive-glow',
          colorHex: '#6B8E23',
          socialLinks: [
            { name: 'IG', label: 'Instagram', url: 'https://instagram.com' },
            { name: 'GH', label: 'GitHub', url: 'https://github.com' },
            { name: 'LI', label: 'LinkedIn', url: 'https://linkedin.com' }
          ]
        }
    }
  }

  const pageConfig = getPageConfig()

  return (
    <footer 
      className="bg-black border-l-0 border-r-0 border-b-0 py-12"
      style={{
        borderTop: `2px solid ${pageConfig.colorHex}`,
        boxShadow: `0 0 10px ${pageConfig.colorHex}40, inset 0 0 10px ${pageConfig.colorHex}20`
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* ====================================================================
               FOOTER BRANDING (PAGE-SPECIFIC)
               ================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 
              className="header-title terminal text-3xl mb-4"
              style={{
                color: pageConfig.colorHex,
                textShadow: `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66, 0 0 25px ${pageConfig.colorHex}33`
              }}
            >
              {pageConfig.title}
            </h3>
            <p 
              className="terminal text-sm mb-2"
              style={{ color: `${pageConfig.colorHex}B3` }}
            >
              {pageConfig.tagline}
            </p>
            <p 
              className="terminal text-xs"
              style={{ color: `${pageConfig.colorHex}80` }}
            >
              {pageConfig.description}
            </p>
          </motion.div>

          {/* ====================================================================
               FOOTER NAVIGATION (WITH BACK TO HUB)
               ================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 
              className="terminal text-xl mb-4"
              style={{
                color: pageConfig.colorHex,
                textShadow: `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
              }}
            >
              &gt; Navigate
            </h4>
            <ul className="space-y-2 terminal" style={{ color: `${pageConfig.colorHex}B3` }}>
              {!isLandingPage && (
                <li>
                  <button 
                    onClick={() => navigate('/')}
                    className="transition-all text-left font-bold"
                    style={{ color: `${pageConfig.colorHex}B3` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = pageConfig.colorHex
                      e.currentTarget.style.textShadow = `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = `${pageConfig.colorHex}B3`
                      e.currentTarget.style.textShadow = 'none'
                    }}
                  >
                    ? BACK TO MIK3VERSE HUB
                  </button>
                </li>
              )}
              <li>
                <button 
                  onClick={() => navigate('/videography')}
                  className={`transition-all text-left ${page === 'videography' ? 'font-bold' : ''}`}
                  style={{ color: `${pageConfig.colorHex}B3` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = pageConfig.colorHex
                    e.currentTarget.style.textShadow = `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = `${pageConfig.colorHex}B3`
                    e.currentTarget.style.textShadow = 'none'
                  }}
                >
                  &gt; Videography
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/tech')}
                  className={`transition-all text-left ${page === 'tech' ? 'font-bold' : ''}`}
                  style={{ color: `${pageConfig.colorHex}B3` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = pageConfig.colorHex
                    e.currentTarget.style.textShadow = `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = `${pageConfig.colorHex}B3`
                    e.currentTarget.style.textShadow = 'none'
                  }}
                >
                  &gt; Tech Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/fitness')}
                  className={`transition-all text-left ${page === 'fitness' ? 'font-bold' : ''}`}
                  style={{ color: `${pageConfig.colorHex}B3` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = pageConfig.colorHex
                    e.currentTarget.style.textShadow = `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = `${pageConfig.colorHex}B3`
                    e.currentTarget.style.textShadow = 'none'
                  }}
                >
                  &gt; Fitness Journey
                </button>
              </li>
            </ul>
          </motion.div>

          {/* ====================================================================
               FOOTER SOCIAL LINKS (PAGE-SPECIFIC)
               ================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 
              className="terminal text-xl mb-4"
              style={{
                color: pageConfig.colorHex,
                textShadow: `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
              }}
            >
              &gt; Connect
            </h4>
            <div className="flex flex-wrap gap-4">
              {pageConfig.socialLinks.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 transition-all group"
                  aria-label={social.label}
                  style={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: `${pageConfig.colorHex}66`,
                    backgroundColor: `${pageConfig.colorHex}0D`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${pageConfig.colorHex}33`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${pageConfig.colorHex}0D`
                  }}
                >
                  <span 
                    className="terminal text-lg"
                    style={{
                      color: pageConfig.colorHex,
                      textShadow: `0 0 8px ${pageConfig.colorHex}99, 0 0 15px ${pageConfig.colorHex}66`
                    }}
                  >
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* ====================================================================
             FOOTER DIVIDER & COPYRIGHT (PAGE-SPECIFIC COLOR)
             ================================================================== */}
        <div 
          className="h-px mb-6" 
          style={{
            background: `linear-gradient(to right, transparent, ${pageConfig.colorHex}40, transparent)`
          }}
        />
        <div 
          className="text-center terminal text-sm"
          style={{ color: `${pageConfig.colorHex}80` }}
        >
          &copy; {currentYear} {pageConfig.title}. Part of the MIK3VERSE.
        </div>
      </div>
    </footer>
  )
}
