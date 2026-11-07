import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function NextStepsCta({
  title = 'Next steps',
  subtitle = 'Request a tailored quote or search the product database for availability.',
  primaryLabel = 'Request a Quote',
  primaryTo = '/request-quote',
  secondaryLabel = 'Search 1000+ Products',
  secondaryTo = '/products',
}) {
  return (
    <section className="container-page pb-14 sm:pb-16">
      <div className="rounded-[28px] bg-brand px-6 py-12 text-center sm:rounded-[36px] sm:px-10 sm:py-14">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-[15px]">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to={primaryTo}>
            <Button variant="white" size="lg">
              {primaryLabel}
            </Button>
          </Link>
          <Link
            to={secondaryTo}
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/70 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
