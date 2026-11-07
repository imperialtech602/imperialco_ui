import { useEffect } from 'react'
import AboutHero from '@/components/about/AboutHero'
import OurStory from '@/components/about/OurStory'
import AboutMilestones from '@/components/about/AboutMilestones'
import AboutValues from '@/components/about/AboutValues'
import AboutTrust from '@/components/about/AboutTrust'
import AboutNextSteps from '@/components/about/AboutNextSteps'
import AboutHowItWorks from '@/components/about/AboutHowItWorks'

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'About Us | Imperial Co'
    return () => {
      document.title = 'Imperial Co | RLD & Comparator Sourcing'
    }
  }, [])

  return (
    <main id="top">
      <AboutHero />
      <OurStory />
      <AboutMilestones />
      <AboutValues />
      <AboutTrust />
      <AboutNextSteps />
      <AboutHowItWorks />
    </main>
  )
}
