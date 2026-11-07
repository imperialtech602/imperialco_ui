import {
  Activity,
  AlertCircle,
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  Clock3,
  Factory,
  FileText,
  FlaskConical,
  Globe2,
  Handshake,
  Layers,
  MapPin,
  Microscope,
  Network,
  Package,
  Pill,
  Plane,
  Search,
  Shield,
  Sparkles,
  Thermometer,
  Truck,
  Upload,
  Users,
  Wallet,
} from 'lucide-react'
import shieldCheck from '@/assets/icons/shield-check.svg'
import shieldCheckWhite from '@/assets/icons/shield-check-white.svg'
import thermometerIcon from '@/assets/icons/thermometer-bars.svg'
import fileTextIcon from '@/assets/icons/file-text.svg'
import globeIcon from '@/assets/icons/globe-network.svg'
import globeAltIcon from '@/assets/icons/globe-alt.svg'
import creditCardIcon from '@/assets/icons/credit-card.svg'
import clockCircleIcon from '@/assets/icons/clock-circle.svg'
import alertOctagonIcon from '@/assets/icons/alert-octagon.svg'

const assetMap = {
  'shield-check': shieldCheck,
  'shield-check-white': shieldCheckWhite,
  'thermometer-bars': thermometerIcon,
  'file-text': fileTextIcon,
  'globe-network': globeIcon,
  'globe-alt': globeAltIcon,
  'credit-card': creditCardIcon,
  'clock-circle': clockCircleIcon,
  'alert-octagon': alertOctagonIcon,
}

const lucideMap = {
  globe: Globe2,
  thermometer: Thermometer,
  shield: Shield,
  network: Network,
  'badge-check': BadgeCheck,
  wallet: Wallet,
  clock: Clock3,
  alert: AlertCircle,
  sparkles: Sparkles,
  users: Users,
  building: Building2,
  calendar: CalendarDays,
  flask: FlaskConical,
  pill: Pill,
  microscope: Microscope,
  factory: Factory,
  file: FileText,
  truck: Truck,
  upload: Upload,
  package: Package,
  award: Award,
  handshake: Handshake,
  search: Search,
  layers: Layers,
  plane: Plane,
  'map-pin': MapPin,
  activity: Activity,
}

export default function FeatureIcon({
  name,
  className = 'h-6 w-6',
  strokeWidth = 1.75,
  alt = '',
}) {
  const assetSrc = assetMap[name]
  if (assetSrc) {
    return (
      <img
        src={assetSrc}
        alt={alt}
        aria-hidden={!alt}
        width={40}
        height={40}
        decoding="async"
        className={`block object-contain ${className}`}
        draggable={false}
      />
    )
  }

  const Icon = lucideMap[name] ?? Shield
  return <Icon className={className} strokeWidth={strokeWidth} />
}
