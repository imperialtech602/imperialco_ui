import { ABOUT_MILESTONES } from '@/data/aboutContent'
import FeatureIcon from '@/components/icons/FeatureIcons'

export default function AboutMilestones() {
  return (
    <section className="container-page pb-14 sm:pb-20">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {ABOUT_MILESTONES.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl bg-brand-muted px-4 py-6 text-center sm:rounded-[22px] sm:px-5 sm:py-8"
          >
            <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm shadow-brand/5">
              <FeatureIcon name={item.icon} className="h-5 w-5" />
            </div>
            <p className="mt-4 text-2xl font-extrabold tracking-tight text-brand sm:text-3xl">
              {item.value}
            </p>
            <p className="mt-1.5 text-xs text-slate-body sm:text-sm">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
