export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignClass =
    align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center mx-auto'

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      <h2 className="text-[1.65rem] font-bold leading-tight tracking-tight text-brand sm:text-3xl lg:text-[2.1rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-[15px] leading-relaxed text-slate-body sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
