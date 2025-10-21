import type { Dictionary } from "@/i18n/get-dictionary";

interface FAQProps {
  dictionary: Dictionary["landing"]["faq"];
}

export function FAQ({ dictionary }: FAQProps) {
  return (
    <section id="faq" className="space-y-10">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-300">
          {dictionary.tag}
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{dictionary.title}</h2>
        <p className="text-base text-white/70 sm:text-lg">{dictionary.description}</p>
      </div>

      <div className="space-y-4">
        {dictionary.items.map((item) => (
          <details
            key={item.question}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40 hover:bg-emerald-400/5"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-white">
              <span>{item.question}</span>
              <span className="text-emerald-300 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-sm text-white/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
