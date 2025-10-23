import { notFound } from "next/navigation";

import { getDictionary } from "@/shared/i18n/get-dictionary";
import { isLocale, type Locale } from "@/shared/i18n/config";
import { LandingPage } from "@/modules/landing";
interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const resolvedLocale = locale as Locale;
  const dictionary = await getDictionary(resolvedLocale);

  return <LandingPage locale={resolvedLocale} dictionary={dictionary.landing} authDictionary={dictionary.auth} />;
}
