import { useEffect } from 'react'
import SourcingHero from '@/components/sourcing/SourcingHero'
import MarketCoverage from '@/components/sourcing/MarketCoverage'
import SourcingScope from '@/components/sourcing/SourcingScope'
import RoleClarity from '@/components/sourcing/RoleClarity'
import SourcingCta from '@/components/sourcing/SourcingCta'
import SourcingHowItWorks from '@/components/sourcing/SourcingHowItWorks'

export default function SourcingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Sourcing | Imperial Co'
    return () => {
      document.title = 'Imperial Co | RLD & Comparator Sourcing'
    }
  }, [])

  return (
    <main id="top">
      <SourcingHero />
      <MarketCoverage />
      <SourcingScope />
      <RoleClarity />
      <SourcingCta />
      <SourcingHowItWorks />
    </main>
  )
}
