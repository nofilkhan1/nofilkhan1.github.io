import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useReducedMotion } from 'framer-motion'

export default function ClickSpark() {
  const { theme } = useTheme()
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const createSpark = useCallback((e: MouseEvent) => {
    if (reducedMotion) return
    const container = containerRef.current
    if (!container) return

    const x = e.clientX
    const y = e.clientY
    const count = 6 + Math.floor(Math.random() * 5)

    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div')
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
      const distance = 20 + Math.random() * 30
      const size = 2 + Math.random() * 3
      const duration = 300 + Math.random() * 100

      spark.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${theme === 'dark' ? '#E5E5E5' : '#0A0A0A'};
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        opacity: 1;
        transition: all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1);
      `
      container.appendChild(spark)

      requestAnimationFrame(() => {
        spark.style.transform = `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`
        spark.style.opacity = '0'
      })

      setTimeout(() => spark.remove(), duration)
    }
  }, [theme, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    document.addEventListener('click', createSpark)
    return () => document.removeEventListener('click', createSpark)
  }, [createSpark, reducedMotion])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  )
}
