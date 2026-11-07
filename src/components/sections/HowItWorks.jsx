import { Link } from 'react-router-dom'
import { HOW_IT_WORKS } from '@/data/landingContent'
import Button from '@/components/ui/Button'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="container-page pb-16 sm:pb-20">
      <div className="rounded-[28px] border border-brand/8 bg-white px-5 py-10 sm:rounded-[40px] sm:px-8 sm:py-12 lg:px-10">
        <h2 className="text-center text-2xl font-bold tracking-tight text-brand sm:text-3xl">
          How it works
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.step} className="px-1 text-left lg:text-center">
              <p className="text-sm font-bold text-brand">{step.step}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-body sm:text-[13px] lg:text-sm">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Link to="/how-it-works">
            <Button variant="outline">Read our full process.</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
