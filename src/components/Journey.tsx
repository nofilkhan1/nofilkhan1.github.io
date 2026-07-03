import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useRef } from 'react'

interface Phase {
  status: 'done' | 'current' | 'upcoming'
  label: string
  title: string
  badge: string
  items: string[]
}

const phases: Phase[] = [
  {
    status: 'done',
    label: 'Phase 1',
    title: 'First code, first game',
    badge: 'DONE',
    items: [
      'Programming fundamentals in C++',
      'Built Candy Crush Clone, my first SFML project from scratch',
      'Match 3 logic, cascade physics, swap animations',
    ],
  },
  {
    status: 'done',
    label: 'Phase 2',
    title: 'Shipped five projects',
    badge: 'DONE',
    items: [
      'Object Oriented Programming in C++',
      'Space Invaders with multi phase boss AI, particle FX and audio engine',
      'University, Library and Traffic Management Systems',
      'Digital Logic Design fundamentals',
    ],
  },
  {
    status: 'current',
    label: 'Phase 3, Summer 2026',
    title: 'Building on the break',
    badge: 'IN PROGRESS',
    items: [
      'DSA Visualizer, interactive sorting and searching tool',
      'QuizRipple, full stack trivia game',
      'Web development with React, Next.js and FastAPI',
      'Getting everything on GitHub with proper docs',
    ],
  },
  {
    status: 'upcoming',
    label: 'Phase 4',
    title: 'Going deeper',
    badge: 'UPCOMING',
    items: [
      'Advanced Data Structures and Algorithms',
      'Computer Organization and Assembly',
      'Discrete Structures',
      'First open source contribution',
    ],
  },
  {
    status: 'upcoming',
    label: 'Phase 5',
    title: 'The actual goal',
    badge: 'PLANNED',
    items: [
      'Build something people actually use at scale',
      'Contribute to open source in a meaningful way',
      'Grow into an engineer known for shipping, not just studying',
    ],
  },
]

const dotStyles = {
  done: 'border-[#444] bg-[#1C1C20]',
  current: 'border-[#888] bg-[#1C1C20] shadow-[0_0_12px_rgba(255,255,255,0.08)]',
  upcoming: 'border-[#333] bg-[#111115] opacity-60',
}

const badgeStyles = {
  done: 'border-[#333] text-[#888]',
  current: 'border-[#555] text-[#CCC]',
  upcoming: 'border-[#333] text-[#666]',
}

export default function Journey() {
  const { theme } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="journey" className={`py-28 px-6 ${
      theme === 'dark' ? 'bg-[#111115]' : 'bg-[#F5F5F5]'
    }`}>
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <p className={`font-mono text-sm uppercase tracking-[0.2em] mb-4 ${
            theme === 'dark' ? 'text-[#666]' : 'text-[#888]'
          }`}>
            {'// journey.log'}
          </p>
          <h2 className={`font-mono text-3xl md:text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-[#FAFAFA]' : 'text-[#0A0A0A]'
          }`}>
            The roadmap.
          </h2>
          <div className={`w-10 h-0.5 mb-12 ${
            theme === 'dark' ? 'bg-[#333]' : 'bg-[#CCC]'
          }`} />
        </motion.div>

        <div className="relative">
          <div className={`absolute left-[15px] top-0 bottom-0 w-px ${
            theme === 'dark' ? 'bg-[#2A2A2A]' : 'bg-[#E5E5E5]'
          }`} />

          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex gap-5 mb-8 relative"
            >
              <div className={`w-[31px] h-[31px] min-w-[31px] rounded-full flex items-center justify-center text-xs border z-10 ${
                theme === 'dark' ? dotStyles[phase.status] : 'border-[#CCC] bg-white'
              }`}>
                {phase.status === 'done' && '✓'}
                {phase.status === 'current' && '→'}
                {phase.status === 'upcoming' && '·'}
              </div>

              <div className="pt-0.5">
                <p className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${
                  theme === 'dark' ? 'text-[#555]' : 'text-[#999]'
                }`}>
                  {phase.label}
                </p>
                <p className={`text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-[#E5E5E5]' : 'text-[#111]'
                }`}>
                  {phase.title}
                  <span className={`inline-block ml-2 font-mono text-[9px] uppercase px-2 py-0.5 rounded border ${
                    theme === 'dark' ? badgeStyles[phase.status] : 'border-[#E5E5E5] text-[#666]'
                  }`}>
                    {phase.badge}
                  </span>
                </p>
                <ul className="space-y-1">
                  {phase.items.map((item, j) => (
                    <li key={j} className={`text-xs flex items-start gap-2 ${
                      theme === 'dark' ? 'text-[#888]' : 'text-[#666]'
                    }`}>
                      <span className="text-[#555] mt-0.5">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
