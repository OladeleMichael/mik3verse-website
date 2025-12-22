/* ====================================================================
   MAIN APP COMPONENT (ROUTER CONFIGURATION)
   ====================================================================
   SEARCH KEYWORDS:
   - APP_ROUTER
   - MULTIPAGE_NAVIGATION
   - MIK3VERSE_ROUTES
   
   Purpose:
   - Set up React Router for multi-page navigation
   - Define routes for all portfolio sections
   - Landing page at root, sub-portfolios at specific paths
   
   Routes:
   - / → Landing Page (Mik3verse)
   - /videography → Videography Portfolio (Mik3shotit)
   - /tech → Tech/IT Portfolio
   - /fitness → Fitness/Lifestyle Portfolio
   ================================================================== */
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import VideographyPage from './pages/VideographyPage'
import TechPage from './pages/TechPage'
import FitnessPage from './pages/FitnessPage'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    console.log('Route changed to:', pathname)
    // Immediate scroll without animation
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/videography" element={<VideographyPage />} />
        <Route path="/mik3shotit" element={<VideographyPage />} />
        <Route path="/tech" element={<TechPage />} />
        <Route path="/fitness" element={<FitnessPage />} />
      </Routes>
    </Router>
  )
}
