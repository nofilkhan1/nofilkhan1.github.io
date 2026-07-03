import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const roles = [
  'DSA in C++',
  'React & Next.js',
  'FastAPI Backend',
  'Full Stack Dev',
]

export default function Hero() {
  const { theme } = useTheme()
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

  const [nameRevealed, setNameRevealed] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setNameRevealed(true), 300)
    return () => clearTimeout(t)
  }, [])

  const nameChars = 'Nofil Khan'.split('')

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative px-6 py-20"
    >
      <div className="text-center max-w-3xl">
        <p className="font-mono text-base mb-4">
          <span className={theme === 'dark' ? 'text-[#888]' : 'text-[#666]'}>
            {'> '}
          </span>
          <span className={theme === 'dark' ? 'text-[#E5E5E5]' : 'text-[#111]'}>
            {displayText}
          </span>
          <span className="animate-pulse ml-0.5">|</span>
        </p>

        <h1 className="font-mono text-5xl md:text-7xl font-bold tracking-tight mb-6">
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={nameRevealed ? { opacity: 1 } : {}}
              transition={{ duration: 0.05, delay: i * 0.05 }}
              className={theme === 'dark' ? 'text-[#FAFAFA]' : 'text-[#0A0A0A]'}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={`text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 ${
            theme === 'dark' ? 'text-[#888]' : 'text-[#666]'
          }`}
        >
          I build software from scratch. Currently focused on data structures
          and algorithms in C++, modern web development with React and Next.js,
          and backend systems with FastAPI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#projects"
            className={`px-6 py-3 text-sm font-semibold rounded-md transition-all duration-150 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-[#FAFAFA] text-[#0A0A0A]'
                : 'bg-[#0A0A0A] text-[#FAFAFA]'
            }`}
          >
            See My Work
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('chat-widget-trigger')
              el?.click()
            }}
            className={`px-6 py-3 text-sm font-semibold rounded-md border transition-all duration-150 hover:scale-105 ${
              theme === 'dark'
                ? 'border-[#2A2A2A] text-[#E5E5E5]'
                : 'border-[#E5E5E5] text-[#111]'
            }`}
          >
            Ask Me Anything
          </button>
        </motion.div>
      </div>

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
