/* ====================================================================
   TECH/IT PORTFOLIO PAGE
   ====================================================================
   SEARCH KEYWORDS:
   - TECH_PORTFOLIO_PAGE
   - DEVELOPER_PORTFOLIO
   - CV_SECTION
   
   Purpose:
   - Showcase technical skills and projects
   - Display professional experience
   - Downloadable CV section
   - Tech-inspired cyberpunk aesthetic (blue/cyan theme)
   ================================================================== */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import VideoLoader from '../components/shared/VideoLoader'

export default function TechPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  /* ====================================================================
     PLACEHOLDER CONTENT
     ================================================================== */
  const skills = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'Node.js', level: 85, category: 'backend' },
    { name: 'TypeScript', level: 88, category: 'language' },
    { name: 'Python', level: 82, category: 'language' },
    { name: 'MongoDB', level: 80, category: 'database' },
    { name: 'PostgreSQL', level: 85, category: 'database' },
    { name: 'Docker', level: 75, category: 'devops' },
    { name: 'AWS', level: 78, category: 'cloud' },
    { name: 'Git', level: 92, category: 'tools' },
    { name: 'GraphQL', level: 80, category: 'backend' }
  ]

  const projects = [
    {
      title: 'Project Alpha',
      description: 'Full-stack web application with real-time features',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/tech/DSC00033.JPG',
      github: '#',
      demo: '#'
    },
    {
      title: 'Project Beta',
      description: 'Machine learning powered recommendation system',
      tech: ['Python', 'TensorFlow', 'FastAPI'],
      image: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/tech/DSC00509.JPG',
      github: '#',
      demo: '#'
    },
    {
      title: 'Project Gamma',
      description: 'Mobile-first progressive web application',
      tech: ['React Native', 'Firebase', 'Redux'],
      image: 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com/assets/DSC00724.JPG',
      github: '#',
      demo: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header page="tech" />
      
      {/* ====================================================================
         HERO SECTION
         ================================================================== */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-black to-black" />
        
        {/* Matrix-style falling characters */}
        <div className="absolute inset-0 opacity-10 font-mono text-cyan-400 text-xs overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${i * 5}%` }}
              animate={{
                y: [-100, window.innerHeight + 100]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {'{01010101}'}
            </motion.div>
          ))}
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="terminal text-5xl sm:text-6xl md:text-7xl mb-6" style={{ color: '#00D9FF', textShadow: '0 0 30px #00D9FF' }}>
              &gt; TECH PORTFOLIO_
            </h1>
            <div className="h-1 w-48 mx-auto mb-8" style={{ backgroundColor: '#00D9FF', boxShadow: '0 0 20px #00D9FF' }} />
            <p className="font-terminal text-xl md:text-2xl mb-12" style={{ color: '#00D9FF99' }}>
              FULL STACK DEVELOPER • PROBLEM SOLVER • INNOVATOR
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="terminal-border px-8 py-4 font-terminal uppercase tracking-wider"
                style={{ color: '#00D9FF', borderColor: '#00D9FF' }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#cv"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="terminal-border px-8 py-4 font-terminal uppercase tracking-wider"
                style={{ color: '#00D9FF', borderColor: '#00D9FF', backgroundColor: '#00D9FF20' }}
              >
                Download CV
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
         SKILLS SECTION
         ================================================================== */}
      <section id="skills" className="min-h-screen flex items-center justify-center relative py-24 px-6">
        <div className="absolute inset-0 grid-bg opacity-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="terminal text-4xl md:text-5xl mb-4" style={{ color: '#00D9FF', textShadow: '0 0 20px #00D9FF' }}>
              &gt; Technical Skills_
            </h2>
            <div className="h-0.5 w-32" style={{ backgroundColor: '#00D9FF', boxShadow: '0 0 10px #00D9FF' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="terminal-border bg-black/50 backdrop-blur-sm p-6"
                style={{ borderColor: '#00D9FF40' }}
              >
                <div className="flex justify-between mb-3">
                  <span className="font-terminal" style={{ color: '#00D9FF' }}>{skill.name}</span>
                  <span className="font-terminal text-sm" style={{ color: '#00D9FF99' }}>{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.05 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#00D9FF', boxShadow: '0 0 10px #00D9FF' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
         PROJECTS SECTION
         ================================================================== */}
      <section id="projects" className="min-h-screen flex items-center justify-center relative py-24 px-6">
        <div className="absolute inset-0" style={{ backgroundColor: '#0A0A1A' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="terminal text-4xl md:text-5xl mb-4" style={{ color: '#00D9FF', textShadow: '0 0 20px #00D9FF' }}>
              &gt; Featured Projects_
            </h2>
            <div className="h-0.5 w-32" style={{ backgroundColor: '#00D9FF', boxShadow: '0 0 10px #00D9FF' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, y: -10 }}
                className="terminal-border bg-black/70 backdrop-blur-sm overflow-hidden group"
                style={{ borderColor: '#00D9FF40' }}
              >
                <div className="aspect-video overflow-hidden">
                  <VideoLoader className="w-full h-full" theme="tech">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </VideoLoader>
                </div>
                <div className="p-6">
                  <h3 className="terminal text-xl mb-3" style={{ color: '#00D9FF' }}>{project.title}</h3>
                  <p className="font-terminal text-sm mb-4" style={{ color: '#00D9FF99' }}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-xs font-terminal px-2 py-1" style={{ color: '#00D9FF', backgroundColor: '#00D9FF20', border: '1px solid #00D9FF40' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.github} className="font-terminal text-sm hover:underline" style={{ color: '#00D9FF' }}>GitHub →</a>
                    <a href={project.demo} className="font-terminal text-sm hover:underline" style={{ color: '#00D9FF' }}>Live Demo →</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
         CV SECTION
         ================================================================== */}
      <section id="cv" className="min-h-screen flex items-center justify-center relative py-24 px-6">
        <div className="absolute inset-0 grid-bg opacity-10" />
        
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="terminal text-4xl md:text-5xl mb-8" style={{ color: '#00D9FF', textShadow: '0 0 20px #00D9FF' }}>
              &gt; Curriculum Vitae_
            </h2>
            <p className="font-terminal text-lg mb-12" style={{ color: '#00D9FF99' }}>
              DOWNLOAD MY COMPLETE PROFESSIONAL RESUME
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="terminal-border px-12 py-6 font-terminal text-xl uppercase tracking-wider inline-flex items-center gap-4"
              style={{ color: '#00D9FF', borderColor: '#00D9FF', backgroundColor: '#00D9FF20' }}
            >
              <span>📄</span>
              Download CV (PDF)
            </motion.button>

            <div className="mt-16 terminal-border bg-black/50 backdrop-blur-sm p-8" style={{ borderColor: '#00D9FF40' }}>
              <h3 className="terminal text-2xl mb-6" style={{ color: '#00D9FF' }}>Professional Experience</h3>
              <div className="text-left space-y-6">
                <div>
                  <h4 className="font-terminal text-lg" style={{ color: '#00D9FF' }}>Senior Full Stack Developer</h4>
                  <p className="font-terminal text-sm" style={{ color: '#00D9FF99' }}>Tech Company Inc. • 2022 - Present</p>
                  <p className="font-terminal text-sm mt-2" style={{ color: '#00D9FF66' }}>Leading development of enterprise-scale web applications using modern tech stack.</p>
                </div>
                <div>
                  <h4 className="font-terminal text-lg" style={{ color: '#00D9FF' }}>Full Stack Developer</h4>
                  <p className="font-terminal text-sm" style={{ color: '#00D9FF99' }}>Startup Solutions • 2020 - 2022</p>
                  <p className="font-terminal text-sm mt-2" style={{ color: '#00D9FF66' }}>Built and maintained multiple client projects from concept to deployment.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
         CONTACT SECTION
         ================================================================== */}
      <section id="contact" className="min-h-screen flex items-center justify-center relative py-24 px-6">
        <div className="absolute inset-0" style={{ backgroundColor: '#0A0A1A' }} />
        
        <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="terminal text-4xl md:text-5xl mb-8" style={{ color: '#00D9FF', textShadow: '0 0 20px #00D9FF' }}>
              &gt; Get In Touch_
            </h2>
            <p className="font-terminal text-lg mb-12" style={{ color: '#00D9FF99' }}>
              LET'S BUILD SOMETHING AMAZING TOGETHER
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="terminal-border p-6 inline-block"
                style={{ color: '#00D9FF', borderColor: '#00D9FF' }}
              >
                <span className="text-4xl">💻</span>
                <p className="font-terminal text-sm mt-2">GitHub</p>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/michael-oladele-272578159/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="terminal-border p-6 inline-block"
                style={{ color: '#00D9FF', borderColor: '#00D9FF' }}
              >
                <span className="text-4xl">💼</span>
                <p className="font-terminal text-sm mt-2">LinkedIn</p>
              </motion.a>
              <motion.a
                href="mailto:contact@example.com"
                whileHover={{ scale: 1.1 }}
                className="terminal-border p-6 inline-block"
                style={{ color: '#00D9FF', borderColor: '#00D9FF' }}
              >
                <span className="text-4xl">✉️</span>
                <p className="font-terminal text-sm mt-2">Email</p>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer page="tech" />
    </div>
  )
}
