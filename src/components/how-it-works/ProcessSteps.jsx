import { PROCESS_STEPS } from '@/data/howItWorksContent'
import StepVisual from '@/components/how-it-works/StepVisual'
import BulletDot from '@/components/ui/BulletDot'

export default function ProcessSteps() {
  return (
    <section className="container-page pb-16 sm:pb-24">
      <div className="space-y-16 sm:space-y-24">
        {PROCESS_STEPS.map((step, index) => {
          const reverse = index % 2 === 1

          return (
            <article
              key={step.id}
              id={step.id}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div className={reverse ? 'lg:order-2' : undefined}>
                <p
                  aria-hidden
                  className="select-none text-[4.5rem] font-extrabold leading-none tracking-tight text-[#E8E9F0] sm:text-[6.5rem]"
                >
                  {step.number}
                </p>

                <h2 className="-mt-3 text-[1.65rem] font-bold tracking-tight text-brand sm:-mt-4 sm:text-[2rem]">
                  {step.title}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-body sm:text-[15px]">
                  {step.description}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {step.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm text-slate-body sm:text-[15px]"
                    >
                      <BulletDot />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={reverse ? 'lg:order-1' : undefined}>
                <StepVisual icon={step.icon} />
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
