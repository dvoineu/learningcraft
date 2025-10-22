"use client";

import { useState } from "react";
import Link from "next/link";

import { locales, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

import { resolveHref } from "./utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface HeaderProps {
  locale: Locale;
  dictionary: Dictionary["landing"]["navigation"];
}

export function Header({ locale, dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((state) => !state);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--lc-border)] bg-[var(--lc-surface-strong)] text-[var(--lc-muted)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-3" onClick={closeMenu}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-2xl font-semibold text-accent">
            LC
          </span>
          <div>
            <p className="text-xl font-semibold text-[var(--lc-foreground)]">{dictionary.brand.name}</p>
            <p className="text-xs text-[var(--lc-muted)]">{dictionary.brand.subtitle}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[var(--lc-muted)] md:flex">
          {dictionary.links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-[var(--lc-foreground)]"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-2 border-l border-[var(--lc-border)] pl-4">
            {locales.map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                className={`text-xs uppercase tracking-[0.3em] transition ${
                  code === locale
                    ? "text-[var(--lc-foreground)]"
                    : "text-[var(--lc-muted)] hover:text-[var(--lc-foreground)]"
                }`}
                aria-current={code === locale ? "true" : undefined}
              >
                {localeLabels[code]}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 pl-4">
            <Link
              href={resolveHref(locale, dictionary.ctas.secondary.href)}
              className="rounded-full border border-[var(--lc-border)] px-4 py-2 text-[var(--lc-muted)] transition hover:border-accent hover:text-[var(--lc-foreground)]"
            >
              {dictionary.ctas.secondary.label}
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--lc-border)] text-[var(--lc-muted)] transition hover:border-accent hover:text-[var(--lc-foreground)]"
            aria-label={dictionary.mobileMenuLabel}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">{dictionary.mobileMenuLabel}</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-[var(--lc-border)] bg-[var(--lc-surface-strong)] md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-base text-[var(--lc-muted-strong)]">
            {dictionary.links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-2 transition hover:bg-[var(--lc-surface)]"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <Link
                href={resolveHref(locale, dictionary.ctas.secondary.href)}
                className="block rounded-full border border-[var(--lc-border)] px-4 py-2 text-center text-[var(--lc-muted-strong)] transition hover:border-accent hover:text-[var(--lc-foreground)]"
                onClick={closeMenu}
              >
                {dictionary.ctas.secondary.label}
              </Link>
            </div>
            <div className="flex items-center gap-2 border-t border-[var(--lc-border)] pt-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--lc-muted)]">{dictionary.languageLabel}</span>
              <div className="flex flex-wrap gap-2">
                {locales.map((code) => (
                  <Link
                    key={code}
                    href={`/${code}`}
                    className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] transition ${
                      code === locale
                        ? "bg-[var(--lc-foreground)] text-[var(--lc-background)]"
                        : "text-[var(--lc-muted)] hover:text-[var(--lc-foreground)]"
                    }`}
                    aria-current={code === locale ? "true" : undefined}
                    onClick={closeMenu}
                  >
                    {localeLabels[code]}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
