import { SOURCING_HERO } from '@/data/sourcingContent'

export default function SourcingHero() {
  return (
    <section className="container-page pt-6 pb-10 sm:pt-8 sm:pb-14">
      <div className="relative overflow-hidden rounded-[28px] bg-brand-soft px-6 py-14 text-center sm:rounded-[36px] sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-glow/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-brand sm:text-4xl lg:text-[2.55rem]">
            {SOURCING_HERO.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-body sm:text-base">
            {SOURCING_HERO.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
