import type { Locale } from "@/shared/i18n/config";

export function resolveHref(locale: Locale, href?: string) {
  if (!href) {
    return "#";
  }

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return href;
  }

  if (href.startsWith("#")) {
    return href;
  }

  const normalized = href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${normalized}`;
}
