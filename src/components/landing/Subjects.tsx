import type { Dictionary } from "@/i18n/get-dictionary";

interface SubjectsProps {
  dictionary: Dictionary["landing"]["subjects"];
}

export function Subjects({ dictionary }: SubjectsProps) {
  return (
    <section id="subjects" className="space-y-10">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--lc-accent)]">
          {dictionary.tag}
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{dictionary.title}</h2>
        <p className="text-base text-white/70 sm:text-lg">{dictionary.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {dictionary.items.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-accent hover:bg-accent-soft"
          >
            <div className="text-3xl">{item.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-white/70">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
