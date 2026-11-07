import { SCOPE_CARDS } from '@/data/sourcingContent'
import FeatureIcon from '@/components/icons/FeatureIcons'
import CheckIcon from '@/components/ui/CheckIcon'
import SectionHeading from '@/components/ui/SectionHeading'

export default function SourcingScope() {
  return (
    <section className="container-page pb-14 sm:pb-20">
      <SectionHeading title="Comparator & RLD scope" className="mb-10" />
      <div className="grid gap-4 lg:grid-cols-2">
        {SCOPE_CARDS.map((card) => (
          <article
            key={card.title}
            className="rounded-2xl border border-brand/8 bg-white p-6 sm:p-8"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-muted text-brand">
              <FeatureIcon name={card.icon} className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-brand">{card.title}</h3>
            <ul className="mt-5 space-y-3">
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
  )
}
