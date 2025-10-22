import Link from "next/link";

import type { Dictionary } from "@/i18n/get-dictionary";

interface SocialProofProps {
  dictionary: Dictionary["landing"]["socialProof"];
}

export function SocialProof({ dictionary }: SocialProofProps) {
  return (
    <section id="social-proof" className="space-y-10">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--lc-accent)]">
          {dictionary.tag}
        </p>
        <h2 className="text-3xl font-semibold text-[var(--lc-foreground)] sm:text-4xl">{dictionary.title}</h2>
        <p className="text-base text-[var(--lc-muted)] sm:text-lg">{dictionary.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="grid gap-6 sm:grid-cols-3">
          {dictionary.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-[var(--lc-border)] bg-[var(--lc-surface)] p-6 text-center shadow-sm transition hover:border-accent hover:bg-accent-soft"
            >
              <p className="text-3xl font-semibold text-[var(--lc-foreground)] sm:text-4xl">{metric.value}</p>
              <p className="mt-2 text-sm text-[var(--lc-muted)]">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-[var(--lc-border)] bg-[var(--lc-surface)] p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--lc-muted)]">Партнёры</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {dictionary.logos.map((logo) => (
                <div
                  key={logo.name}
                  className="flex h-16 flex-col items-center justify-center rounded-2xl border border-[var(--lc-border)] bg-[var(--lc-surface-strong)] text-center"
                >
                  <span className="text-sm font-semibold text-[var(--lc-foreground)]">{logo.initials}</span>
                  <span className="text-[11px] text-[var(--lc-muted)]">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {dictionary.press.map((mention) => (
              <figure
                key={mention.source}
                className="rounded-3xl border border-[var(--lc-border)] bg-[var(--lc-surface-strong)] p-6 shadow-sm transition hover:border-accent hover:bg-accent-soft"
              >
                <blockquote className="text-sm text-[var(--lc-muted)]">{mention.quote}</blockquote>
                <figcaption className="mt-3 text-xs uppercase tracking-[0.25em] text-[var(--lc-muted)]">
                  {mention.href ? (
                    <Link href={mention.href} target="_blank" className="transition hover:text-accent">
                      {mention.source}
                    </Link>
                  ) : (
                    mention.source
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
