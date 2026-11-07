import flagUs from '@/assets/flags/us.png'
import flagUk from '@/assets/flags/uk.png'
import flagEu from '@/assets/flags/eu.png'
import flagCa from '@/assets/flags/ca.png'
import flagAu from '@/assets/flags/au.png'
import flagNz from '@/assets/flags/nz.png'
import flagJp from '@/assets/flags/jp.png'

export const SOURCING_HERO = {
  title: 'Comparator & Reference Listed Drug (RLD) Sourcing for Regulated Development',
  subtitle:
    'Structured sourcing of SRA-origin RLDs and comparator products for bioequivalence (BE) and ANDA pathways.',
}

export const MARKET_COVERAGE = [
  { agency: 'FDA', region: 'United States', flag: flagUs, flagAlt: 'United States flag' },
  { agency: 'MHRA', region: 'United Kingdom', flag: flagUk, flagAlt: 'United Kingdom flag' },
  { agency: 'EMA', region: 'European Union', flag: flagEu, flagAlt: 'European Union flag' },
  { agency: 'Health Canada', region: 'Canada', flag: flagCa, flagAlt: 'Canada flag' },
  { agency: 'TGA', region: 'Australia', flag: flagAu, flagAlt: 'Australia flag' },
  { agency: 'Medsafe', region: 'New Zealand', flag: flagNz, flagAlt: 'New Zealand flag' },
  { agency: 'PMDA', region: 'Japan', flag: flagJp, flagAlt: 'Japan flag' },
]

export const SCOPE_CARDS = [
  {
    title: 'What We Source',
    icon: 'search',
    items: [
      'FDA-designated Reference Listed Drugs (RLDs)',
      'Comparator products for BE / clinical programs',
      'Representative commercial batches',
      'Hard-to-source strengths and pack sizes',
    ],
  },
  {
    title: 'Development-Aware Sourcing Approach',
    icon: 'network',
    items: [
      'Target submission market alignment',
      'Reference product designation awareness',
      'Batch suitability and shelf-life considerations',
      'Storage condition and handling requirements',
    ],
  },
]

export const ROLE_CLARITY =
  'Imperial Co operates as a sourcing and supply partner. We do not provide regulatory consulting or substitute for your regulatory counsel — we focus on authentic product access, documentation, and controlled logistics.'

export const SOURCING_CTA = {
  title: 'Next steps.',
  subtitle:
    'Search our catalog or submit a custom sourcing request for your specific RLD or comparator requirements.',
  primaryLabel: 'Request a Quote',
  secondaryLabel: 'Search Catalog',
}

export const SOURCING_STEPS = [
  {
    step: 'STEP 1',
    title: 'Submit inquiry',
    description: 'Share product, strength, quantity, and study timeline.',
  },
  {
    step: 'STEP 2',
    title: 'Source & verify',
    description: 'We identify authentic RLD / comparator options.',
  },
  {
    step: 'STEP 3',
    title: 'Quote preparation',
    description: 'Transparent pricing with lead time and docs list.',
  },
  {
    step: 'STEP 4',
    title: 'Confirm & procure',
    description: 'Secure allocation and initiate controlled logistics.',
  },
  {
    step: 'STEP 5',
    title: 'Deliver & document',
    description: 'Ship with chain-of-custody and batch records.',
  },
]
