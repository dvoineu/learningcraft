import Link from "next/link";

import type { Dictionary } from "@/shared/i18n/get-dictionary";
import type { Locale } from "@/shared/i18n/config";

import { resolveHref } from "./utils";

interface HowItWorksProps {
  locale: Locale;
  dictionary: Dictionary["landing"]["howItWorks"];
}

export function HowItWorks({ locale, dictionary }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="space-y-10">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--lc-accent)]">
          {dictionary.tag}
        </p>
        <h2 className="text-3xl font-semibold text-[var(--lc-foreground)] sm:text-4xl">{dictionary.title}</h2>
        <p className="text-base text-[var(--lc-muted)] sm:text-lg">{dictionary.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {dictionary.steps.map((step) => (
          <div
            key={step.label}
            className="rounded-3xl border border-[var(--lc-border)] bg-[var(--lc-surface)] p-6 shadow-sm transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--lc-accent)]">
              {step.label}
            </span>
            <h3 className="mt-3 text-xl font-semibold text-[var(--lc-foreground)]">{step.title}</h3>
            <p className="mt-3 text-sm text-[var(--lc-muted)]">{step.description}</p>
            <dl className="mt-5 space-y-1 text-xs text-[var(--lc-muted)]">
              <div className="flex items-center justify-between">
                <dt className="uppercase tracking-[0.3em]">Time</dt>
                <dd>{step.duration}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="uppercase tracking-[0.3em]">Result</dt>
                <dd>{step.result}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href={resolveHref(locale, dictionary.cta.href)}
          className="inline-flex items-center justify-center rounded-full border border-[var(--lc-border)] px-6 py-3 text-sm font-medium text-[var(--lc-muted)] transition hover:border-emerald-400/60 hover:text-[var(--lc-foreground)]"
        >
          {dictionary.cta.label}
        </Link>
      </div>
    </section>
  );
}
