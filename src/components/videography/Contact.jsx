/* ====================================================================
   CONTACT COMPONENT
   ====================================================================
   SEARCH KEYWORDS:
   - CONTACT_FORM_DIMENSIONS
   - CONTACT_SECTION_DIMENSIONS
   - CONTACT_BACKGROUND_IMAGE
   
   Purpose:
   - Contact form with terminal-style inputs
   - Parallax background image
   - Responsive form layout
   
   Background Image:
   - Passed as prop from App.jsx (sectionBackgrounds.contact)
   - To replace: Edit sectionBackgrounds.contact in App.jsx
   ================================================================== */
import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact({ backgroundImage }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  })

  // AWS Lambda API endpoint
  const API_URL = 'https://xf8xrbcli4.execute-api.us-east-1.amazonaws.com/devenv/ask'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ submitting: true, submitted: false, error: null })

    try {
      // Construct the message prompt with all form details
      const promptMessage = `
Name: ${form.name}
Email: ${form.email}
Message: ${form.message}
      `.trim()

      console.log('Sending request to Lambda:', { prompt: promptMessage })

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptMessage
        })
      })

      const data = await response.json()
      console.log('Lambda response:', data)

      if (response.ok) {
        // Success - Lambda processed the request
        // Email will be sent separately by SNS/SES
        setStatus({
          submitting: false,
          submitted: true,
          error: null
        })
        
        // Reset form after successful submission
        setForm({ name: '', email: '', message: '' })

        // Auto-hide success message after 10 seconds
        setTimeout(() => {
          setStatus({ submitting: false, submitted: false, error: null })
        }, 10000)
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus({
        submitting: false,
        submitted: false,
        error: error.message || 'Failed to send message. Please try again or contact us directly.'
      })
    }
  }

  return (
    <div className="relative py-20 px-6 min-h-screen">
      {/* ====================================================================
         CONTACT SECTION DIMENSIONS
         ====================================================================
         SEARCH KEYWORDS:
         - CONTACT_SECTION_PADDING
         - CONTACT_SECTION_HEIGHT
         
         Section Sizing:
         - py-20: Vertical padding (80px top/bottom)
         - px-6: Horizontal padding (24px left/right)
         - min-h-screen: Minimum full viewport height
         ================================================================== */}
      {/* CONTACT_SECTION_PADDING - py-20 (80px), px-6 (24px) */}
      {/* CONTACT_SECTION_HEIGHT - min-h-screen = minimum 100vh */}
      
      {/* CONTACT_BACKGROUND - Parallax background image with overlay */}
      {backgroundImage && (
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ willChange: 'transform' }}
          initial={{ scale: 1.05, opacity: 0.8 }}  // CONTACT_BG_INITIAL_SCALE
          whileInView={{ scale: 1, opacity: 1 }}   // CONTACT_BG_FINAL_SCALE
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}  // CONTACT_BG_ANIMATION_DURATION
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            // CONTACT_BG_IMAGE - Background image from App.jsx sectionBackgrounds
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/92 via-black/88 to-black/92" />
          {/* CONTACT_BG_OVERLAY - Dark gradient for form readability */}
          <div className="absolute inset-0 grid-bg opacity-40" />
          {/* CONTACT_GRID_PATTERN - Grid overlay effect */}
        </motion.div>
      )}
      
      {/* CONTACT_CONTENT - Title and form container */}
      <div className="relative z-10">
        {/* ====================================================================
           CONTACT TITLE SECTION
           ====================================================================
           SEARCH KEYWORDS:
           - CONTACT_TITLE_TEXT
           - CONTACT_TITLE_SIZE
           - CONTACT_TITLE_SPACING
           
           Title Styling:
           - max-w-3xl: Maximum width 768px
           - mb-16: Bottom margin 64px
           ================================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}  // CONTACT_TITLE_ANIMATION_START
          whileInView={{ opacity: 1, x: 0 }}  // CONTACT_TITLE_ANIMATION_END
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 max-w-3xl mx-auto"
        >
          {/* CONTACT_TITLE_MARGIN - mb-16 = 64px spacing below title */}
          {/* CONTACT_TITLE_MAX_WIDTH - max-w-3xl = 768px */}
          <h2 className="terminal terminal-glow text-5xl md:text-6xl mb-4">
            {/* CONTACT_TITLE_SIZE - text-5xl → md:text-6xl (48px → 60px) */}
            &gt; Get In Touch_
            {/* CONTACT_TITLE_TEXT - Section heading */}
          </h2>
          <div className="h-0.5 w-24 bg-amber-glow shadow-[0_0_10px_rgba(255,180,0,0.5)]" />
          {/* CONTACT_TITLE_UNDERLINE - h-0.5 (2px) w-24 (96px) */}
          <p className="terminal text-amber-glow/70 text-lg mt-6">
            {/* CONTACT_SUBTITLE_SIZE - text-lg = 18px */}
            {/* CONTACT_SUBTITLE_MARGIN - mt-6 = 24px above subtitle */}
            Ready to tell your story? Let's create something extraordinary together.
          </p>
        </motion.div>
        
        {/* ====================================================================
           CONTACT FORM
           ====================================================================
           SEARCH KEYWORDS:
           - CONTACT_FORM_WIDTH
           - CONTACT_FORM_SPACING
           - CONTACT_INPUT_DIMENSIONS
           
           Form Configuration:
           - max-w-3xl: Maximum width 768px
           - space-y-6: 24px vertical spacing between fields
           ================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}  // CONTACT_FORM_ANIMATION_START
          whileInView={{ opacity: 1, y: 0 }}  // CONTACT_FORM_ANIMATION_END
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* Success Message */}
          {status.submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="terminal-border bg-amber-glow/10 p-6 mb-6 backdrop-blur-sm"
            >
              <p className="text-amber-glow font-terminal text-xl mb-4">
                ✓ MESSAGE SENT SUCCESSFULLY
              </p>
              <p className="text-amber-glow/80 font-terminal text-sm mb-2">
                Thank you for reaching out to MIK3SHOTIT!
              </p>
              <p className="text-amber-glow/70 font-terminal text-sm">
                We've received your inquiry and will respond to your email shortly with more details about your project.
              </p>
              <button
                onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                className="mt-4 text-amber-glow hover:text-white font-terminal text-sm transition-colors terminal-glow"
              >
                [ Send Another Message ]
              </button>
            </motion.div>
          )}

          {/* Error Message */}
          {status.error && !status.submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="terminal-border bg-red-500/10 border-red-500/50 p-6 mb-6 backdrop-blur-sm"
            >
              <p className="text-red-500 font-terminal text-lg mb-2">
                ✗ ERROR
              </p>
              <p className="text-red-400 font-terminal text-sm">
                {status.error}
              </p>
              <p className="text-red-400/70 font-terminal text-xs mt-3">
                You can also reach us directly at: <a href="mailto:contact@mik3shotit.com" className="underline hover:text-red-300">contact@mik3shotit.com</a>
              </p>
            </motion.div>
          )}

          {/* Contact Form */}
          {!status.submitted && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CONTACT_FORM_SPACING - space-y-6 = 24px between fields */}
              
              <div>
                <label className="terminal text-xl mb-3 block">&gt; Name:</label>
                {/* CONTACT_LABEL_SIZE - text-xl = 20px */}
                {/* CONTACT_LABEL_MARGIN - mb-3 = 12px below label */}
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  disabled={status.submitting}
                  className="w-full px-6 py-4 bg-black/80 terminal-border terminal text-amber-glow placeholder-amber-glow/30 outline-none focus:shadow-[0_0_15px_rgba(255,180,0,0.3)] transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your name..."
                  /* CONTACT_INPUT_PADDING - px-6 (24px horizontal), py-4 (16px vertical) */
                  /* CONTACT_INPUT_HEIGHT - py-4 = 16px top/bottom padding */
                  /* CONTACT_INPUT_FOCUS - Glow effect on focus */
                />
              </div>
              
              <div>
                <label className="terminal text-xl mb-3 block">&gt; Email:</label>
                {/* CONTACT_LABEL_SIZE - text-xl = 20px */}
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  disabled={status.submitting}
                  className="w-full px-6 py-4 bg-black/80 terminal-border terminal text-amber-glow placeholder-amber-glow/30 outline-none focus:shadow-[0_0_15px_rgba(255,180,0,0.3)] transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="your.email@domain.com"
                  /* CONTACT_INPUT_PADDING - px-6 (24px horizontal), py-4 (16px vertical) */
                />
              </div>
              
              <div>
                <label className="terminal text-xl mb-3 block">&gt; Message:</label>
                {/* CONTACT_LABEL_SIZE - text-xl = 20px */}
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  disabled={status.submitting}
                  rows={6}  // CONTACT_TEXTAREA_ROWS - 6 rows height
                  className="w-full px-6 py-4 bg-black/80 terminal-border terminal text-amber-glow placeholder-amber-glow/30 outline-none focus:shadow-[0_0_15px_rgba(255,180,0,0.3)] transition-all resize-none backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell us about your project..."
                  /* CONTACT_TEXTAREA_PADDING - px-6 (24px horizontal), py-4 (16px vertical) */
                  /* CONTACT_TEXTAREA_HEIGHT - rows={6} determines height */
                />
              </div>
              
              {/* CONTACT_SUBMIT_BUTTON - Form submission button */}
              <motion.button
                type="submit"
                disabled={status.submitting}
                whileHover={!status.submitting ? { scale: 1.02 } : {}}  // CONTACT_BUTTON_HOVER_SCALE
                whileTap={!status.submitting ? { scale: 0.98 } : {}}    // CONTACT_BUTTON_TAP_SCALE
                className="neon-button w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* CONTACT_BUTTON_WIDTH - w-full → md:w-auto (full width on mobile, auto on desktop) */}
                {status.submitting ? '[ SENDING... ]' : '[ Send Message ]'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
