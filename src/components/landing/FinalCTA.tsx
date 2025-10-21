import Link from "next/link";

import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

import { resolveHref } from "./utils";

interface FinalCTAProps {
  locale: Locale;
  dictionary: Dictionary["landing"]["finalCta"];
}

export function FinalCTA({ locale, dictionary }: FinalCTAProps) {
  return (
    <section
      id="cta"
      className="rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-950 p-10 text-center"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-200">
        {dictionary.tag}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{dictionary.title}</h2>
      <p className="mt-4 text-base text-white/70">{dictionary.description}</p>
      <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href={resolveHref(locale, dictionary.primaryHref ?? "/upload")}
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-emerald-200"
        >
          {dictionary.primaryCta}
        </Link>
        <Link
          href={resolveHref(locale, dictionary.secondaryHref ?? "mailto:hello@learningcraft.io")}
          className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white/80 transition hover:border-white hover:text-white"
        >
          {dictionary.secondaryCta}
        </Link>
      </div>
    </section>
  );
}
