import { TIMELINE } from '@/data/howItWorksContent'
import SectionHeading from '@/components/ui/SectionHeading'

export default function TypicalTimeline() {
  return (
    <section className="container-page pb-14 sm:pb-20">
      <SectionHeading
        title="Typical Timeline"
        subtitle="Indicative timing for standard comparator / RLD requests. Complex or scarce products may vary."
        className="mb-10"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TIMELINE.map((item) => (
          <article
            key={item.period}
            className="rounded-2xl bg-brand-muted p-5 sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand/55">
              {item.period}
            </p>
            <h3 className="mt-3 text-base font-bold text-brand">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-body">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
