import { useEffect } from 'react'
import Nav from '@/components/Nav/Nav.jsx'
import Hero from '@/components/Hero/Hero.jsx'
import BrandMarquee from '@/components/BrandMarquee/BrandMarquee.jsx'
import Work from '@/components/Work/Work.jsx'
import Reviews from '@/components/Reviews/Reviews.jsx'
import Process from '@/components/Process/Process.jsx'
import Tools from '@/components/Tools/Tools.jsx'
import Services from '@/components/Services/Services.jsx'
import About from '@/components/About/About.jsx'
import Faq from '@/components/Faq/Faq.jsx'
import Contact from '@/components/Contact/Contact.jsx'
import { useContent } from '@/hooks/useContent.js'

export default function Home() {
  const { data: site } = useContent('site')

  useEffect(() => {
    document.title = `${site.name} · ${site.role}`
  }, [site.name, site.role])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BrandMarquee />
        <Work />
        <Reviews />
        <Process />
        <Tools />
        <Services />
        <About />
        <Faq />
      </main>
      <Contact />
    </>
  )
}
