const variants = {
  primary:
    'bg-brand text-white hover:bg-brand-dark shadow-sm shadow-brand/20',
  secondary:
    'bg-white text-brand border border-brand/15 hover:border-brand/40 hover:bg-brand-muted',
  outline:
    'bg-transparent text-brand border border-brand hover:bg-brand hover:text-white',
  white: 'bg-white text-brand hover:bg-white/90',
  ghostWhite:
    'bg-transparent text-white border border-white/70 hover:bg-white/10',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-[15px]',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-55',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
