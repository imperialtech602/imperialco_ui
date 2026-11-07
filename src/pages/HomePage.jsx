import Hero from '@/components/sections/Hero'
import FeatureGrid from '@/components/sections/FeatureGrid'
import ComparatorSupport from '@/components/sections/ComparatorSupport'
import Procurement from '@/components/sections/Procurement'
import RiskGrid from '@/components/sections/RiskGrid'
import FounderStats from '@/components/sections/FounderStats'
import TrustBanner from '@/components/sections/TrustBanner'
import Services from '@/components/sections/Services'
import Quality from '@/components/sections/Quality'
import HowItWorks from '@/components/sections/HowItWorks'
import UrgentCta from '@/components/sections/UrgentCta'

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <FeatureGrid />
      <ComparatorSupport />
      <Procurement />
      <RiskGrid />
      <FounderStats />
      <TrustBanner />
      <Services />
      <Quality />
      <HowItWorks />
      <UrgentCta />
    </main>
  )
}
