import { COMPARATOR_SUPPORT } from '@/data/landingContent'
import CheckIcon from '@/components/ui/CheckIcon'
import SectionHeading from '@/components/ui/SectionHeading'

export default function ComparatorSupport() {
  return (
    <section className="container-page pb-16 sm:pb-20">
      <SectionHeading title="Supporting Comparator Sourcing in Development Programs" />
      <ul className="mx-auto mt-8 grid max-w-4xl gap-x-12 gap-y-4 sm:grid-cols-2">
        {COMPARATOR_SUPPORT.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-relaxed text-slate-body sm:text-[15px]"
          >
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
