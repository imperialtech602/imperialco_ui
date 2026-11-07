const boxedCta = {
  type: 'cta',
  ctaVariant: 'boxed',
  cta: {
    headline: 'Planning an ANDA or BE Study?',
    body: '',
    bullets: [
      'Identify suitable RLDs / comparators',
      'Confirm origin & availability',
      'Plan documentation & logistics',
    ],
    buttons: [
      { label: 'Get Started Now', to: '/request-quote' },
      { label: 'Learn More', to: '/how-it-works' },
    ],
  },
}

const bannerCta = {
  type: 'cta',
  ctaVariant: 'banner',
  cta: {
    headline: 'Looking for specific comparators?',
    body: 'Search our catalog or speak with the sourcing team.',
    bullets: [],
    buttons: [
      { label: 'Search Database', to: '/products' },
      { label: 'Contact Us', to: '/request-quote' },
    ],
  },
}

const mainSection = { type: 'text', heading: '', body: '' }

export const STARTER_TEMPLATES = [
  {
    key: 'boxed',
    title: 'Boxed CTA',
    description: 'A main section, then a boxed call to action.',
    ctaBases: ['boxed'],
    blocks: [mainSection, structuredClone(boxedCta)],
  },
  {
    key: 'banner',
    title: 'Banner CTA',
    description: 'A main section, then a full-width banner call to action.',
    ctaBases: ['banner'],
    blocks: [mainSection, structuredClone(bannerCta)],
  },
  {
    key: 'both',
    title: 'Boxed and banner',
    description: 'Main section, boxed CTA, another section, then a banner CTA.',
    ctaBases: ['boxed', 'banner'],
    blocks: [
      mainSection,
      structuredClone(boxedCta),
      { type: 'text', heading: '', body: '' },
      structuredClone(bannerCta),
    ],
  },
]
