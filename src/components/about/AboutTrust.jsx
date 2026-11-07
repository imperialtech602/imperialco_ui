import { ABOUT_TRUST, ABOUT_TESTIMONIALS } from '@/data/aboutContent'
import SectionHeading from '@/components/ui/SectionHeading'

export default function AboutTrust() {
  return (
    <section className="container-page pb-14 sm:pb-20">
      <SectionHeading
        title={ABOUT_TRUST.title}
        subtitle={ABOUT_TRUST.subtitle}
        className="mb-10"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {ABOUT_TRUST.stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-brand/8 bg-white px-5 py-7 text-center shadow-sm shadow-brand/5"
          >
            <p className="text-3xl font-extrabold tracking-tight text-brand">
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-soft">
              {stat.label}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {ABOUT_TESTIMONIALS.map((item) => (
          <article
            key={item.name}
            className="flex flex-col rounded-2xl border border-brand/8 bg-white p-6 sm:p-7"
          >
            <p className="text-4xl font-serif leading-none text-brand/25">“</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-body sm:text-[15px]">
              {item.quote}
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-brand/5 pt-5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {item.initials}
              </span>
              <div>
                <p className="text-sm font-bold text-brand">{item.name}</p>
                <p className="text-xs text-slate-soft">{item.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
