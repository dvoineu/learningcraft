import type { Dictionary } from "@/i18n/get-dictionary";

interface TestimonialsProps {
  dictionary: Dictionary["landing"]["testimonials"];
}

export function Testimonials({ dictionary }: TestimonialsProps) {
  return (
    <section id="testimonials" className="space-y-10">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-300">
          {dictionary.tag}
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{dictionary.title}</h2>
        <p className="text-base text-white/70 sm:text-lg">{dictionary.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {dictionary.items.map((item) => (
          <figure
            key={item.name}
            className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-sm"
          >
            <blockquote className="text-sm text-white/80">{item.quote}</blockquote>
            <figcaption className="mt-5 space-y-1 text-sm">
              <p className="font-semibold text-white">{item.name}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{item.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
