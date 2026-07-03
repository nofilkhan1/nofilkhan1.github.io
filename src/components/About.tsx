import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const { theme } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <p className={`font-mono text-sm uppercase tracking-[0.2em] mb-4 ${
            theme === 'dark' ? 'text-[#666]' : 'text-[#888]'
          }`}>
            {'// about'}
          </p>
          <h2 className={`font-mono text-3xl md:text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-[#FAFAFA]' : 'text-[#0A0A0A]'
          }`}>
            Not just tutorials.
          </h2>
          <h2 className={`font-mono text-3xl md:text-4xl font-bold mb-8 ${
            theme === 'dark' ? 'text-[#FAFAFA]' : 'text-[#0A0A0A]'
          }`}>
            Real things, built.
          </h2>
          <div className={`w-10 h-0.5 mb-8 ${
            theme === 'dark' ? 'bg-[#333]' : 'bg-[#CCC]'
          }`} />
        </motion.div>

        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4"
          >
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-[#999]' : 'text-[#555]'
            }`}>
              I am a CS student currently after my second semester. I do not
              wait until I know enough to start building. I pick something
              hard, figure it out along the way, and ship it.
            </p>
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-[#999]' : 'text-[#555]'
            }`}>
              This summer I am focused on three tracks: solving DSA problems in
              C++, building web apps with React and Next.js, and learning
              backend development with FastAPI. Every project here is built
              from scratch, no templates, no shortcuts.
            </p>
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-[#999]' : 'text-[#555]'
            }`}>
              The goal is simple: become an engineer who ships things that
              actually work.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { n: '8+', l: 'Projects Shipped' },
              { n: 'C++', l: 'Primary Language' },
              { n: 'React', l: 'Web Dev' },
              { n: '∞', l: 'Still Building' },
            ].map((card, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg text-center border transition-all duration-150 hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'bg-[#111115] border-[#2A2A2A]'
                    : 'bg-[#F5F5F5] border-[#E5E5E5]'
                }`}
              >
                <span className={`font-mono text-xl font-bold block ${
                  theme === 'dark' ? 'text-[#FAFAFA]' : 'text-[#0A0A0A]'
                }`}>
                  {card.n}
                </span>
                <span className={`text-[10px] uppercase tracking-wider ${
                  theme === 'dark' ? 'text-[#666]' : 'text-[#888]'
                }`}>
                  {card.l}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
