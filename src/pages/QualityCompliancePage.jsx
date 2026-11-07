import { useEffect } from 'react'
import { QC_HERO, QC_TRACEABILITY, QC_DETAIL_CARDS } from '@/data/qualityComplianceContent'
import PageHero from '@/components/shared/PageHero'
import RoleClarityBlock from '@/components/shared/RoleClarityBlock'
import NextStepsCta from '@/components/shared/NextStepsCta'
import MiniHowItWorks from '@/components/shared/MiniHowItWorks'
import FeatureIcon from '@/components/icons/FeatureIcons'
import CheckIcon from '@/components/ui/CheckIcon'
import SectionHeading from '@/components/ui/SectionHeading'

export default function QualityCompliancePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Quality & Compliance | Imperial Co'
    return () => {
      document.title = 'Imperial Co | RLD & Comparator Sourcing'
    }
  }, [])

  return (
    <main id="top">
      <PageHero title={QC_HERO.title} subtitle={QC_HERO.subtitle} />

      <section className="container-page pb-14 sm:pb-20">
        <SectionHeading title="Traceability from Origin to Delivery" className="mb-8" />
        <div className="rounded-[28px] bg-brand-muted p-5 sm:rounded-[36px] sm:p-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {QC_TRACEABILITY.map((item) => (
              <article key={item.title} className="rounded-2xl bg-white p-5 text-center sm:p-6">
                <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-muted text-brand">
                  <FeatureIcon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-brand">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-body sm:text-sm">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-14 sm:pb-20">
        <div className="grid gap-4 lg:grid-cols-3">
          {QC_DETAIL_CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-brand/8 bg-white p-6 sm:p-7"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-muted text-brand">
                <FeatureIcon name={card.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand">{card.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-body">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <RoleClarityBlock />
      <NextStepsCta />
      <MiniHowItWorks />
    </main>
  )
}
