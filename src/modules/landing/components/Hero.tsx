import Link from "next/link";

import type { Locale } from "@/shared/i18n/config";
import type { Dictionary } from "@/shared/i18n/get-dictionary";

import { resolveHref } from "./utils";

interface HeroProps {
  dictionary: {
    hero: Dictionary["landing"]["hero"];
    preview: Dictionary["landing"]["preview"];
  };
  locale: Locale;
}

export function Hero({ dictionary, locale }: HeroProps) {
  const { hero, preview } = dictionary;

  return (
    <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent-soft px-4 py-1 text-sm text-accent">
          <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
          {hero.badge}
        </div>
        <h1 className="text-4xl font-semibold leading-tight text-[var(--lc-foreground)] sm:text-5xl">
          {hero.title}
        </h1>
        <p className="text-lg text-[var(--lc-muted)] sm:text-xl">{hero.description}</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={resolveHref(locale, hero.primaryHref ?? "#cta")}
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-medium transition hover:opacity-90"
          >
            {hero.primaryCta}
          </Link>
          <Link
            href={resolveHref(locale, hero.secondaryHref ?? "#demo")}
            className="inline-flex items-center justify-center rounded-full border border-[var(--lc-border)] px-6 py-3 text-base font-medium text-[var(--lc-muted)] transition hover:border-accent hover:text-[var(--lc-foreground)]"
          >
            {hero.secondaryCta}
          </Link>
        </div>
        <div className="flex flex-wrap gap-8 text-sm text-[var(--lc-muted)]">
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold text-[var(--lc-foreground)]">{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-[var(--lc-border)] bg-gradient-to-br from-emerald-500/10 via-[var(--lc-surface-strong)] to-[var(--lc-background)] p-8 shadow-2xl">
        <div className="absolute -top-16 right-10 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" />
        <div className="absolute -bottom-10 left-8 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--lc-subtle)]">{preview.label}</p>
          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--lc-border)] bg-[var(--lc-surface-strong)] p-4 shadow-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--lc-accent)]">{preview.sprintTag}</p>
              <p className="mt-2 text-lg font-semibold text-[var(--lc-foreground)]">{preview.sprintTitle}</p>
              <p className="mt-3 text-sm text-[var(--lc-muted)]">{preview.sprintDescription}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 w-full rounded-full bg-[var(--lc-surface)]">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${preview.progressPercent}%` }}
                  />
                </div>
                <span className="text-xs text-[var(--lc-muted)]">{preview.progressLabel}</span>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl border border-[var(--lc-border)] bg-[var(--lc-surface-strong)] p-4 shadow-xl">
              <div className="flex items-center justify-between text-xs text-[var(--lc-muted)]">
                <span>{preview.teamLabel}</span>
                <span>{preview.activityLabel}</span>
              </div>
              {preview.members.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between rounded-xl border border-[var(--lc-border)] bg-[var(--lc-surface)] px-3 py-2"
                >
                  <span className="text-sm text-[var(--lc-muted-strong)]">{member.name}</span>
                  <span className="text-xs text-accent">{member.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
