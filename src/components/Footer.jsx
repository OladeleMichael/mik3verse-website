import React from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-black terminal-border border-l-0 border-r-0 border-b-0 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="header-title header-glow text-3xl mb-4">MIK3VERSE</h3>
            <p className="terminal text-amber-glow/70 text-sm">
              Multi-Dimensional Portfolio
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="terminal terminal-glow text-xl mb-4">&gt; Quick Links</h4>
            <ul className="space-y-2 terminal text-amber-glow/70">
              <li><a href="#" className="hover:text-amber-glow hover:terminal-glow transition-all">&gt; About</a></li>
              <li><a href="#" className="hover:text-amber-glow hover:terminal-glow transition-all">&gt; Services</a></li>
              <li><a href="#" className="hover:text-amber-glow hover:terminal-glow transition-all">&gt; Portfolio</a></li>
              <li><a href="#" className="hover:text-amber-glow hover:terminal-glow transition-all">&gt; Contact</a></li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="terminal terminal-glow text-xl mb-4">&gt; Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="terminal-border bg-black/50 p-3 hover:bg-amber-glow/10 transition-all group">
                <span className="terminal text-amber-glow terminal-glow text-lg">IG</span>
              </a>
              <a href="#" className="terminal-border bg-black/50 p-3 hover:bg-amber-glow/10 transition-all group">
                <span className="terminal text-amber-glow terminal-glow text-lg">VI</span>
              </a>
              <a href="#" className="terminal-border bg-black/50 p-3 hover:bg-amber-glow/10 transition-all group">
                <span className="terminal text-amber-glow terminal-glow text-lg">YT</span>
              </a>
            </div>
          </motion.div>
        </div>
        <div className="h-px bg-amber-glow/20 mb-6" />
        {/* Copyright */}
        <div className="text-center terminal text-sm text-[#FFB400]">
          &copy; {new Date().getFullYear()} Mik3verse. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
