import checkIcon from '@/assets/icons/check.png'

export default function CheckIcon({ className = '' }) {
  return (
    <img
      src={checkIcon}
      alt=""
      aria-hidden
      draggable={false}
      className={`mt-0.5 h-4 w-4 shrink-0 object-contain ${className}`}
    />
  )
}
