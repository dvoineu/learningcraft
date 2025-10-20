import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/get-dictionary";
import { locales, localeLabels, isLocale, type Locale } from "@/i18n/config";
import { UserMenu } from "@/components/auth/UserMenu";

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-2xl font-semibold text-emerald-300">
              LC
            </span>
            <div>
              <p className="text-xl font-semibold">LearningCraft</p>
              <p className="text-xs text-white/60">{dictionary.brand.subtitle}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a href="#features" className="transition hover:text-white">
              {dictionary.nav.features}
            </a>
            <a href="#steps" className="transition hover:text-white">
              {dictionary.nav.steps}
            </a>
            <a href="#community" className="transition hover:text-white">
              {dictionary.nav.community}
            </a>
            <Link
              href={`/${locale}/upload`}
              className="transition hover:text-white"
            >
              {dictionary.nav.createQuiz}
            </Link>
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
            <UserMenu
              locale={locale}
              dictionary={dictionary.auth}
            />
          </nav>
          <div className="flex items-center gap-3 md:hidden">
            <UserMenu
              locale={locale}
              dictionary={dictionary.auth}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-20">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-200">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              {dictionary.hero.badge}
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {dictionary.hero.title}
            </h1>
            <p className="text-lg text-white/70 sm:text-xl">{dictionary.hero.description}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#cta"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-emerald-400"
              >
                {dictionary.hero.primaryCta}
              </a>
              <Link
                href={`/${locale}/upload`}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-medium text-white/80 transition hover:border-white hover:text-white"
              >
                {dictionary.hero.secondaryCta}
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 text-sm text-white/60">
              {dictionary.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 p-8 shadow-2xl">
            <div className="absolute -top-16 right-10 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" />
            <div className="absolute -bottom-10 left-8 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">Dashboard Preview</p>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Learning sprint</p>
                  <p className="mt-2 text-lg font-semibold text-white">UI Kit для EdTech проекта</p>
                  <p className="mt-3 text-sm text-white/60">
                    Завершите 5 практических модулей и получите обратную связь от наставников.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-2 w-full rounded-full bg-white/10">
                      <div className="h-full w-2/3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-xs text-white/60">67%</span>
                  </div>
                </div>
                <div className="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>Команда проекта</span>
                    <span>Активность</span>
                  </div>
                  {["Екатерина", "Максим", "U-Team"].map((member) => (
                    <div
                      key={member}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2"
                    >
                      <span className="text-sm text-white/80">{member}</span>
                      <span className="text-xs text-emerald-200">Выполняет спринт</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="space-y-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-300">
              {dictionary.features.tag}
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">{dictionary.features.title}</h2>
            <p className="max-w-2xl text-base text-white/70">{dictionary.features.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {dictionary.features.items.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
              >
                <div className="text-3xl">{feature.icon}</div>
                <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="steps" className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
              {dictionary.steps.tag}
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">{dictionary.steps.title}</h2>
            <p className="max-w-2xl text-base text-white/70">{dictionary.steps.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {dictionary.steps.items.map((step) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="community" className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
              {dictionary.community.tag}
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">{dictionary.community.title}</h2>
            <p className="text-base text-white/70">{dictionary.community.description}</p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/70">{dictionary.community.quote}</p>
              <div className="mt-4 text-sm text-white/50">— {dictionary.community.quoteAuthor}</div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {dictionary.community.testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-white/80">{testimonial.quote}</p>
                <div className="mt-5">
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-white/50">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="cta"
          className="rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-950 p-10 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-200">
            {dictionary.cta.tag}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{dictionary.cta.title}</h2>
          <p className="mt-4 text-base text-white/70">{dictionary.cta.description}</p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="https://supabase.com/dashboard/project/kcupjktnjucxzjiwiphi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-emerald-200"
            >
              {dictionary.cta.primaryCta}
            </Link>
            <Link
              href="mailto:hello@learningcraft.io"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white/80 transition hover:border-white hover:text-white"
            >
              {dictionary.cta.secondaryCta}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-white/50 sm:flex-row">
          <p>
            © {currentYear} LearningCraft Labs. {dictionary.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link href="mailto:support@learningcraft.io" className="transition hover:text-white">
              {dictionary.footer.support}
            </Link>
            <Link href="#" className="transition hover:text-white">
              {dictionary.footer.privacy}
            </Link>
            <Link href="#" className="transition hover:text-white">
              {dictionary.footer.terms}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
