import { MARKET_COVERAGE } from '@/data/sourcingContent'
import SectionHeading from '@/components/ui/SectionHeading'

export default function MarketCoverage() {
  return (
    <section className="container-page pb-14 sm:pb-20">
      <SectionHeading title="SRA-Origin Market Coverage" className="mb-10" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {MARKET_COVERAGE.map((market) => (
          <article
            key={market.agency}
            className="flex flex-col items-center rounded-2xl bg-brand-muted px-3 py-5 text-center"
          >
            <img
              src={market.flag}
              alt={market.flagAlt}
              className="h-8 w-8 object-contain drop-shadow-sm sm:h-9 sm:w-9"
              loading="lazy"
            />
            <p className="mt-3 text-sm font-bold text-brand">{market.agency}</p>
            <p className="mt-1 text-[11px] leading-snug text-slate-soft">
              {market.region}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-center text-xs text-slate-soft sm:text-sm">
        Origin market visibility confirmed at quotation stage.
      </p>
    </section>
  )
}
