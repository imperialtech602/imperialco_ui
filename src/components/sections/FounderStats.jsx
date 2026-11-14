import { FOUNDER_COPY, FOUNDER_STATS } from '@/data/landingContent'
import FeatureIcon from '@/components/icons/FeatureIcons'

export default function FounderStats() {
  return (
    <section className="container-page pb-14 sm:pb-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <h2 className="max-w-md text-[1.75rem] font-bold leading-tight tracking-tight text-brand sm:text-3xl lg:text-[2.1rem]">
            {FOUNDER_COPY.title}
          </h2>
          {FOUNDER_COPY.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 max-w-xl text-sm leading-relaxed text-slate-body sm:text-[15px]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {FOUNDER_STATS.map((stat) => (
            <article
              key={stat.value}
              className="rounded-[28px] bg-brand px-5 py-6 text-white sm:rounded-[32px] sm:px-5 sm:py-7"
            >
             
              <p className="mt-8 text-[1.35rem] font-extrabold tracking-tight sm:text-[1.5rem]">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-white/70 sm:text-sm">
                {stat.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
