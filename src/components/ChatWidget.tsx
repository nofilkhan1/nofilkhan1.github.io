import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { MessageCircle, X, Send } from 'lucide-react'

const GROQ_API_KEY = 'REDACTED_API_KEY_2'

const SYSTEM_PROMPT = `You are the portfolio assistant for Nofil Khan, a software developer and builder. Answer questions about him directly and concisely in 2 to 4 sentences. Never use bullet points. Write in clear, professional English with personality. Be confident and direct, never robotic. Never mention any university name unless the visitor specifically asks where he studies.

About Nofil: He is a CS student currently after his second semester. He builds real software from scratch, not tutorials. C++ is his primary language. He is currently focused on DSA in C++, web development with React and Next.js, and backend development with FastAPI.

Projects:
QuizRipple: A full stack trivia quiz game built with tRPC and Express on the backend and Supabase for data. Seeded with over 300 questions across three categories, with a leaderboard and category based gameplay.

Junaid Jamshed Clone: A clone of the Junaid Jamshed clothing brand website, built with FastAPI on the backend and Next.js on the frontend. Recreates a real world ecommerce style storefront.

Lahore to Islamabad: A 2D runner game where a boy runs and completes missions to gather cash. Currently in development.

DSA Visualizer: A C++ project built with SFML that visualizes five sorting algorithms in real time with live animation and statistics.

FastAPI CRUD TODO App: A full REST backend with complete frontend integration and CORS middleware.

Weather App: Built with HTML, CSS, and JavaScript using the OpenWeatherMap API.

Space Invaders: Galactic Defense: Built with C++ and SFML, featuring multi phase boss AI, a spread and pierce weapon system, and a particle explosion system. GitHub: https://github.com/nofilkhan1/space-invaders-cpp

Portfolio AI Chatbot: This portfolio features an integrated Groq AI chatbot that answers questions about projects, skills, and goals.

Skills: C++, React, Next.js, Tailwind, FastAPI, Supabase, SFML, Git and GitHub, DSA, OOP, TypeScript, REST APIs, tRPC.

Open to internships and collaborations: Yes.
Email: nofilkhan251@gmail.com
LinkedIn: linkedin.com/in/nofil-khan-975333301
GitHub: github.com/nofilkhan1

RULES:
- If asked about GPA, reply exactly: "Enough to succeed in this world." Keep it short, confident, a little playful. Do not give an actual number.
- If asked for a repo link and the repo is private or not public, reply that Nofil can share it directly and point to the email or contact section.
- Keep every other answer to 2 to 4 sentences, confident and direct, never robotic, never listing things with bullet points.
- Do not use dashes (hyphens, en dashes, or em dashes) anywhere in your responses. Use commas, periods, or separate sentences instead.
- If asked something not listed here, say: reach Nofil directly at nofilkhan251@gmail.com`

interface Message {
  role: 'user' | 'bot'
  text: string
}

export default function ChatWidget() {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hey! Ask me anything about Nofil, projects, skills, goals, whatever.' },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim()
    if (!msg || isLoading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setIsLoading(true)

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          max_tokens: 400,
          temperature: 0.7,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({
              role: m.role === 'user' ? 'user' : 'assistant',
              content: m.text,
            })),
            { role: 'user', content: msg },
          ],
        }),
      })

      const data = await res.json()
      if (data.choices?.[0]) {
        setMessages(prev => [...prev, { role: 'bot', text: data.choices[0].message.content }])
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: 'Something went wrong. Try again.' }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Connection error. Check your internet and try again.' }])
    }

    setIsLoading(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={`absolute bottom-16 right-0 w-[320px] rounded-xl border overflow-hidden flex flex-col ${
              theme === 'dark'
                ? 'bg-[#0A0A0A] border-[#2A2A2A]'
                : 'bg-white border-[#E5E5E5]'
            }`}
            style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2A2A2A] bg-[#F0EDE4]">
              <div className="w-7 h-7 rounded-full bg-[#0A0A0A] flex items-center justify-center text-xs">
                🤖
              </div>
              <div className="flex-1">
                <p className="text-xs font-mono font-semibold text-[#0A0A0A]">nofil.exe</p>
                <p className="text-[10px] text-[#666] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#444] inline-block" />
                  Online
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#666] hover:text-[#0A0A0A] transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 max-h-[300px] min-h-[200px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-xs leading-relaxed px-3 py-2 rounded-lg max-w-[85%] ${
                    msg.role === 'bot'
                      ? 'bg-[#111115] text-[#E5E5E5] self-start border border-[#2A2A2A]'
                      : 'bg-[#F0EDE4] text-[#0A0A0A] self-end ml-auto'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-1 px-3 py-2 bg-[#111115] border border-[#2A2A2A] rounded-lg w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#555] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#555] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#555] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2 p-3 border-t border-[#2A2A2A]">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask something..."
                className="flex-1 bg-[#111115] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs text-[#E5E5E5] placeholder-[#555] outline-none focus:border-[#555] transition-colors"
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 bg-[#F0EDE4]"
              >
                <Send size={13} className="text-[#0A0A0A]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        id="chat-widget-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 bg-[#F0EDE4] border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
      >
        {isOpen ? (
          <X size={18} className="text-[#0A0A0A]" />
        ) : (
          <MessageCircle size={18} className="text-[#0A0A0A]" />
        )}
      </button>
    </div>
  )
}
