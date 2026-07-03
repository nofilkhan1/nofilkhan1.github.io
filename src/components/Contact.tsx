import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useRef } from 'react'
import { Mail } from 'lucide-react'

export default function Contact() {
  const { theme } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <p className={`font-mono text-xs uppercase tracking-[0.2em] mb-4 ${
            theme === 'dark' ? 'text-[#666]' : 'text-[#888]'
          }`}>
            {'// reach_out()'}
          </p>
          <h2 className={`font-mono text-3xl md:text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-[#FAFAFA]' : 'text-[#0A0A0A]'
          }`}>
            Let us talk.
          </h2>
          <div className={`w-10 h-0.5 mx-auto mb-8 ${
            theme === 'dark' ? 'bg-[#333]' : 'bg-[#CCC]'
          }`} />
          <p className={`text-sm leading-relaxed mb-10 max-w-md mx-auto ${
            theme === 'dark' ? 'text-[#888]' : 'text-[#666]'
          }`}>
            Open to internships, collaborations, or just a conversation. Every
            message gets a response.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="https://github.com/nofilkhan1"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border transition-all duration-150 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-[#111115] border-[#2A2A2A] text-[#E5E5E5]'
                : 'bg-white border-[#E5E5E5] text-[#111]'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nofil-khan-975333301"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border transition-all duration-150 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-[#111115] border-[#2A2A2A] text-[#E5E5E5]'
                : 'bg-white border-[#E5E5E5] text-[#111]'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a
            href="mailto:nofilkhan251@gmail.com"
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border transition-all duration-150 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-[#111115] border-[#2A2A2A] text-[#E5E5E5]'
                : 'bg-white border-[#E5E5E5] text-[#111]'
            }`}
          >
            <Mail size={14} />
            nofilkhan251@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  )
}
