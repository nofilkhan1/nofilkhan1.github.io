import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { theme } = useTheme()

  return (
    <footer className={`py-5 px-6 text-center text-xs border-t ${
      theme === 'dark'
        ? 'bg-[#0A0A0A] border-[#2A2A2A] text-[#555]'
        : 'bg-[#FAFAFA] border-[#E5E5E5] text-[#999]'
    }`}>
      Built by <span className={theme === 'dark' ? 'text-[#E5E5E5]' : 'text-[#111]'}>Nofil Khan</span> · 2026
    </footer>
  )
}
