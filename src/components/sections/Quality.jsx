import { QUALITY_POINTS } from '@/data/landingContent'
import FeatureIcon from '@/components/icons/FeatureIcons'

export default function Quality() {
  return (
    <section id="quality" className="container-page pb-16 sm:pb-24">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="max-w-md text-[1.75rem] font-bold leading-tight tracking-tight text-brand sm:text-3xl lg:text-[2.1rem]">
            Strict quality, traceability, and temperature-control standards.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-body sm:text-[15px]">
          Handling aligned with labeled storage. Traceability from source to delivery. Batch and expiry visibility with every shipment.
          </p>
        </div>

        <ul className="space-y-3">
          {QUALITY_POINTS.map((item) => (
            <li
              key={item.title}
              className="flex items-center gap-4 rounded-full bg-brand-muted px-5 py-4"
            >
              <FeatureIcon name={item.icon} className="h-10 w-10 shrink-0 text-brand" />
              <span className="text-sm font-semibold leading-snug text-brand sm:text-[15px]">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
