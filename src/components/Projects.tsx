import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'

interface Project {
  title: string
  tag: string
  desc: string
  tags: string[]
  link?: string
  repo?: boolean
  status?: string
}

const projects: Project[] = [
  {
    title: 'QuizRipple',
    tag: 'Full stack trivia quiz game',
    desc: 'Built with tRPC and Express on the backend and Supabase for data. Seeded with over 300 questions across three categories, with a leaderboard and category based gameplay. Built to practice full stack architecture end to end, from schema design to deployment.',
    tags: ['tRPC', 'Express', 'Supabase', 'TypeScript'],
    link: 'https://github.com/nofilkhan1',
    repo: true,
  },
  {
    title: 'Junaid Jamshed Clone',
    tag: 'Ecommerce storefront clone',
    desc: 'A clone of the Junaid Jamshed clothing brand website, built with FastAPI on the backend and Next.js on the frontend. Recreates a real world ecommerce style storefront including product listing, product detail pages, and a working backend API.',
    tags: ['FastAPI', 'Next.js', 'Python', 'React'],
    repo: true,
  },
  {
    title: 'Lahore to Islamabad',
    tag: '2D runner game, in progress',
    desc: 'A 2D runner game where a boy runs and completes missions to gather cash, first reaching Islamabad and ultimately Naran. Currently in development, focused on level progression, obstacle and cash collection mechanics, and a mission based story structure.',
    tags: ['Game Dev', 'C++', 'SFML'],
    status: 'IN DEVELOPMENT',
    repo: true,
  },
  {
    title: 'DSA Visualizer',
    tag: 'Algorithm visualization tool',
    desc: 'A C++ project built with SFML that visualizes five sorting algorithms in real time, showing live animation and statistics such as comparisons and swaps as each algorithm runs. Built to make abstract algorithm behavior visible and easier to reason about.',
    tags: ['C++', 'SFML', 'DSA'],
    link: 'https://github.com/nofilkhan1',
    repo: true,
  },
  {
    title: 'FastAPI CRUD TODO App',
    tag: 'Full REST backend with frontend',
    desc: 'A full REST backend with complete frontend integration and CORS middleware, covering create, read, update, and delete operations end to end.',
    tags: ['FastAPI', 'Python', 'REST API'],
    repo: true,
  },
  {
    title: 'Weather App',
    tag: 'API powered weather dashboard',
    desc: 'Built with HTML, CSS, and JavaScript using the OpenWeatherMap API, DOM manipulation, and the Fetch API.',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
    repo: true,
  },
  {
    title: 'Space Invaders: Galactic Defense',
    tag: 'OOP game with boss AI',
    desc: 'Built with C++ and SFML, featuring multi phase boss AI, a spread and pierce weapon system, and a particle explosion system.',
    tags: ['C++', 'SFML', 'OOP', 'Game Dev'],
    link: 'https://github.com/nofilkhan1/space-invaders-cpp',
    repo: true,
  },
  {
    title: 'Portfolio AI Chatbot',
    tag: 'Groq powered assistant',
    desc: 'This portfolio features an integrated Groq AI chatbot that answers questions about projects, skills, and goals. Built with client side JavaScript and the Groq API for instant responses.',
    tags: ['JavaScript', 'Groq API', 'AI'],
  },
]

const earlierProjects = [
  { name: 'Candy Crush Clone', desc: 'Match 3 game with SFML' },
  { name: 'University Management System', desc: 'Full OOP academic project' },
  { name: 'Library Management System', desc: 'File I/O persistence' },
  { name: 'Traffic Management System', desc: 'Queue based simulation' },
]

function SpotlightCard({ project, index }: { project: Project; index: number }) {
  const { theme } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-5 rounded-xl border transition-all duration-200 ${
        theme === 'dark'
          ? 'bg-[#111115] border-[#2A2A2A]'
          : 'bg-white border-[#E5E5E5]'
      }`}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-20"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${
              theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
            }, transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-mono text-base font-semibold ${
            theme === 'dark' ? 'text-[#FAFAFA]' : 'text-[#0A0A0A]'
          }`}>
            {project.title}
          </h3>
          {project.status && (
            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-[#333] text-[#888]">
              {project.status}
            </span>
          )}
        </div>

        <p className={`font-mono text-xs italic mb-3 ${
          theme === 'dark' ? 'text-[#666]' : 'text-[#999]'
        }`}>
          {project.tag}
        </p>

        <p className={`text-sm leading-relaxed mb-4 ${
          theme === 'dark' ? 'text-[#888]' : 'text-[#666]'
        }`}>
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                theme === 'dark'
                  ? 'border-[#2A2A2A] text-[#888]'
                  : 'border-[#E5E5E5] text-[#666]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E5E5E5] hover:opacity-70 transition-opacity"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View on GitHub
            </a>
          )}
          {project.repo && !project.link && (
            <span className="text-[10px] font-mono text-[#666]">
              ask for repo access
            </span>
          )}
          {project.repo && project.link && (
            <span className="text-[10px] font-mono text-[#666]">
              ask for repo access
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { theme } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <p className={`font-mono text-xs uppercase tracking-[0.2em] mb-4 ${
            theme === 'dark' ? 'text-[#666]' : 'text-[#888]'
          }`}>
            {'// projects[]'}
          </p>
          <h2 className={`font-mono text-3xl md:text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-[#FAFAFA]' : 'text-[#0A0A0A]'
          }`}>
            Things I have shipped.
          </h2>
          <div className={`w-10 h-0.5 mb-12 ${
            theme === 'dark' ? 'bg-[#333]' : 'bg-[#CCC]'
          }`} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {projects.map((project, i) => (
            <SpotlightCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className={`font-mono text-xs uppercase tracking-[0.15em] mb-4 ${
            theme === 'dark' ? 'text-[#555]' : 'text-[#999]'
          }`}>
            Earlier projects
          </p>
          <div className="flex flex-wrap gap-3">
            {earlierProjects.map(p => (
              <div
                key={p.name}
                className={`px-3 py-2 rounded-md border text-xs ${
                  theme === 'dark'
                    ? 'border-[#2A2A2A] text-[#888]'
                    : 'border-[#E5E5E5] text-[#666]'
                }`}
              >
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-[#CCC]' : 'text-[#333]'
                }`}>
                  {p.name}
                </span>
                <span className="mx-1.5 opacity-30">|</span>
                <span>{p.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
