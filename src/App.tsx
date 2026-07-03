import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import ClickSpark from './components/ClickSpark'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <ClickSpark />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
        <Footer />
        <ChatWidget />
      </div>
    </ThemeProvider>
  )
}

export default App
