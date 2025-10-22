export const locales = ["ru", "be"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const localeLabels: Record<Locale, string> = {
  ru: "🇷🇺",
  be: "🇧🇾",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
