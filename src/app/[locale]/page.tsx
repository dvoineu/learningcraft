import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { LandingPage } from "@/components/landing/LandingPage";
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

  return <LandingPage locale={resolvedLocale} dictionary={dictionary.landing} />;
}
