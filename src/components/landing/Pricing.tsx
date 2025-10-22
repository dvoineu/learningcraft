import Link from "next/link";

import type { Dictionary } from "@/i18n/get-dictionary";

interface PricingProps {
  dictionary: Dictionary["landing"]["pricing"];
}

export function Pricing({ dictionary }: PricingProps) {
  return (
    <section id="pricing" className="space-y-10">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--lc-accent)]">
          {dictionary.tag}
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{dictionary.title}</h2>
        <p className="text-base text-white/70 sm:text-lg">{dictionary.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {dictionary.plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:border-accent hover:bg-accent-soft ${plan.mostPopular ? "lg:-translate-y-4" : ""}`}
          >
            {plan.mostPopular ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--lc-accent-foreground)]">
                Top
              </span>
            ) : null}

            <div className="space-y-2 text-center">
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <p className="text-sm text-white/50">{plan.description}</p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-3xl font-semibold text-white">
                {plan.price}
                {plan.period ? <span className="text-sm text-white/40"> / {plan.period}</span> : null}
              </p>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-white/70">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <Link
                href={plan.ctaHref}
                className={`inline-flex w-full items-center justify-center rounded-full border px-5 py-3 text-sm font-medium transition ${plan.mostPopular ? "border-transparent bg-accent text-[var(--lc-accent-foreground)] hover:opacity-90" : "border-white/20 text-white/80 hover:border-white hover:text-white"}`}
              >
                <span>{plan.ctaLabel}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
