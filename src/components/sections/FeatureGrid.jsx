import { FEATURE_CARDS } from '@/data/landingContent'
import FeatureIcon from '@/components/icons/FeatureIcons'

export default function FeatureGrid() {
  return (
    <section id="products" className="container-page pb-14 sm:pb-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURE_CARDS.map((card) => (
          <article
            key={card.title}
            className="rounded-2xl bg-brand-muted px-7 pb-7 pt-7 transition-transform duration-300 hover:-translate-y-0.5 sm:px-7 sm:pb-8 sm:pt-7"
          >
            <FeatureIcon
              name={card.icon}
              className="h-10 w-10 text-brand"
              strokeWidth={1.75}
            />
            <h3 className="mt-5 text-[15px] font-bold leading-snug text-brand sm:text-base">
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
