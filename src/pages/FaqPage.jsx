import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { FAQ_CATEGORIES, FAQ_GROUPS } from '@/data/faqContent'
import Button from '@/components/ui/Button'
import MiniHowItWorks from '@/components/shared/MiniHowItWorks'

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border border-brand/8 bg-brand-muted/70">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-brand sm:text-[15px]">{item.q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-brand transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open ? (
        <div className="border-t border-brand/8 px-4 pb-4 pt-3 sm:px-5">
          <p className="text-sm leading-relaxed text-slate-body">{item.a}</p>
        </div>
      ) : null}
    </div>
  )
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0])
  const [openKey, setOpenKey] = useState(`${FAQ_CATEGORIES[0]}-0`)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'FAQ | Imperial Co'
    return () => {
      document.title = 'Imperial Co | RLD & Comparator Sourcing'
    }
  }, [])

  const groups = useMemo(() => FAQ_GROUPS, [])

  const scrollToCategory = (category) => {
    setActiveCategory(category)
    const el = document.getElementById(categoryToId(category))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main id="top">
      <section className="container-page pt-8 pb-10 text-center sm:pt-12 sm:pb-14">
        <h1 className="text-[1.75rem] font-extrabold tracking-tight text-brand sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-body sm:text-base">
          Answers about ordering, sourcing, shipping, quality, and pricing for RLD and
          comparator supply with Imperial Co.
        </p>
      </section>

      <section className="container-page pb-14 sm:pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
          <aside className="lg:sticky lg:top-24">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-soft">
              Categories
            </p>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {FAQ_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => scrollToCategory(category)}
                  className={[
                    'whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold',
                    activeCategory === category
                      ? 'bg-brand text-white'
                      : 'bg-brand-muted text-brand',
                  ].join(' ')}
                >
                  {category}
                </button>
              ))}
            </div>

            <nav className="mt-4 hidden flex-col gap-1 lg:flex">
              {FAQ_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => scrollToCategory(category)}
                  className={[
                    'rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
                    activeCategory === category
                      ? 'bg-brand-muted text-brand'
                      : 'text-slate-body hover:bg-brand-muted/70 hover:text-brand',
                  ].join(' ')}
                >
                  {category}
                </button>
              ))}
            </nav>
          </aside>

          <div className="space-y-10">
            {groups.map((group) => (
              <section
                key={group.category}
                id={categoryToId(group.category)}
                className="scroll-mt-28"
              >
                <h2 className="border-b border-brand/10 pb-3 text-lg font-bold text-brand">
                  {group.category}
                </h2>
                <div className="mt-4 space-y-2">
                  {group.items.map((item, index) => {
                    const key = `${group.category}-${index}`
                    return (
                      <FaqItem
                        key={key}
                        item={item}
                        open={openKey === key}
                        onToggle={() =>
                          setOpenKey((prev) => (prev === key ? '' : key))
                        }
                      />
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-14 sm:pb-16">
        <div className="rounded-2xl bg-brand-muted px-6 py-10 text-center sm:px-10">
          <h2 className="text-xl font-bold text-brand sm:text-2xl">
            Still have questions?
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/request-quote">
              <Button size="lg">Contact Us</Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg">
                Search 1000+ Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MiniHowItWorks />
    </main>
  )
}

function categoryToId(category) {
  return `faq-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}
