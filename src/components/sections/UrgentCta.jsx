import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function UrgentCta() {
  return (
    <section className="container-page pb-16 sm:pb-20">
      <div className="rounded-[28px] bg-brand px-6 py-12 text-center sm:rounded-[40px] sm:px-10 sm:py-14">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[2.1rem]">
          Need a comparator or RLD urgently?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-[15px]">
          Upload your list and target market, and we’ll confirm availability and
          timelines.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/request-quote">
            <Button variant="white" size="lg">
              Request a Quote
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="ghostWhite" size="lg">
              Search 1000+ Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
