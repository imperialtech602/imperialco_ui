import { ABOUT_VALUES } from '@/data/aboutContent'
import FeatureIcon from '@/components/icons/FeatureIcons'
import SectionHeading from '@/components/ui/SectionHeading'

export default function AboutValues() {
  return (
    <section className="container-page pb-14 sm:pb-20">
      <SectionHeading title="What drives everything we do" className="mb-10" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ABOUT_VALUES.map((value) => (
          <article
            key={value.title}
            className="rounded-2xl bg-brand-muted p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-7"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm shadow-brand/5">
              <FeatureIcon name={value.icon} className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-[15px] font-bold text-brand sm:text-base">
              {value.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-body">
              {value.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
