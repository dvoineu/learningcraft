import type { Dictionary } from "@/shared/i18n/get-dictionary";

interface FAQProps {
  dictionary: Dictionary["landing"]["faq"];
}

export function FAQ({ dictionary }: FAQProps) {
  return (
    <section id="faq" className="space-y-10">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--lc-accent)]">
          {dictionary.tag}
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{dictionary.title}</h2>
        <p className="text-base text-white/70 sm:text-lg">{dictionary.description}</p>
      </div>

      <div className="space-y-4">
        {dictionary.items.map((item) => (
          <details
            key={item.question}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-accent hover:bg-accent-soft"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-white">
              <span>{item.question}</span>
              <span className="text-[var(--lc-accent)] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-sm text-white/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
