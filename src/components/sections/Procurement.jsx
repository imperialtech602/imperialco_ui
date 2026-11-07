import valueMesh from '@/assets/value-mesh.png'
import { PROCUREMENT_POINTS } from '@/data/landingContent'
import CheckIcon from '@/components/ui/CheckIcon'

export default function Procurement() {
  return (
    <section className="container-page pb-16 sm:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_452px] lg:gap-14">
        <div>
          <h2 className="max-w-md text-[1.75rem] font-bold leading-tight tracking-tight text-brand sm:text-3xl lg:text-[2.15rem]">
            Everything you need. Comparator procurement from one source.
          </h2>
          <ul className="mt-8 space-y-3.5">
            {PROCUREMENT_POINTS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-slate-body sm:text-[15px]"
              >
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          aria-hidden
          className="relative mx-auto aspect-[452/705] w-full max-w-[452px] overflow-hidden rounded-[40px] lg:aspect-auto lg:h-[705px] lg:w-[452px]"
        >
          <img
            src={valueMesh}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
