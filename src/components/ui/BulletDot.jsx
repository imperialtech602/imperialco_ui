export default function BulletDot({ className = '' }) {
  return (
    <span
      aria-hidden
      className={`mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand ${className}`}
    />
  )
}
