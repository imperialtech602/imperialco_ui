import { OUR_STORY } from '@/data/aboutContent'

export default function OurStory() {
  return (
    <section className="container-page pb-14 sm:pb-20">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="text-[1.75rem] font-bold tracking-tight text-brand sm:text-3xl">
            {OUR_STORY.title}
          </h2>
          <div className="mt-6 space-y-4">
            {OUR_STORY.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-sm leading-relaxed text-slate-body sm:text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <aside className="rounded-[28px] bg-brand p-7 text-white sm:rounded-[32px] sm:p-9 lg:mt-2">
          <p className="text-lg font-semibold leading-snug sm:text-xl sm:leading-relaxed">
            “{OUR_STORY.quote}”
          </p>
          <p className="mt-8 text-sm font-medium text-white/70">
            {OUR_STORY.attribution}
          </p>
        </aside>
      </div>
    </section>
  )
}
