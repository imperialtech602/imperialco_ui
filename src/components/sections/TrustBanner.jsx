import { TRUST_STATS } from '@/data/landingContent'
import FeatureIcon from '@/components/icons/FeatureIcons'

export default function TrustBanner() {
  return (
    <section className="container-page pb-16 sm:pb-20">
      <div className="rounded-[28px] bg-mint px-5 py-10 sm:rounded-[40px] sm:px-8 sm:py-12 lg:px-12">
        <h2 className="mx-auto max-w-2xl text-center text-[1.45rem] font-bold leading-tight tracking-tight text-brand sm:text-3xl">
          Trusted by pharmaceutical leaders.
          <br className="hidden sm:block" /> Delivering results that matter.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {TRUST_STATS.map((stat) => (
            <article
              key={stat.value}
              className="rounded-[28px] bg-white px-5 py-8 text-center shadow-sm shadow-mint-deep/5 sm:rounded-[32px]"
            >
              <div className="mx-auto inline-flex h-10 w-10 items-center justify-center text-brand">
                <FeatureIcon name={stat.icon} className="h-10 w-10" />
              </div>
              <p className="mt-5 text-3xl font-extrabold tracking-tight text-mint-deep sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-ink">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
