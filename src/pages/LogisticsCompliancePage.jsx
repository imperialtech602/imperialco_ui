import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  LC_HERO,
  LC_PHILOSOPHY,
  LC_METRICS,
  LC_VISIBILITY,
  TEMP_RANGES,
  TEMP_SUPPORT,
  DOC_CARDS,
  LC_FAQS,
} from '@/data/logisticsComplianceContent'
import PageHero from '@/components/shared/PageHero'
import NextStepsCta from '@/components/shared/NextStepsCta'
import MiniHowItWorks from '@/components/shared/MiniHowItWorks'
import FeatureIcon from '@/components/icons/FeatureIcons'
import CheckIcon from '@/components/ui/CheckIcon'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

export default function LogisticsCompliancePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Logistics & Compliance | Imperial Co'
    return () => {
      document.title = 'Imperial Co | RLD & Comparator Sourcing'
    }
  }, [])

  return (
    <main id="top">
      <PageHero title={LC_HERO.title} subtitle={LC_HERO.subtitle} />

      <section className="container-page pb-14 sm:pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
              Quality Philosophy
            </h2>
            <ul className="mt-6 space-y-3">
              {LC_PHILOSOPHY.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-body sm:text-[15px]">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[28px] bg-brand p-5 sm:p-6">
            {LC_METRICS.map((metric) => (
              <article
                key={metric.label}
                className="rounded-2xl bg-white/10 px-4 py-5 text-center text-white"
              >
                <p className="text-xl font-extrabold sm:text-2xl">{metric.value}</p>
                <p className="mt-1 text-[11px] leading-snug text-white/70 sm:text-xs">
                  {metric.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-14 sm:pb-20">
        <SectionHeading
          title="Complete visibility from origin to delivery"
          className="mb-8"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LC_VISIBILITY.map((item) => (
            <article key={item.title} className="rounded-2xl bg-brand-muted p-5 sm:p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand">
                <FeatureIcon name={item.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-brand">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-body">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-14 sm:pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
              Temperature-Controlled Logistics
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-body sm:text-[15px]">
              Storage and shipping configurations aligned to labeled product requirements —
              from controlled ambient through refrigerated and ultra-low lanes where needed.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {TEMP_RANGES.map((item) => (
              <article
                key={item.range}
                className="rounded-2xl bg-brand-muted px-4 py-5 text-center"
              >
                <p className="text-lg font-extrabold text-brand sm:text-xl">{item.range}</p>
                <p className="mt-1 text-xs text-slate-soft">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {TEMP_SUPPORT.map((item) => (
            <article key={item.title} className="rounded-2xl border border-brand/8 bg-white p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-muted text-brand">
                <FeatureIcon name={item.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-brand">{item.title}</h3>
              <p className="mt-1.5 text-sm text-slate-body">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-14 sm:pb-20">
        <SectionHeading title="Complete paperwork with every shipment" className="mb-8" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_CARDS.map((item) => (
            <article
              key={item.title}
              className="flex items-center gap-4 rounded-2xl bg-brand-muted px-4 py-4"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                <FeatureIcon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="text-sm font-bold text-brand">{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-14 sm:pb-20">
        <SectionHeading
          title="Common questions about quality and logistics"
          className="mb-8"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {LC_FAQS.map((item) => (
            <article key={item.q} className="rounded-2xl bg-brand-muted p-6">
              <h3 className="text-base font-bold text-brand">{item.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-body">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <NextStepsCta
        title="Questions about our quality standards?"
        subtitle="Talk to our team about handling, documentation, and temperature-controlled supply."
        primaryLabel="Contact us"
        primaryTo="/request-quote"
        secondaryLabel="Email Us"
        secondaryTo="/#contact"
      />

      <section className="container-page pb-6">
        <div className="flex justify-center">
          <Link to="/request-quote">
            <Button variant="outline">Request a Quote</Button>
          </Link>
        </div>
      </section>

      <MiniHowItWorks />
    </main>
  )
}
