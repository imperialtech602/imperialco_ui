import { useEffect } from 'react'
import HowHero from '@/components/how-it-works/HowHero'
import ProcessNav from '@/components/how-it-works/ProcessNav'
import ProcessSteps from '@/components/how-it-works/ProcessSteps'
import TypicalTimeline from '@/components/how-it-works/TypicalTimeline'
import OrderBenefits from '@/components/how-it-works/OrderBenefits'
import HowCta from '@/components/how-it-works/HowCta'
import ProcessSummary from '@/components/how-it-works/ProcessSummary'

export default function HowItWorksPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'How It Works | Imperial Co'
    return () => {
      document.title = 'Imperial Co | RLD & Comparator Sourcing'
    }
  }, [])

  return (
    <main id="top">
      <HowHero />
      <ProcessNav />
      <ProcessSteps />
      <TypicalTimeline />
      <OrderBenefits />
      <HowCta />
      <ProcessSummary />
    </main>
  )
}
