import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { transitions } from '@/theme/motion.js'
import Home from '@/pages/Home.jsx'
import AboutPage from '@/pages/AboutPage.jsx'

export default function App() {
  return (
    // reducedMotion="user" turns off transform/layout animations for visitors
    // who ask their OS for less motion.
    <MotionConfig reducedMotion="user" transition={transitions.base}>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Iteration 2:
            <Route path="/admin/*" element={<AdminLayout />} />
            Protected by auth, edits the same collections useContent reads. */}
        <Route path="*" element={<Home />} />
      </Routes>
    </MotionConfig>
  )
}

// Router links don't scroll by themselves: jump to the #hash, or to the top on a new page.
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash, key])

  return null
}
