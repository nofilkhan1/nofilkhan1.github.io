import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const roles = [
  'DSA in C++',
  'React & Next.js',
  'FastAPI Backend',
  'Full Stack Dev',
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function Hero() {
  const { theme } = useTheme()
  const prefersReduced = useReducedMotion()
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIdx(i => (i + 1) % roles.length)
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? current.slice(0, displayText.length - 1)
              : current.slice(0, displayText.length + 1)
          )
        },
        isDeleting ? 50 : 80
      )
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIdx])

  const staggerVariants = prefersReduced
    ? { hidden: {}, show: { transition: { staggerChildren: 0 } } }
    : container

  const itemVariants = prefersReduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.01 } } }
    : item

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative px-6 py-20"
    >
      <motion.div
        className="text-center max-w-3xl"
        variants={staggerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={itemVariants} className="font-mono text-base mb-4">
          <span className={theme === 'dark' ? 'text-[#888]' : 'text-[#666]'}>
            {'> '}
          </span>
          <span className={theme === 'dark' ? 'text-[#E5E5E5]' : 'text-[#111]'}>
            {displayText}
          </span>
          <span className="animate-pulse ml-0.5">|</span>
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className={`font-mono text-5xl md:text-7xl font-bold tracking-tight mb-6 ${
            theme === 'dark' ? 'text-[#FAFAFA]' : 'text-[#0A0A0A]'
          }`}
        >
          Nofil Khan
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 ${
            theme === 'dark' ? 'text-[#888]' : 'text-[#666]'
          }`}
        >
          I build software from scratch. Currently focused on data structures
          and algorithms in C++, modern web development with React and Next.js,
          and backend systems with FastAPI.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#projects"
            className={`px-6 py-3 text-sm font-semibold rounded-md transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-[#FAFAFA] text-[#0A0A0A] hover:bg-[#E5E5E5]'
                : 'bg-[#0A0A0A] text-[#FAFAFA] hover:bg-[#333]'
            }`}
          >
            See My Work
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('chat-widget-trigger')
              el?.click()
            }}
            className={`px-6 py-3 text-sm font-semibold rounded-md border transition-all duration-200 ${
              theme === 'dark'
                ? 'border-[#2A2A2A] text-[#E5E5E5] hover:border-[#555] hover:bg-[#1C1C20]'
                : 'border-[#E5E5E5] text-[#111] hover:border-[#CCC] hover:bg-[#F0F0F0]'
            }`}
          >
            Ask Me Anything
          </button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`mt-12 flex items-center justify-center gap-6 font-mono text-xs flex-wrap ${
            theme === 'dark' ? 'text-[#555]' : 'text-[#999]'
          }`}
        >
          <span>8+ Projects</span>
          <span className="opacity-30">·</span>
          <span>C++</span>
          <span className="opacity-30">·</span>
          <span>React</span>
          <span className="opacity-30">·</span>
          <span>Next.js</span>
          <span className="opacity-30">·</span>
          <span>FastAPI</span>
        </motion.div>
      </motion.div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.2em] ${
          theme === 'dark' ? 'text-[#888]' : 'text-[#666]'
        }`}
      >
        scroll
      </div>
    </section>
  )
}
