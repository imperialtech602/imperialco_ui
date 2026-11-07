import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

const DEFAULT_STEPS = [
  {
    step: 'STEP 1',
    title: 'Share requirements',
    description: 'Share molecule, target market, and timeline.',
  },
  {
    step: 'STEP 2',
    title: 'Evaluate options',
    description: 'We assess sourcing alignment, batch availability, and expiry.',
  },
  {
    step: 'STEP 3',
    title: 'Receive quotation',
    description: 'Quotation with origin market and documentation scope.',
  },
  {
    step: 'STEP 4',
    title: 'Approve & procure',
    description: 'Confirm procurement and shipping conditions.',
  },
  {
    step: 'STEP 5',
    title: 'Receive & document',
    description: 'Product arrives with shipment records and traceability docs.',
  },
]

export default function MiniHowItWorks({ steps = DEFAULT_STEPS }) {
  return (
    <section className="container-page pb-16 sm:pb-20">
      <div className="rounded-[28px] border border-brand/8 bg-white px-5 py-10 sm:rounded-[36px] sm:px-8 sm:py-12 lg:px-10">
        <h2 className="text-center text-2xl font-bold tracking-tight text-brand sm:text-3xl">
          How it works
        </h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {steps.map((step, index) => (
            <li key={step.step} className="relative px-2 text-center lg:px-4">
              {index < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute right-0 top-3 hidden h-10 w-px bg-brand/10 lg:block"
                />
              ) : null}
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand/55">
                {step.step}
              </p>
              <h3 className="mt-2 text-sm font-bold text-brand">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-body sm:text-[13px]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <Link to="/how-it-works">
            <Button variant="outline">Read our full process</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
