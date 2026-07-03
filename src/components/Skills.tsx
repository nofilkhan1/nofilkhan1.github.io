import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useRef } from 'react'

const skills = [
  'C++', 'SFML', 'React', 'Next.js', 'Tailwind', 'FastAPI',
  'Supabase', 'TypeScript', 'Git & GitHub', 'DSA', 'OOP',
  'Game Loops', 'File Handling', 'REST APIs', 'tRPC',
]

export default function Skills() {
  const { theme } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className={`py-20 overflow-hidden ${
      theme === 'dark' ? 'bg-[#111115]' : 'bg-[#F5F5F5]'
    }`}>
      <div className="max-w-5xl mx-auto px-6 mb-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <p className={`font-mono text-sm uppercase tracking-[0.2em] mb-4 ${
            theme === 'dark' ? 'text-[#666]' : 'text-[#888]'
          }`}>
            {'// skills.h'}
          </p>
          <h2 className={`font-mono text-3xl md:text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-[#FAFAFA]' : 'text-[#0A0A0A]'
          }`}>
            What I work with.
          </h2>
          <div className={`w-10 h-0.5 mt-6 ${
            theme === 'dark' ? 'bg-[#333]' : 'bg-[#CCC]'
          }`} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={i}
              className={`inline-flex items-center px-4 py-2 mx-2 rounded-md text-sm font-mono border transition-all duration-150 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-[#1C1C20] border-[#2A2A2A] text-[#E5E5E5] hover:border-[#555]'
                  : 'bg-white border-[#E5E5E5] text-[#111] hover:border-[#999]'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
        <div className={`absolute inset-y-0 left-0 w-24 bg-gradient-to-r pointer-events-none ${
          theme === 'dark' ? 'from-[#111115]' : 'from-[#F5F5F5]'
        }`} />
        <div className={`absolute inset-y-0 right-0 w-24 bg-gradient-to-l pointer-events-none ${
          theme === 'dark' ? 'from-[#111115]' : 'from-[#F5F5F5]'
        }`} />
      </motion.div>
    </section>
  )
}
