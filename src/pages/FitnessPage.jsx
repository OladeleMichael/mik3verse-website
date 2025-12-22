/* ====================================================================
   FITNESS/LIFESTYLE PORTFOLIO PAGE
   ====================================================================
   SEARCH KEYWORDS:
   - FITNESS_PORTFOLIO_PAGE
   - LIFESTYLE_PORTFOLIO
   - TRAINING_PROGRAMS
   
   Purpose:
   - Showcase fitness journey and lifestyle
   - Display workout content and progress
   - Offer training programs
   - High-energy aesthetic (orange/red theme)
   ================================================================== */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import FitnessGallery from '../components/fitness/FitnessGallery'
import FitnessLightbox from '../components/fitness/FitnessLightbox'

export default function FitnessPage() {
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 })
  const [selectedCategory, setSelectedCategory] = useState('all')

  /* ====================================================================
     PLACEHOLDER CONTENT
     ================================================================== */
  const fitnessMedia = [
    { type: 'image', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/fitness/DSC00033.JPG' },
    { type: 'video', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/fitness/ig_reel.mp4' },
    { type: 'image', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/fitness/DSC00509.JPG' },
    { type: 'video', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/fitness/black_model_vid.mp4' },
    { type: 'image', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/fitness/DSC00724.JPG' },
    { type: 'video', src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/fitness/final_export.mp4' },
  ]

  const programs = [
    {
      title: 'Strength Fundamentals',
      description: '12-week program focused on building foundational strength',
      duration: '12 weeks',
      level: 'Beginner',
      icon: '🏋️'
    },
    {
      title: 'Hypertrophy Protocol',
      description: 'Advanced muscle building program with progressive overload',
      duration: '16 weeks',
      level: 'Intermediate',
      icon: '💪'
    },
    {
      title: 'Athletic Performance',
      description: 'High-intensity training for peak athletic performance',
      duration: '10 weeks',
      level: 'Advanced',
      icon: '⚡'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header page="fitness" />
      
      {/* ====================================================================
         HERO SECTION
         ================================================================== */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/fitness/DSC00033.JPG)' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-20" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <h1 className="terminal text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6" style={{ color: '#FF6B35', textShadow: '0 0 40px #FF6B35' }}>
              &gt; FITNESS JOURNEY_
            </h1>
            <div className="h-1 w-64 mx-auto mb-8" style={{ backgroundColor: '#FF6B35', boxShadow: '0 0 30px #FF6B35' }} />
            <p className="font-terminal text-2xl md:text-3xl mb-8" style={{ color: '#FF6B35DD' }}>
              TRANSFORM • TRAIN • TRIUMPH
            </p>
            <p className="font-terminal text-lg md:text-xl max-w-3xl mx-auto mb-12" style={{ color: '#FF6B3599' }}>
              PUSHING LIMITS, BREAKING BARRIERS, BUILDING LEGENDS
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px #FF6B35' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              className="terminal-border px-10 py-5 font-terminal text-xl uppercase tracking-wider"
              style={{ color: '#FF6B35', borderColor: '#FF6B35', backgroundColor: '#FF6B3530' }}
            >
              EXPLORE JOURNEY
            </motion.button>
          </motion.div>
        </div>

        {/* Pulsing energy rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{ borderColor: '#FF6B3540' }}
            animate={{
              scale: [1, 2, 2.5],
              opacity: [0.5, 0.3, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1
            }}
          />
        ))}
      </section>

      {/* ====================================================================
         PHILOSOPHY SECTION
         ================================================================== */}
      <section id="about" className="min-h-screen flex items-center justify-center relative py-24 px-6">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/10 to-black" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="terminal-border bg-black/70 backdrop-blur-sm p-12 md:p-16"
            style={{ borderColor: '#FF6B3560' }}
          >
            <h2 className="terminal text-4xl md:text-5xl mb-6" style={{ color: '#FF6B35', textShadow: '0 0 20px #FF6B35' }}>
              &gt; My Philosophy_
            </h2>
            <div className="h-0.5 w-32 mb-8" style={{ backgroundColor: '#FF6B35', boxShadow: '0 0 15px #FF6B35' }} />
            
            <p className="font-terminal text-xl md:text-2xl mb-6 uppercase tracking-wide" style={{ color: '#FF6B35DD' }}>
              FITNESS IS NOT A DESTINATION, IT'S A LIFESTYLE
            </p>
            
            <p className="font-terminal text-base md:text-lg mb-6" style={{ color: '#FF6B35AA' }}>
              My journey began with a simple goal: to become stronger, both physically and mentally. Through consistent training, proper nutrition, and unwavering dedication, I've transformed not just my body, but my entire approach to life.
            </p>
            
            <p className="font-terminal text-base md:text-lg" style={{ color: '#FF6B35AA' }}>
              I believe in training with purpose, eating with intention, and living with passion. Every rep, every meal, every day is an opportunity to become better than yesterday.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { value: '5+', label: 'Years Training' },
                { value: '500+', label: 'Workouts Logged' },
                { value: '50+', label: 'Personal Records' },
                { value: '100%', label: 'Dedication' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="terminal text-4xl mb-2" style={{ color: '#FF6B35', textShadow: '0 0 20px #FF6B35' }}>
                    {stat.value}
                  </div>
                  <div className="font-terminal text-sm uppercase" style={{ color: '#FF6B3599' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
         GALLERY SECTION
         ================================================================== */}
      <section id="gallery" className="min-h-screen flex items-center justify-center relative py-24" style={{ backgroundColor: '#1A0A00' }}>
        <div className="w-full">
          <FitnessGallery 
            media={fitnessMedia}
            onOpen={(i) => setLightbox({open: true, idx: i})}
          />
        </div>
      </section>

      {/* ====================================================================
         PROGRAMS SECTION
         ================================================================== */}
      <section id="programs" className="min-h-screen flex items-center justify-center relative py-24 px-6">
        <div className="absolute inset-0 grid-bg opacity-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="terminal text-4xl md:text-5xl mb-4" style={{ color: '#FF6B35', textShadow: '0 0 20px #FF6B35' }}>
              &gt; Training Programs_
            </h2>
            <div className="h-0.5 w-32" style={{ backgroundColor: '#FF6B35', boxShadow: '0 0 10px #FF6B35' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="terminal-border bg-black/70 backdrop-blur-sm p-8 text-center"
                style={{ borderColor: '#FF6B3560' }}
              >
                <div className="text-6xl mb-6">{program.icon}</div>
                <h3 className="terminal text-2xl mb-4" style={{ color: '#FF6B35' }}>{program.title}</h3>
                <p className="font-terminal text-sm mb-6" style={{ color: '#FF6B35AA' }}>{program.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="font-terminal text-sm" style={{ color: '#FF6B35' }}>
                    Duration: <span style={{ color: '#FF6B3599' }}>{program.duration}</span>
                  </div>
                  <div className="font-terminal text-sm" style={{ color: '#FF6B35' }}>
                    Level: <span style={{ color: '#FF6B3599' }}>{program.level}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="terminal-border px-6 py-3 font-terminal text-sm uppercase w-full"
                  style={{ color: '#FF6B35', borderColor: '#FF6B35', backgroundColor: '#FF6B3520' }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
         CONTACT SECTION
         ================================================================== */}
      <section id="contact" className="min-h-screen flex items-center justify-center relative py-24 px-6" style={{ backgroundColor: '#1A0A00' }}>
        <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="terminal text-4xl md:text-5xl mb-8" style={{ color: '#FF6B35', textShadow: '0 0 20px #FF6B35' }}>
              &gt; Let's Connect_
            </h2>
            <p className="font-terminal text-lg mb-12" style={{ color: '#FF6B35AA' }}>
              READY TO START YOUR TRANSFORMATION?
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                className="terminal-border p-6 inline-block"
                style={{ color: '#FF6B35', borderColor: '#FF6B35' }}
              >
                <span className="text-4xl">📸</span>
                <p className="font-terminal text-sm mt-2">Instagram</p>
              </motion.a>
              <motion.a
                href="https://tiktok.com"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                className="terminal-border p-6 inline-block"
                style={{ color: '#FF6B35', borderColor: '#FF6B35' }}
              >
                <span className="text-4xl">🎵</span>
                <p className="font-terminal text-sm mt-2">TikTok</p>
              </motion.a>
              <motion.a
                href="mailto:fitness@example.com"
                whileHover={{ scale: 1.1 }}
                className="terminal-border p-6 inline-block"
                style={{ color: '#FF6B35', borderColor: '#FF6B35' }}
              >
                <span className="text-4xl">✉️</span>
                <p className="font-terminal text-sm mt-2">Email</p>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer page="fitness" />
      
      {lightbox.open && <FitnessLightbox media={fitnessMedia} start={lightbox.idx} onClose={() => setLightbox({open: false, idx: 0})} />}
    </div>
  )
}
