"use client";

import { useState } from "react";
import Link from "next/link";

import { locales, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

import { resolveHref } from "./utils";

interface HeaderProps {
  locale: Locale;
  dictionary: Dictionary["landing"]["navigation"];
}

export function Header({ locale, dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((state) => !state);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href={`/${locale}`} className="flex items-center gap-3" onClick={closeMenu}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-2xl font-semibold text-emerald-300">
            LC
          </span>
          <div>
            <p className="text-xl font-semibold text-white">{dictionary.brand.name}</p>
            <p className="text-xs text-white/60">{dictionary.brand.subtitle}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {dictionary.links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-2 border-l border-white/15 pl-4">
            {locales.map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                className={`text-xs uppercase tracking-[0.3em] transition ${
                  code === locale ? "text-white" : "text-white/50 hover:text-white"
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
              className="rounded-full border border-white/20 px-4 py-2 text-white/70 transition hover:border-white hover:text-white"
            >
              {dictionary.ctas.secondary.label}
            </Link>
            <Link
              href={resolveHref(locale, dictionary.ctas.primary.href)}
              className="rounded-full bg-emerald-500 px-5 py-2 font-medium text-slate-950 transition hover:bg-emerald-400"
            >
              {dictionary.ctas.primary.label}
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/70 transition hover:border-white/30 hover:text-white"
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
        <div className="border-t border-white/10 bg-slate-950/95 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-base text-white/80">
            {dictionary.links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-2 transition hover:bg-white/5"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href={resolveHref(locale, dictionary.ctas.secondary.href)}
                className="flex-1 rounded-full border border-white/20 px-4 py-2 text-center text-white/80 transition hover:border-white hover:text-white"
                onClick={closeMenu}
              >
                {dictionary.ctas.secondary.label}
              </Link>
              <Link
                href={resolveHref(locale, dictionary.ctas.primary.href)}
                className="flex-1 rounded-full bg-emerald-500 px-4 py-2 text-center font-medium text-slate-950 transition hover:bg-emerald-400"
                onClick={closeMenu}
              >
                {dictionary.ctas.primary.label}
              </Link>
            </div>
            <div className="flex items-center gap-2 border-t border-white/10 pt-4">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">{dictionary.languageLabel}</span>
              <div className="flex flex-wrap gap-2">
                {locales.map((code) => (
                  <Link
                    key={code}
                    href={`/${code}`}
                    className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] transition ${
                      code === locale ? "bg-white text-slate-950" : "text-white/60 hover:text-white"
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
