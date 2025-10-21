import { defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LandingPage } from "@/components/landing/LandingPage";

export default async function IndexPage() {
  const locale: Locale = defaultLocale;
  const dictionary = await getDictionary(locale);

  return <LandingPage locale={locale} dictionary={dictionary.landing} />;
}
