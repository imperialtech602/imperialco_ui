import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  PRIVACY_HERO,
  PRIVACY_SECTIONS,
  THIRD_PARTY_SERVICES,
} from '@/data/privacyContent'
import Button from '@/components/ui/Button'
import MiniHowItWorks from '@/components/shared/MiniHowItWorks'

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Privacy Policy & Cookies | Imperial Co'
    return () => {
      document.title = 'Imperial Co | RLD & Comparator Sourcing'
    }
  }, [])

  return (
    <main id="top">
      <section className="container-page pt-8 pb-10 text-center sm:pt-12 sm:pb-14">
        <h1 className="text-[1.75rem] font-extrabold tracking-tight text-brand sm:text-4xl">
          {PRIVACY_HERO.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-body sm:text-base">
          {PRIVACY_HERO.subtitle}
        </p>
      </section>

      <section className="container-page max-w-3xl pb-10 sm:pb-14">
        <div className="space-y-10">
          {PRIVACY_SECTIONS.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-xl font-bold text-brand sm:text-[1.35rem]">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-sm leading-relaxed text-slate-body sm:text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-body sm:text-[15px]">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}

          <div className="rounded-2xl bg-brand-soft px-5 py-6 text-left sm:px-7">
            <h3 className="text-base font-bold text-brand">Cookie preferences</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-body">
              You can review or update non-essential cookie choices in your browser
              settings. Site-level cookie controls will be available here once analytics
              is connected.
            </p>
            <button
              type="button"
              className="mt-4 text-sm font-semibold text-brand underline underline-offset-2"
              onClick={() =>
                window.alert(
                  'Cookie settings panel will be connected when analytics is enabled.',
                )
              }
            >
              Open cookie settings
            </button>
          </div>

          <article id="third-parties">
            <h2 className="text-xl font-bold text-brand sm:text-[1.35rem]">
              Third-party services (summary)
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-body sm:text-[15px]">
              Depending on configuration, the site may rely on the following categories of
              providers:
            </p>

            <div className="mt-5 overflow-x-auto rounded-xl border border-brand/10">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-brand-muted text-xs font-bold uppercase tracking-wide text-slate-soft">
                  <tr>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Personal data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand/8 bg-white">
                  {THIRD_PARTY_SERVICES.map((row) => (
                    <tr key={row.service}>
                      <td className="px-4 py-3 font-semibold text-brand">{row.service}</td>
                      <td className="px-4 py-3 text-slate-body">{row.role}</td>
                      <td className="px-4 py-3 text-slate-body">{row.personalData}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article>
            <h2 className="text-xl font-bold text-brand sm:text-[1.35rem]">Contact</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-body sm:text-[15px]">
              For privacy questions, email{' '}
              <a
                href="mailto:privacy@imperialco.com"
                className="font-semibold text-brand underline underline-offset-2"
              >
                privacy@imperialco.com
              </a>{' '}
              or submit a request through our{' '}
              <Link
                to="/request-quote"
                className="font-semibold text-brand underline underline-offset-2"
              >
                contact / quote form
              </Link>
              .
            </p>
            <div className="mt-6">
              <Link to="/request-quote">
                <Button>Contact Us</Button>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <MiniHowItWorks />
    </main>
  )
}
