/* ====================================================================
   PRICING COMPONENT
   ====================================================================
   SEARCH KEYWORDS:
   - PRICING_PACKAGES
   - PRICING_CARD_DIMENSIONS
   - PRICING_BACKGROUND_VIDEO
   
   Purpose:
   - Pricing cards with package details
   - Video background with parallax effect
   - Responsive grid layout
   ================================================================== */
import React from 'react'
// Asset configuration - S3 bucket URL (configurable via VITE_ASSETS_BASE_URL env variable)
import { ASSETS_BASE_URL } from '../../config/assets'
import { motion } from 'framer-motion'
import VideoLoader from '../shared/VideoLoader'

/* ====================================================================
   PRICING PACKAGE DATA
   ====================================================================
   SEARCH KEYWORDS:
   - PRICING_PACKAGE_CONFIG
   - PRICING_PACKAGE_DETAILS
   - EDIT_PRICING_PACKAGES
   
   Package Configuration:
   - Add/remove/edit packages in this array
   - Each package has: name, price, features array, featured flag
   - featured: true adds highlight styling
   ================================================================== */
const packages = [
  {
    name: 'Essential',  // PRICING_PACKAGE_1_NAME
    price: 'Contact for Pricing',    // PRICING_PACKAGE_1_PRICE - Updated to contact info
    features: ['4-6 hours coverage', '3-5 minute highlight film', 'Online delivery', 'Music licensing']
    // PRICING_PACKAGE_1_FEATURES - Add/remove features as needed
  },
  {
    name: 'Premium',    // PRICING_PACKAGE_2_NAME
    price: 'Contact for Pricing',    // PRICING_PACKAGE_2_PRICE - Updated to contact info
    features: ['8-10 hours coverage', '5-8 minute highlight film', 'Full ceremony & speeches', 'Drone footage', '2 videographers', 'USB delivery'],
    featured: true      // PRICING_FEATURED_PACKAGE - Highlighted as recommended
    // PRICING_PACKAGE_2_FEATURES
  },
  {
    name: 'Luxury',     // PRICING_PACKAGE_3_NAME
    price: 'Contact for Pricing',    // PRICING_PACKAGE_3_PRICE - Updated to contact info
    features: ['Full day coverage', '8-12 minute cinematic film', 'Documentary edit', 'Drone & gimbal', '3 videographers', 'Custom USB + online']
    // PRICING_PACKAGE_3_FEATURES
  }
]

export default function Pricing({ backgroundImage }) {
  return (
    <div className="relative py-20 px-6 min-h-screen">
      {/* ====================================================================
         PRICING SECTION DIMENSIONS
         ====================================================================
         SEARCH KEYWORDS:
         - PRICING_SECTION_PADDING
         - PRICING_SECTION_HEIGHT
         
         Section Sizing:
         - py-20: Vertical padding (80px top/bottom)
         - px-6: Horizontal padding (24px left/right)
         - min-h-screen: Minimum full viewport height
         ================================================================== */}
      {/* PRICING_SECTION_PADDING - py-20 (80px), px-6 (24px) */}
      {/* PRICING_SECTION_HEIGHT - min-h-screen = minimum 100vh */}
      
      {/* ====================================================================
           PRICING BACKGROUND VIDEO
           ====================================================================
           SEARCH KEYWORDS:
           - PRICING_BG_VIDEO_SOURCE
           - REPLACE_PRICING_VIDEO
           
           Background Video:
           - Animated logo video background
           - Parallax Ken Burns effect
           - To replace: Change src path below
           - Path: /public/assets/logo-anime.mp4
           ================================================================== */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ willChange: 'transform' }}
        initial={{ scale: 1.05, opacity: 0.8 }}  // PRICING_BG_INITIAL_SCALE
        whileInView={{ scale: 1, opacity: 1 }}   // PRICING_BG_FINAL_SCALE
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}  // PRICING_BG_ANIMATION_DURATION
      >
        <VideoLoader className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={`${ASSETS_BASE_URL}/assets/videography/logo-anime.mp4`} type="video/mp4" />
            {/* PRICING_BG_VIDEO_PATH - Background video source */}
          </video>
        </VideoLoader>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />
        {/* PRICING_BG_OVERLAY - Dark gradient for card readability */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* PRICING_GRID_PATTERN - Grid overlay effect */}
      </motion.div>
      
      {/* PRICING_CONTENT - Title and pricing cards container */}
      <div className="relative z-10">
        {/* ====================================================================
           PRICING TITLE SECTION
           ====================================================================
           SEARCH KEYWORDS:
           - PRICING_TITLE_TEXT
           - PRICING_TITLE_SIZE
           - PRICING_TITLE_SPACING
           
           Title Styling:
           - max-w-6xl: Maximum width 1152px
           - mb-16: Bottom margin 64px
           ================================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}  // PRICING_TITLE_ANIMATION_START
          whileInView={{ opacity: 1, x: 0 }}  // PRICING_TITLE_ANIMATION_END
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 max-w-6xl mx-auto"
        >
          {/* PRICING_TITLE_MARGIN - mb-16 = 64px */}
          {/* PRICING_TITLE_MAX_WIDTH - max-w-6xl = 1152px */}
          <h2 className="terminal terminal-glow text-5xl md:text-6xl mb-4">
            {/* PRICING_TITLE_SIZE - text-5xl ? md:text-6xl (48px ? 60px) */}
            &gt; Pricing_
            {/* PRICING_TITLE_TEXT - Section heading */}
          </h2>
          <div className="h-0.5 w-24 bg-amber-glow shadow-[0_0_10px_rgba(255,180,0,0.5)]" />
          {/* PRICING_TITLE_UNDERLINE - h-0.5 (2px) w-24 (96px) */}
        </motion.div>
        
        {/* ====================================================================
           PRICING CARDS GRID
           ====================================================================
           SEARCH KEYWORDS:
           - PRICING_GRID_LAYOUT
           - PRICING_CARD_SPACING
           - PRICING_CARD_DIMENSIONS
           
           Grid Configuration:
           - grid md:grid-cols-3: 1 column ? 3 columns at 768px+
           - gap-8: 32px spacing between cards
           - max-w-6xl: Maximum width 1152px
           ================================================================== */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* PRICING_GRID_COLUMNS - md:grid-cols-3 = 3 columns at 768px+ */}
          {/* PRICING_CARD_SPACING - gap-8 = 32px between cards */}
          {/* PRICING_GRID_MAX_WIDTH - max-w-6xl = 1152px */}
          
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}  // PRICING_CARD_ANIMATION_START
              whileInView={{ opacity: 1, y: 0 }}  // PRICING_CARD_ANIMATION_END
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              // PRICING_CARD_ANIMATION_STAGGER - 150ms delay between cards
              whileHover={{ scale: 1.02, y: -5 }}  // PRICING_CARD_HOVER_EFFECT
              className={`terminal-border p-8 backdrop-blur-md transition-all duration-300 group ${
                pkg.featured 
                  ? 'bg-amber-glow/15 border-amber-glow'  // PRICING_FEATURED_CARD_STYLE
                  : 'bg-black/70 hover:bg-amber-glow/10'   // PRICING_CARD_STYLE
              }`}
            >
              {/* PRICING_CARD_PADDING - p-8 = 32px all sides */}
              {/* PRICING_CARD_PADDING - p-8 = 32px all sides */}
              
              {pkg.featured && (
                <div className="terminal text-amber-glow terminal-glow text-sm mb-4">
                  {/* PRICING_FEATURED_BADGE_SIZE - text-sm = 14px */}
                  [ Recommended ]
                </div>
              )}
              
              <h3 className="terminal text-3xl md:text-4xl mb-4 group-hover:terminal-glow transition-all">
                {/* PRICING_PACKAGE_NAME_SIZE - text-3xl ? md:text-4xl (30px ? 36px) */}
                {/* PRICING_PACKAGE_NAME_MARGIN - mb-4 = 16px */}
                {pkg.name}
              </h3>
              
              <div className="terminal terminal-glow text-3xl md:text-4xl mb-4">
                {/* PRICING_PRICE_SIZE - text-3xl ? md:text-4xl (adjusted for "Contact for Pricing") */}
                {/* PRICING_PRICE_MARGIN - mb-4 = 16px */}
                {pkg.price}
              </div>
              
              {/* PRICING_CONTACT_INFO - Email and social media contact details */}
              <div className="mb-6 space-y-2 text-amber-glow/60 font-terminal text-sm">
                <div className="flex items-center gap-2">
                  <span className="terminal text-amber-glow terminal-glow">&gt;</span>
                  <a href="mailto:contact@mik3shotit.com" className="hover:text-amber-glow transition-colors uppercase tracking-wide">
                    Email for Quote
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="terminal text-amber-glow terminal-glow">&gt;</span>
                  <span className="uppercase tracking-wide">DM on Social Media</span>
                </div>
              </div>
              
              <ul className="space-y-4">
                {/* PRICING_FEATURES_SPACING - space-y-4 = 16px between features */}
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-amber-glow/70 font-terminal text-base uppercase tracking-wide">
                    {/* PRICING_FEATURE_SIZE - text-base = 16px */}
                    <span className="terminal text-amber-glow mr-3 terminal-glow">&gt;</span>
                    {/* PRICING_FEATURE_BULLET_SPACING - mr-3 = 12px */}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
