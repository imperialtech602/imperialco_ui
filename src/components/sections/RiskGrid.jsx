import { RISK_CARDS } from '@/data/landingContent'
import FeatureIcon from '@/components/icons/FeatureIcons'
import SectionHeading from '@/components/ui/SectionHeading'

export default function RiskGrid() {
  const [featured, ...rest] = RISK_CARDS
  const [secondary, ...bottom] = rest

  return (
    <section className="container-page pb-16 sm:pb-24">
      <SectionHeading
        title="You’re not optimizing for price. You’re eliminating risk."
        subtitle="Every RLD purchase carries critical authenticity, timeline, and regulatory risk. We eliminate all three."
        className="mb-10 max-w-3xl"
        align="left"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="relative overflow-hidden rounded-[24px] bg-brand text-white lg:col-span-2">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-glow/40 blur-2xl"
          />
          <div className="relative px-7 pb-8 pt-7 sm:px-8 sm:pb-10 sm:pt-7">
            <FeatureIcon
              name={featured.icon}
              className="h-10 w-10 text-white"
              strokeWidth={1.75}
            />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
              {featured.category}
            </p>
            <h3 className="mt-2 max-w-md text-2xl font-bold leading-snug sm:text-[1.7rem]">
              {featured.title}
            </h3>
            {featured.description ? (
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-[15px]">
                {featured.description}
              </p>
            ) : null}
          </div>
        </article>

        <article className="rounded-[24px] bg-brand-muted px-7 pb-8 pt-7 sm:px-8 sm:pb-9 sm:pt-7">
          <FeatureIcon
            name={secondary.icon}
            className="h-10 w-10 text-brand"
            strokeWidth={1.75}
          />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-soft">
            {secondary.category}
          </p>
          <h3 className="mt-2 text-lg font-bold leading-snug text-brand sm:text-xl">
            {secondary.title}
          </h3>
          {secondary.description ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-body">
              {secondary.description}
            </p>
          ) : null}
        </article>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {bottom.map((card) => (
          <article
            key={card.title}
            className="rounded-[24px] bg-brand-muted px-7 pb-8 pt-7 sm:px-8 sm:pb-9 sm:pt-7"
          >
            <FeatureIcon
              name={card.icon}
              className="h-10 w-10 text-brand"
              strokeWidth={1.75}
            />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-soft">
              {card.category}
            </p>
            <h3 className="mt-2 text-lg font-bold leading-snug text-brand sm:text-xl">
              {card.title}
            </h3>
            {card.description ? (
              <p className="mt-2 text-sm leading-relaxed text-slate-body">
                {card.description}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
