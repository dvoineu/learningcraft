import Link from "next/link";

const features = [
  {
    title: "Живая практика",
    description:
      "Доступ к интерактивным задачам и проектам, основанным на реальных кейсах EdTech индустрии.",
    icon: "🎯",
  },
  {
    title: "Трекер прогресса",
    description:
      "Отслеживайте развитие навыков, получайте рекомендации по следующему шагу и фиксируйте достижения.",
    icon: "📈",
  },
  {
    title: "Сообщество наставников",
    description:
      "Обмен опытом с экспертами, живые воркшопы и поддержка на каждом этапе обучения.",
    icon: "🤝",
  },
];

const steps = [
  {
    title: "1. Пройдите диагностику",
    description: "Определим текущий уровень знаний и подберём персональный путь развития.",
  },
  {
    title: "2. Выполняйте практику",
    description: "Учитесь на реальных задачах с обратной связью от наставников и сообщества.",
  },
  {
    title: "3. Соберите портфолио",
    description: "Превратите лучшие проекты в кейсы и подготовьтесь к следующему карьерному шагу.",
  },
];

const testimonials = [
  {
    name: "Мария Иванова",
    role: "Product Designer, SkillForge",
    quote:
      "LearningCraft помог структурировать знания и получить первых учеников уже через месяц.",
  },
  {
    name: "Алексей Петров",
    role: "Head of Learning, FutureLab",
    quote:
      "Платформа экономит десятки часов на запуск образовательных программ и держит команду в тонусе.",
  },
];

export default function Home() {
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
              <p className="text-xs text-white/60">Создаём и развиваем EdTech-продукты</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link href="#features" className="transition hover:text-white">
              Возможности
            </Link>
            <Link href="#steps" className="transition hover:text-white">
              Как это работает
            </Link>
            <Link href="#community" className="transition hover:text-white">
              Сообщество
            </Link>
            <Link href="#cta" className="rounded-full bg-emerald-500 px-5 py-2 font-medium text-slate-950 transition hover:bg-emerald-400">
              Подключиться
            </Link>
          </nav>
          <button className="md:hidden rounded-full border border-white/20 px-4 py-2 text-sm text-white/70">
            Меню
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-20">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-200">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              Платформа для тех, кто учится создавать обучение
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Запускайте образовательные продукты быстрее и увереннее
            </h1>
            <p className="text-lg text-white/70 sm:text-xl">
              LearningCraft — это экосистема для продуктовых команд, наставников и методистов. Совмещаем
              практику, аналитику и сообщество, чтобы вы росли без перегрузок.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#cta"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-emerald-400"
              >
                Присоединиться к сообществу
              </Link>
              <Link
                href="/test-supabase"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-medium text-white/80 transition hover:border-white hover:text-white"
              >
                Посмотреть демо
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 text-sm text-white/60">
              <div>
                <p className="text-3xl font-semibold text-white">1 200+</p>
                <p>выпускников за прошлый год</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">86%</p>
                <p>доводят проекты до релиза</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">24/7</p>
                <p>поддержка наставников</p>
              </div>
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
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-300">Преимущества</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Что делает LearningCraft особенным</h2>
            <p className="max-w-2xl text-base text-white/70">
              Мы объединили лучшие практики продуктовой разработки и современных образовательных методик,
              чтобы создать пространство для уверенного роста команд и экспертов.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
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
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">Путь запуска</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Три шага к первому релизу</h2>
            <p className="max-w-2xl text-base text-white/70">
              Структурируем процесс создания и развития продукта: от идеи до устойчивого запуска.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="community" className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">Сообщество</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Опыт наставников и команды поддержки</h2>
            <p className="text-base text-white/70">
              Мы помогаем строить гибкие команды, обмениваться опытом и получать обратную связь от лидеров отрасли.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/70">
                «LearningCraft — пространство, где образовательные продукты создаются как стартапы: быстро,
                осознанно и с поддержкой на каждом этапе.»
              </p>
              <div className="mt-4 text-sm text-white/50">
                — Команда LearningCraft Labs
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
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

        <section id="cta" className="rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-950 p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-200">Готовы начать?</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Присоединяйтесь к первому кохорту LearningCraft
          </h2>
          <p className="mt-4 text-base text-white/70">
            Получите доступ к живым сессиям, практическим спринтам и сообществу, которое поддержит на пути к релизу.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="https://supabase.com/dashboard/project/kcupjktnjucxzjiwiphi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-emerald-200"
            >
              Запросить демо
            </Link>
            <Link
              href="mailto:hello@learningcraft.io"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white/80 transition hover:border-white hover:text-white"
            >
              Написать команде
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} LearningCraft Labs. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <Link href="mailto:support@learningcraft.io" className="transition hover:text-white">
              Поддержка
            </Link>
            <Link href="#" className="transition hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="transition hover:text-white">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
