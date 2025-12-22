/* ====================================================================
   VIDEOGRAPHY PAGE (MIK3SHOTIT)
   ====================================================================
   SEARCH KEYWORDS:
   - VIDEOGRAPHY_PAGE
   - MIK3SHOTIT_PORTFOLIO
   - GALLERY_MEDIA_ARRAY
   
   Purpose:
   - Complete videography/photography portfolio
   - Preserves all existing functionality from original App.jsx
   - Manages gallery media array and lightbox state
   
   Note: This is the migrated content from the original single-page app
   ================================================================== */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/shared/Header'
import HeroHeader from '../components/videography/HeroHeader'
import Services from '../components/videography/Services'
import Pricing from '../components/videography/Pricing'
import Gallery from '../components/videography/Gallery'
import Contact from '../components/videography/Contact'
import Footer from '../components/shared/Footer'
import Lightbox from '../components/videography/Lightbox'

export default function VideographyPage() {
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 })
  
  /* ====================================================================
     GALLERY MEDIA ARRAY
     ====================================================================
     SEARCH KEYWORDS:
     - GALLERY_MEDIA_ARRAY
     - REPLACE_GALLERY_VIDEOS
     - REPLACE_GALLERY_IMAGES
     - HERO_MEDIA_SOURCE
     
     Gallery Media Configuration:
     - Add/remove items from this array to change gallery content
     - First item (media[0]) is used as hero background
     - Each item must have: type, src
     - Videos should include poster image for thumbnail
     ================================================================== */
  const media = [
    { 
      type: 'video',
      src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/hero.mp4'
    },
    { 
      type: 'image',
      src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/DSC00033.JPG'
    },
    { 
      type: 'video',
      src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/final_export.mp4'
    },
    { 
      type: 'video',
      src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/bigslap.mp4'
    },
    { 
      type: 'video',
      src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/HBH_final_2.mp4',
      poster: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/big_slap-22.jpg'
    },
    { 
      type: 'image',
      src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/DSC00724.JPG'
    },
    { 
      type: 'video',
      src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/porche-reel.mp4',
      poster: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/car.png'
    },
    { 
      type: 'video',
      src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/TerryandAmankwa.mp4',
      poster: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/wedding.jpg'
    },
    { 
      type: 'video',
      src: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/ig_reel.mp4',
      poster: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/IMG_0156.PNG'
    },
  ]
  
  /* ====================================================================
     SECTION BACKGROUND IMAGES
     ================================================================== */
  const sectionBackgrounds = {
    about: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/clip1-poster.jpg',
    services: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/DSC00033.JPG',
    pricing: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/DSC00724.JPG',
    contact: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/videography/hero.mp4'
  }

  return (
    <div className="min-h-screen smooth-scroll">
      <Header page="videography" />
      
      <div id="hero">
        <HeroHeader 
          media={media[0]}
          onViewGallery={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} 
        />
      </div>
      
      <main>
        <section id="about" className="min-h-screen flex items-center justify-center relative parallax-section overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ willChange: 'transform' }}
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${sectionBackgrounds.about})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/90" />
            <div className="absolute inset-0 grid-bg opacity-40" />
          </motion.div>
          
          <div className="relative z-10 max-w-5xl mx-auto p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="terminal-border bg-black/70 backdrop-blur-md p-12 md:p-16"
            >
              <h2 className="terminal terminal-glow text-4xl md:text-5xl mb-6">
                &gt; About Our Films_
              </h2>
              <div className="h-0.5 w-24 bg-amber-glow shadow-[0_0_10px_rgba(255,180,0,0.5)] mb-8" />
              <p className="text-amber-glow/90 font-terminal text-xl md:text-2xl leading-relaxed uppercase tracking-wide mb-6">
                We craft cinematic films that blend emotion and editorial polish.
              </p>
              <p className="text-amber-glow/70 font-terminal text-base md:text-lg leading-relaxed uppercase tracking-wide">
                Every frame is carefully composed to tell your unique story. From intimate weddings to corporate narratives, we bring a cinematic approach that transforms moments into timeless visual art.
              </p>
            </motion.div>
          </div>
        </section>
        
        <section id="services" className="min-h-screen flex items-center bg-black text-white parallax-section">
          <div className="w-full">
            <Services backgroundImage={sectionBackgrounds.services} />
          </div>
        </section>
        
        <section id="pricing" className="min-h-screen flex items-center bg-black text-white parallax-section">
          <div className="w-full">
            <Pricing backgroundImage={sectionBackgrounds.pricing} />
          </div>
        </section>
        
        <section id="gallery" className="min-h-screen flex items-center bg-black text-white parallax-section">
          <div className="w-full">
            <Gallery 
              media={media}
              onOpen={(i)=>setLightbox({open:true, idx:i})}
            />
          </div>
        </section>
        
        <section id="contact" className="min-h-screen flex items-center bg-black text-white parallax-section">
          <div className="w-full">
            <Contact backgroundImage={sectionBackgrounds.contact} />
          </div>
        </section>
        <Footer page="videography" />
      </main>
      {lightbox.open && <Lightbox media={media} start={lightbox.idx} onClose={() => setLightbox({open:false, idx:0})} />}
    </div>
  )
}
