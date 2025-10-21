import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

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
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-200">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          {hero.badge}
        </div>
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
          {hero.title}
        </h1>
        <p className="text-lg text-white/70 sm:text-xl">{hero.description}</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={resolveHref(locale, hero.primaryHref ?? "#cta")}
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-emerald-400"
          >
            {hero.primaryCta}
          </Link>
          <Link
            href={resolveHref(locale, hero.secondaryHref ?? "#demo")}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-medium text-white/80 transition hover:border-white hover:text-white"
          >
            {hero.secondaryCta}
          </Link>
        </div>
        <div className="flex flex-wrap gap-8 text-sm text-white/60">
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 p-8 shadow-2xl">
        <div className="absolute -top-16 right-10 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" />
        <div className="absolute -bottom-10 left-8 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">{preview.label}</p>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">{preview.sprintTag}</p>
              <p className="mt-2 text-lg font-semibold text-white">{preview.sprintTitle}</p>
              <p className="mt-3 text-sm text-white/60">{preview.sprintDescription}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-400"
                    style={{ width: `${preview.progressPercent}%` }}
                  />
                </div>
                <span className="text-xs text-white/60">{preview.progressLabel}</span>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{preview.teamLabel}</span>
                <span>{preview.activityLabel}</span>
              </div>
              {preview.members.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2"
                >
                  <span className="text-sm text-white/80">{member.name}</span>
                  <span className="text-xs text-emerald-200">{member.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
