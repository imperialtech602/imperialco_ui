import SectionHeading from '@/components/ui/SectionHeading'

export default function RoleClarityBlock({
  text = 'Imperial Co operates as a sourcing and logistics partner. We do not provide regulatory consulting, filing advice, or guarantees of regulatory acceptance. All products are supplied for regulated development and study use in accordance with client-defined requirements.',
}) {
  return (
    <section className="container-page pb-14 sm:pb-20">
      <SectionHeading title="Role clarity" className="mb-8" />
      <div className="rounded-2xl bg-brand-muted px-6 py-8 text-center sm:rounded-[28px] sm:px-10 sm:py-10">
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-body sm:text-[15px]">
          {text}
        </p>
      </div>
    </section>
  )
}
