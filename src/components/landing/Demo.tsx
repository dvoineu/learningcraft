import type { Dictionary } from "@/i18n/get-dictionary";

interface DemoProps {
  dictionary: Dictionary["landing"]["demo"];
}

export function Demo({ dictionary }: DemoProps) {
  return (
    <section id="demo" className="space-y-10">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--lc-accent)]">
          {dictionary.tag}
        </p>
        <h2 className="text-3xl font-semibold text-[var(--lc-foreground)] sm:text-4xl">{dictionary.title}</h2>
        <p className="text-base text-[var(--lc-muted)] sm:text-lg">{dictionary.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 rounded-3xl border border-[var(--lc-border)] bg-[var(--lc-surface)] p-6">
          {dictionary.highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="rounded-2xl border border-[var(--lc-border)] bg-[var(--lc-surface-strong)] p-5"
            >
              <h3 className="text-lg font-semibold text-[var(--lc-foreground)]">{highlight.title}</h3>
              <p className="mt-3 text-sm text-[var(--lc-muted)]">{highlight.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-[var(--lc-surface-strong)] to-[var(--lc-background)] p-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[var(--lc-foreground)]">{dictionary.title}</h3>
            <p className="text-sm text-[var(--lc-muted)]">{dictionary.description}</p>
          </div>
          <dl className="grid gap-4">
            {dictionary.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[var(--lc-border)] bg-[var(--lc-surface)] p-4 text-center"
              >
                <dt className="text-xs uppercase tracking-[0.35em] text-[var(--lc-accent)]">{stat.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-[var(--lc-foreground)]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
