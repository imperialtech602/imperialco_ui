const icons = {
  upload: (
    <svg viewBox="0 0 120 120" fill="none" className="h-[5.5rem] w-[5.5rem] sm:h-28 sm:w-28" aria-hidden>
      <rect
        x="24"
        y="24"
        width="72"
        height="72"
        rx="16"
        stroke="currentColor"
        strokeWidth="8"
      />
      <path
        d="M43 58l17-19 17 19"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="60"
        y1="52"
        x2="60"
        y2="84"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="11 12"
      />
    </svg>
  ),
  'badge-check': (
    <svg viewBox="0 0 120 120" fill="none" className="h-[5.5rem] w-[5.5rem] sm:h-28 sm:w-28" aria-hidden>
      <circle cx="60" cy="60" r="34" stroke="currentColor" strokeWidth="7" />
      <path
        d="M44 61l10 10 22-24"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 20l6 12 13 2-10 9 3 13-12-6-12 6 3-13-10-9 13-2 6-12z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 120 120" fill="none" className="h-[5.5rem] w-[5.5rem] sm:h-28 sm:w-28" aria-hidden>
      <path
        d="M38 28h34l20 20v44a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8V36a8 8 0 0 1 8-8z"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path d="M72 28v20h20" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
      <path d="M46 62h28M46 76h20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 120 120" fill="none" className="h-[5.5rem] w-[5.5rem] sm:h-28 sm:w-28" aria-hidden>
      <rect x="24" y="36" width="72" height="50" rx="10" stroke="currentColor" strokeWidth="7" />
      <path d="M24 52h72" stroke="currentColor" strokeWidth="7" />
      <circle cx="78" cy="68" r="5" fill="currentColor" />
    </svg>
  ),
  package: (
    <svg viewBox="0 0 120 120" fill="none" className="h-[5.5rem] w-[5.5rem] sm:h-28 sm:w-28" aria-hidden>
      <path
        d="M60 24l36 20v32L60 96 24 76V44L60 24z"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path d="M60 56v40M24 44l36 20 36-20" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
    </svg>
  ),
}

export default function StepVisual({ icon }) {
  return (
    <div className="flex aspect-[5/4] w-full items-center justify-center rounded-[28px] bg-[#F3F4F8] sm:aspect-square sm:rounded-[36px]">
      <div className="text-brand">{icons[icon] ?? icons.upload}</div>
    </div>
  )
}
