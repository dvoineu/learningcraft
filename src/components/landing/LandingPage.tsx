import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

import { Header } from "./Header";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { SocialProof } from "./SocialProof";
import { Subjects } from "./Subjects";
import { Testimonials } from "./Testimonials";
import { Pricing } from "./Pricing";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";

interface LandingPageProps {
  locale: Locale;
  dictionary: Dictionary["landing"];
}

export function LandingPage({ locale, dictionary }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header locale={locale} dictionary={dictionary.navigation} />

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-24">
        <Hero dictionary={{ hero: dictionary.hero, preview: dictionary.preview }} locale={locale} />
        <Features dictionary={{ features: dictionary.features }} />
        <SocialProof dictionary={dictionary.socialProof} />
        <Subjects dictionary={dictionary.subjects} />
        <Testimonials dictionary={dictionary.testimonials} />
        <Pricing dictionary={dictionary.pricing} />
        <FAQ dictionary={dictionary.faq} />
        <FinalCTA locale={locale} dictionary={dictionary.finalCta} />
      </main>
    </div>
  );
}
