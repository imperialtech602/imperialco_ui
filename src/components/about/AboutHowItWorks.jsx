import { Link } from 'react-router-dom'
import { ABOUT_HOW_IT_WORKS } from '@/data/aboutContent'
import Button from '@/components/ui/Button'

export default function AboutHowItWorks() {
  return (
    <section className="container-page pb-16 sm:pb-20">
      <div className="rounded-[28px] border border-brand/8 bg-white px-5 py-10 sm:rounded-[36px] sm:px-8 sm:py-12 lg:px-10">
        <h2 className="text-center text-2xl font-bold tracking-tight text-brand sm:text-3xl">
          How it works
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {ABOUT_HOW_IT_WORKS.map((step, index) => (
            <li key={step.step} className="relative px-2 text-center lg:px-4">
              {index < ABOUT_HOW_IT_WORKS.length - 1 ? (
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
          <Link to="/request-quote">
            <Button variant="outline">Request a Quote</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
