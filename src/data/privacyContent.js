export const PRIVACY_HERO = {
  title: 'Privacy policy & cookies',
  subtitle:
    'What Imperial Co collects, how we use it, how we share it, and what choices you have.',
}

export const PRIVACY_SECTIONS = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    paragraphs: [
      'Imperial Co provides comparator and Reference Listed Drug (RLD) sourcing, documentation support, and temperature-controlled logistics for regulated pharmaceutical development programs.',
      'This policy explains how we process personal data when you use our website, request a quote, or otherwise contact our team.',
    ],
  },
  {
    id: 'how-site-built',
    title: 'How the site is built',
    paragraphs: [
      'Our public website is a React application delivered through modern web hosting. Forms and catalog features may send data to our systems (and later to our Node API) so we can respond to sourcing requests.',
      'We aim to collect only what is needed to operate the site, improve reliability, and fulfill quote or support inquiries.',
    ],
  },
  {
    id: 'information-we-process',
    title: 'Information we may process',
    paragraphs: [
      'Depending on how you use the site, we may process:',
    ],
    bullets: [
      'Contact details you submit (name, email, phone, company, job title, country)',
      'RFQ and product requirement details (molecule lists, quantities, timelines, attachments)',
      'Technical logs such as IP address, browser type, device information, and pages visited',
      'Cookie / analytics identifiers used to understand site performance and usage',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How we use information',
    paragraphs: [
      'We use personal data to respond to quote requests, communicate about sourcing options, improve site experience, secure our services, and meet legal or compliance obligations.',
    ],
  },
  {
    id: 'sharing',
    title: 'How we share information',
    paragraphs: [
      'We do not sell personal data. We may share information with trusted service providers who help us host, secure, analyze, or operate the website and with logistics or documentation partners only as needed to fulfill a request you initiate.',
      'We may also disclose information if required by law or to protect rights, safety, and integrity of our services.',
    ],
  },
  {
    id: 'your-choices',
    title: 'Your choices',
    paragraphs: [
      'You can request access, correction, or deletion of personal data you have provided, subject to applicable law and operational needs related to active orders or compliance records.',
      'You can also manage non-essential cookies through your browser settings or our cookie preferences controls when available.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    paragraphs: [
      'Cookies and similar technologies help the site function, remember preferences, and measure performance. Essential cookies are required for core functionality. Analytics cookies help us understand how visitors use the site so we can improve it.',
    ],
  },
]

export const THIRD_PARTY_SERVICES = [
  {
    service: 'Cloudflare',
    role: 'Security / CDN',
    personalData: 'IP address, request metadata',
  },
  {
    service: 'Hosting provider',
    role: 'Website hosting',
    personalData: 'Server logs, IP address',
  },
  {
    service: 'Google Fonts',
    role: 'Typography delivery',
    personalData: 'IP address (on font request)',
  },
  {
    service: 'Analytics (planned)',
    role: 'Usage measurement',
    personalData: 'Pseudonymous usage identifiers',
  },
]
