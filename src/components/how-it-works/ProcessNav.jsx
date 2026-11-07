import { PROCESS_NAV } from '@/data/howItWorksContent'

export default function ProcessNav() {
  return (
    <section className="container-page pb-10 sm:pb-16">
      <div className="rounded-[22px] bg-brand px-3 py-4 sm:rounded-[28px] sm:px-6 sm:py-6">
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2">
          {PROCESS_NAV.map((item, index) => (
            <li key={item.id} className="relative flex lg:flex-col lg:items-center lg:text-center">
              {index < PROCESS_NAV.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-[calc(50%+22px)] right-[calc(-50%+22px)] top-5 hidden h-px bg-white/25 lg:block"
                />
              ) : null}
              <a
                href={`#${item.id}`}
                className="relative z-10 flex w-full items-center gap-3 rounded-xl px-2 py-2 text-white transition-opacity hover:opacity-90 lg:flex-col lg:gap-2.5 lg:px-1"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/40 bg-brand text-sm font-bold sm:h-10 sm:w-10">
                  {index + 1}
                </span>
                <span className="text-left text-sm font-semibold leading-snug lg:max-w-[110px] lg:text-center lg:text-[11px] xl:text-xs">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
