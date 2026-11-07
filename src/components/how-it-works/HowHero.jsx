import { HOW_HERO } from '@/data/howItWorksContent'

export default function HowHero() {
  return (
    <section className="container-page pt-6 pb-8 sm:pt-8 sm:pb-10">
      <div className="relative overflow-hidden rounded-[28px] bg-brand-soft px-6 py-14 text-center sm:rounded-[36px] sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-glow/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-[2rem] font-extrabold tracking-tight text-brand sm:text-4xl lg:text-[2.75rem]">
            {HOW_HERO.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-body sm:text-base">
            {HOW_HERO.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
