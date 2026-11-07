import { Link } from 'react-router-dom'
import { PROCESS_NAV } from '@/data/howItWorksContent'
import Button from '@/components/ui/Button'

export default function ProcessSummary() {
  return (
    <section className="container-page pb-16 sm:pb-20">
      <div className="rounded-[28px] border border-brand/8 bg-white px-5 py-10 sm:rounded-[36px] sm:px-8 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {PROCESS_NAV.map((item, index) => (
            <div key={item.id} className="text-center lg:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand/50">
                Step {index + 1}
              </p>
              <p className="mt-2 text-sm font-semibold text-brand">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/sourcing">
            <Button variant="outline">View sourcing details</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
