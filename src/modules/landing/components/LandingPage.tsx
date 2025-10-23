import type { Dictionary } from "@/shared/i18n/get-dictionary";
import type { Locale } from "@/shared/i18n/config";

import Link from "next/link";

import { Header } from "./Header";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { SocialProof } from "./SocialProof";
import { HowItWorks } from "./HowItWorks";
import { Subjects } from "./Subjects";
import { Testimonials } from "./Testimonials";
import { Pricing } from "./Pricing";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";
import { Demo } from "./Demo";

interface LandingPageProps {
  locale: Locale;
  dictionary: Dictionary["landing"];
  authDictionary: Dictionary["auth"];
}

export function LandingPage({ locale, dictionary, authDictionary }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[var(--lc-background)] text-[var(--lc-foreground)] transition">
      <Header locale={locale} dictionary={dictionary.navigation} authDictionary={authDictionary} />

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-24">
        <Hero dictionary={{ hero: dictionary.hero, preview: dictionary.preview }} locale={locale} />
        <Features dictionary={{ features: dictionary.features }} />
        <HowItWorks locale={locale} dictionary={dictionary.howItWorks} />
        <SocialProof dictionary={dictionary.socialProof} />
        <Subjects dictionary={dictionary.subjects} />
        <Demo dictionary={dictionary.demo} />
        <Testimonials dictionary={dictionary.testimonials} />
        <Pricing dictionary={dictionary.pricing} />
        <FAQ dictionary={dictionary.faq} />
        <FinalCTA locale={locale} dictionary={dictionary.finalCta} />
      </main>

      <footer className="border-t border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-white/60 lg:flex-row lg:justify-between">
          <div className="space-y-2">
            <p className="text-white/70">{dictionary.footer.rights}</p>
            <p>{dictionary.footer.company}</p>
            <p>{dictionary.footer.address}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Документы</p>
              <ul className="space-y-2">
                {dictionary.footer.legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Контакты</p>
              <ul className="space-y-2">
                {dictionary.footer.contacts.map((contact) => (
                  <li key={contact.href}>
                    <Link href={contact.href} className="transition hover:text-white">
                      {contact.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
