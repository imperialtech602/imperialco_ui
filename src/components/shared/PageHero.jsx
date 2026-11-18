export default function PageHero({ title, subtitle }) {
  return (
    <section className="container-page pt-6 pb-10 sm:pt-8 sm:pb-14">
      <div className="relative overflow-hidden rounded-[24px] bg-brand-soft px-5 py-8 text-center sm:rounded-[36px] sm:px-12 sm:py-20 lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-brand-glow/15 blur-3xl sm:h-64 sm:w-64"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-brand/10 blur-3xl sm:h-72 sm:w-72"
        />
        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-[1.5rem] font-extrabold leading-[1.15] tracking-tight text-brand sm:text-4xl lg:text-[2.45rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-body sm:mt-5 sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
