import { SERVICE_CARDS } from '@/data/landingContent'
import FeatureIcon from '@/components/icons/FeatureIcons'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Services() {
  return (
    <section id="services" className="container-page pb-16 sm:pb-20">
      <SectionHeading title="Supporting pharmaceutical R&D across all applications." />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {SERVICE_CARDS.map((card) => (
          <article
            key={card.title}
            className="rounded-[28px] border border-brand/8 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-brand/5 sm:rounded-[32px] sm:p-7"
          >
            <FeatureIcon name={card.icon} className="h-10 w-10 text-brand" />
            <h3 className="mt-5 text-lg font-bold leading-snug text-brand">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-body">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
