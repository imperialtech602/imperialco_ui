import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import logo from '@/assets/imperial-logo.png'
import { FOOTER_BLURB, FOOTER_COLUMNS } from '@/data/landingContent'

function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  )
}

function LinkedInIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.5 9.5H3.7V20h2.8V9.5zM5.1 4A1.65 1.65 0 1 0 5.1 7.3 1.65 1.65 0 0 0 5.1 4zM20.3 20h-2.8v-5.6c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V20h-2.8s0-8.9 0-10.5h2.8v1.5c.4-.6 1.1-1.7 2.8-1.7 2 0 3.5 1.3 3.5 4.2V20z" />
    </svg>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.96.52 3.8 1.44 5.4L2 22l4.92-1.55a9.86 9.86 0 0 0 5.12 1.4h.01c5.46 0 9.89-4.4 9.89-9.85C21.94 6.4 17.5 2 12.04 2zm5.77 13.99c-.24.68-1.4 1.24-1.94 1.32-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.93-4.36-.14-.2-1.17-1.55-1.17-2.96 0-1.4.73-2.09.99-2.38.26-.28.57-.35.76-.35h.55c.18 0 .41-.06.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.2-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.21 1.36.28.14.44.12.6-.07.17-.2.7-.81.89-1.09.18-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.68-.17 1.36z" />
    </svg>
  )
}

const SOCIAL = [
  { label: 'Facebook', Icon: FacebookIcon, href: '#' },
  { label: 'LinkedIn', Icon: LinkedInIcon, href: '#' },
  { label: 'Email', Icon: Mail, href: 'mailto:quotes@imperialco.com' },
  { label: 'WhatsApp', Icon: WhatsAppIcon, href: '#' },
]

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-brand/5 bg-white">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1.65fr] lg:gap-16">
          <div className="max-w-md">
            <Link to="/">
              <img src={logo} alt="Imperial Co" className="h-11 w-auto object-contain" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-body">{FOOTER_BLURB}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-slate-body transition-colors hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          {SOCIAL.map(({ label, Icon, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand/10 text-brand transition-colors hover:bg-brand hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-brand/5">
        <div className="container-page py-5 text-center text-xs leading-relaxed text-slate-soft">
          <p>
            <Link to="/privacy" className="underline underline-offset-2 hover:text-brand">
              Cookie preferences
            </Link>
            {' · '}© {new Date().getFullYear()} Imperial Co. All rights reserved.
            {' | '}IFZA Business Park, Dubai Silicon Oasis, Dubai, United Arab Emirates
            {' | '}
            <a
              href="https://imperialco.biz"
              className="hover:text-brand"
              target="_blank"
              rel="noreferrer"
            >
              imperialco.biz
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
