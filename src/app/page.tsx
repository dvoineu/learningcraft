import { defaultLocale, type Locale } from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/get-dictionary";
import { LandingPage } from "@/modules/landing";

export default async function IndexPage() {
  const locale: Locale = defaultLocale;
  const dictionary = await getDictionary(locale);

  return <LandingPage locale={locale} dictionary={dictionary.landing} authDictionary={dictionary.auth} />;
}
