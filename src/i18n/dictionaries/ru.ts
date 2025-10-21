const landingHero = {
  badge: "Подготовка к ЦТ 2025",
  title: "Создавайте персональные квизы из PDF за 30 секунд",
  description:
    "Загружайте варианты ЦТ, получайте готовые квизы и отслеживайте прогресс учеников в единой панели. Экономьте время и повышайте балл уже в первый день.",
  primaryCta: "Создать квиз бесплатно",
  primaryHref: "/upload",
  secondaryCta: "Посмотреть демо",
  secondaryHref: "#demo",
  stats: [
    { value: "12 500+", label: "решённых заданий в месяц" },
    { value: "4.9/5", label: "средняя оценка учеников" },
    { value: "30+", label: "школ и репетиторских центров" },
  ],
};

const landingFaq = {
  tag: "FAQ",
  title: "Часто задаваемые вопросы",
  description:
    "Собрали популярные вопросы от учеников, родителей и наставников. Наш саппорт отвечает в течение одного рабочего дня.",
  items: [
    {
      question: "Можно ли загрузить несколько PDF сразу?",
      answer: "Да, выберите до 5 файлов за один раз — мы распознаем их параллельно и уведомим, когда квизы готовы.",
    },
    {
      question: "Нужна ли установка дополнительного ПО?",
      answer: "Нет, LearningCraft работает в браузере на ноутбуках, планшетах и смартфонах.",
    },
    {
      question: "Как делиться квизами с учениками?",
      answer: "Создайте группу или отправьте прямую ссылку. Можно ограничить время выполнения и количество попыток.",
    },
    {
      question: "Есть ли скидки для школ и репетиторских центров?",
      answer: "Да, напишите нам на partnerships@learningcraft.io — подготовим индивидуальное предложение.",
    },
  ],
};

const landingFinalCta = {
  tag: "Готовы к старту?",
  title: "Запустите первый квиз сегодня",
  description:
    "Попробуйте наглядный сценарий и убедитесь, как быстро ученики переходят от PDF к уверенным результатам.",
  primaryCta: "Создать квиз бесплатно",
  primaryHref: "/upload",
  secondaryCta: "Связаться с командой",
  secondaryHref: "mailto:hello@learningcraft.io",
};

const landingSubjects = {
  tag: "Предметы",
  title: "Один инструмент для всех направлений ЦТ",
  description:
    "Поддерживаем ключевые предметы и регулярно добавляем новые модули. Каждый блок включает задания по уровням сложности.",
  items: [
    {
      icon: "➗",
      title: "Математика",
      description: "Формулы, геометрия и логика с адаптивными подсказками и разбором решений.",
    },
    {
      icon: "🧪",
      title: "Химия",
      description: "Автоматическая проверка уравнений, тренажёр по расчётным задачам и периодическому закону.",
    },
    {
      icon: "📚",
      title: "Русский язык",
      description: "Орфография, пунктуация и анализ текста с мгновенной обратной связью.",
    },
    {
      icon: "🌍",
      title: "История и общество",
      description: "Тематические подборки и карточки дат, закрепление знаний в формате блиц-квизов.",
    },
    {
      icon: "🧬",
      title: "Биология",
      description: "Таблицы, схемы и тесты по физиологии, генетике и экологии.",
    },
    {
      icon: "💡",
      title: "Физика",
      description: "Задачи с графиками, генерация вариантов и проверка формул.",
    },
  ],
};

const landingTestimonials = {
  tag: "Отзывы",
  title: "Нас рекомендуют наставники и ученики",
  description:
    "Слушаем пользователей и развиваем продукт вместе с ними. Вот несколько историй успеха первых кохорт.",
  items: [
    {
      name: "Наталья Сапега",
      role: "Репетитор по математике, Минск",
      quote:
        "Перенесла все печатные материалы в LearningCraft и освободила до 6 часов в неделю на индивидуальную работу с учениками.",
    },
    {
      name: "Даниил Романов",
      role: "Абитуриент, поступил в БГУ",
      quote:
        "За два месяца тренировок по квизам поднял средний бал с 58 до 82. Особенно помогли аналитика ошибок и челленджи.",
    },
    {
      name: "Елена Боровик",
      role: "Куратор образовательного центра",
      quote:
        "Мы подключили 4 группы и видим прогресс в реальном времени. Команда быстро реагирует на обратную связь.",
    },
  ],
};

const landingPricing = {
  tag: "Тарифы",
  title: "Выберите подходящий формат",
  description:
    "Начните бесплатно и подключайте расширенные возможности по мере роста команды или количества учеников.",
  plans: [
    {
      name: "Starter",
      price: "0 BYN",
      period: "в месяц",
      description: "Для самостоятельной подготовки или первых групп",
      features: [
        "1 преподаватель",
        "До 3 квизов в месяц",
        "Базовая аналитика",
      ],
      ctaLabel: "Попробовать",
      ctaHref: "/upload",
      mostPopular: false,
    },
    {
      name: "Team",
      price: "49 BYN",
      period: "в месяц",
      description: "Для репетиторов и учебных центров",
      features: [
        "До 10 преподавателей",
        "Неограниченные квизы",
        "Расширенная аналитика и отчёты",
        "Челленджи и рейтинги",
      ],
      ctaLabel: "Оформить",
      ctaHref: "mailto:hello@learningcraft.io",
      mostPopular: true,
    },
    {
      name: "Enterprise",
      price: "По запросу",
      period: "",
      description: "Для сетей школ и EdTech-проектов",
      features: [
        "SLA и выделенная поддержка",
        "Интеграция с LMS",
        "Обучение команды",
        "Доступ к roadmap",
      ],
      ctaLabel: "Запросить демо",
      ctaHref: "mailto:partnerships@learningcraft.io",
      mostPopular: false,
    },
  ],
};

const landingNavigation = {
  brand: {
    name: "LearningCraft",
    subtitle: "Платформа подготовки к ЦТ и олимпиадам",
  },
  links: [
    { label: "Преимущества", href: "#features" },
    { label: "Результаты", href: "#social-proof" },
    { label: "Как это работает", href: "#how-it-works" },
    { label: "Демо", href: "#demo" },
    { label: "Предметы", href: "#subjects" },
    { label: "Отзывы", href: "#testimonials" },
    { label: "Тарифы", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  ctas: {
    primary: { label: "Создать квиз бесплатно", href: "/upload" },
    secondary: { label: "Войти", href: "/auth/signin" },
  },
  languageLabel: "Язык",
  mobileMenuLabel: "Меню",
};

const landingFeatures = {
  tag: "Возможности",
  title: "Полный цикл подготовки к ЦТ",
  description:
    "LearningCraft объединяет автоматизацию задач, аналитику результатов и поддержку наставников, чтобы каждый ученик уверенно подходил к экзамену.",
  items: [
    {
      icon: "⚡️",
      title: "Автогенерация квизов",
      description:
        "Загружайте PDF-варианты и получайте готовые тесты с разбором и таймингом в течение 30 секунд.",
    },
    {
      icon: "🎯",
      title: "Адаптивные планы",
      description:
        "Система подстраивает задания под слабые места ученика и предлагает путь усиления навыков.",
    },
    {
      icon: "📊",
      title: "Аналитика в реальном времени",
      description:
        "Отслеживайте попытки, проценты правильных ответов и прогресс групп на одном дашборде.",
    },
    {
      icon: "🤝",
      title: "Режим наставника",
      description:
        "Назначайте домашние задания, оставляйте комментарии и следите за динамикой всей группы.",
    },
    {
      icon: "🧩",
      title: "Банк заданий",
      description:
        "Доступ к проверенным заданиям и авторским вариантам преподавателей, разделённым по предметам и темам.",
    },
    {
      icon: "📣",
      title: "Мотивационные челленджи",
      description:
        "Запускайте турниры с рейтингами, чтобы удерживать интерес учеников и повышать вовлечённость.",
    },
  ],
};

const landingSteps = {
  tag: "Быстрый старт",
  title: "Три шага к первому квизу",
  description:
    "Путь от PDF-файла до аналитики по классу занимает меньше одной минуты.",
  items: [
    {
      title: "1. Загрузите PDF",
      description: "Платформа распознает структуру документа и создаст набор вопросов автоматически.",
    },
    {
      title: "2. Отправьте ученикам",
      description: "Поделитесь ссылкой или присвойте задание группе, чтобы пройти тренировку.",
    },
    {
      title: "3. Проанализируйте результаты",
      description: "Получите отчёт по каждому ученику и рекомендации для следующего занятия.",
    },
  ],
};

const landingHowItWorks = {
  tag: "Как это работает",
  title: "Всё под контролем у наставника и ученика",
  description:
    "Мы синхронизируем опыт педагога и мотивацию ученика: от загрузки материалов до закрепления знаний и контроля результатов.",
  steps: [
    {
      label: "Импорт",
      title: "Загружаете материалы",
      description: "Платформа распознаёт PDF, структурирует задания и делит их на блоки сложности.",
      duration: "10 c",
      result: "Готовый квиз с настройками таймера",
    },
    {
      label: "Практика",
      title: "Назначаете тренировки",
      description: "Ученики проходят тест в браузере, получают мгновенную обратную связь и подсказки по темам.",
      duration: "15-20 мин",
      result: "Реальные баллы за каждую попытку",
    },
    {
      label: "Аналитика",
      title: "Отслеживаете прогресс",
      description: "Дашборд показывает, где ученику нужна помощь и какие темы стоит повторить.",
      duration: "15 c",
      result: "Рекомендации для следующего занятия",
    },
  ],
  cta: {
    label: "Попробовать сценарий",
    href: "/upload",
  },
};

const landingCommunity = {
  tag: "Сообщество",
  title: "Опыт наставников и команды поддержки",
  description:
    "Мы помогаем строить гибкие команды, обмениваться опытом и получать обратную связь от лидеров отрасли.",
  quote:
    "LearningCraft — пространство, где образовательные продукты создаются как стартапы: быстро, осознанно и с поддержкой на каждом этапе.",
  quoteAuthor: "Команда LearningCraft Labs",
  testimonials: [
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
  ],
};

const landingCta = {
  tag: "Готовы начать?",
  title: "Присоединяйтесь к первому кохорту LearningCraft",
  description:
    "Получите доступ к живым сессиям, практическим спринтам и сообществу, которое поддержит на пути к релизу.",
  primaryCta: "Запросить демо",
  secondaryCta: "Написать команде",
};

const landingPreview = {
  label: "Пример квиза",
  sprintTag: "Новый набор",
  sprintTitle: "ЦТ. Математика · Модуль 3",
  sprintDescription:
    "PDF преобразован в интерактивный квиз. Наставник следит за динамикой, студенты получают мгновенную обратную связь.",
  progressPercent: 72,
  progressLabel: "72%",
  teamLabel: "Группа подготовки",
  activityLabel: "Статус",
  members: [
    { name: "Полина", status: "Создаёт задания" },
    { name: "Андрей", status: "Проходит тренировку" },
    { name: "LC Team", status: "Анализирует результаты" },
  ],
};

const landingSocialProof = {
  tag: "Нам доверяют",
  title: "LearningCraft помогает выпускникам и наставникам",
  description: "Цифры и партнёры, подтверждающие эффективность платформы.",
  metrics: [
    { value: "30%", label: "конверсия посетителей в создание квиза" },
    { value: "5 мин", label: "среднее время запуска первого квиза" },
    { value: "38%", label: "bounce rate на целевых страницах" },
  ],
  logos: [
    { name: "Академия ЦТ", initials: "AC" },
    { name: "STEM Camp", initials: "SC" },
    { name: "Future Skills Lab", initials: "FSL" },
    { name: "Основа Education", initials: "OE" },
  ],
  press: [
    {
      quote:
        "LearningCraft переводит подготовку к ЦТ в цифровой формат и делает её доступной каждой школе.",
      source: "EdTech Review",
      href: "https://example.com/edtech-review",
    },
    {
      quote:
        "Платформа ускоряет работу преподавателей в несколько раз и помогает отслеживать прогресс учеников.",
      source: "BelEdTech",
      href: "https://example.com/beledtech",
    },
  ],
};

const landingDemo = {
  tag: "Демо-сценарий",
  title: "Как создаётся квиз и как его видит ученик",
  description:
    "Смоделируйте путь за 30 секунд: от загрузки варианта до аналитики результатов. Никаких установок, всё в браузере.",
  stats: [
    { value: "30 сек", label: "до первого вопроса" },
    { value: "25+", label: "автоматически созданных задач" },
    { value: "3 режима", label: "ученик · наставник · команда" },
  ],
  highlights: [
    {
      title: "Загрузка PDF",
      description: "Перетащите файл или вставьте ссылку — система распознаёт текст и иллюстрации.",
    },
    {
      title: "Редактор",
      description: "При необходимости исправьте варианты ответов, расставьте теги и уровень сложности.",
    },
    {
      title: "Режим ученика",
      description: "Стартуйте тренировку, следите за таймером и получайте подсказки по ошибкам.",
    },
    {
      title: "Аналитика",
      description: "Просматривайте отчёт по каждому ученику и отправляйте рекомендации в один клик.",
    },
  ],
  cta: {
    label: "Посмотреть пример квиза",
    href: "#cta",
  },
};

export const dictionary = {
  nav: {
    features: "Возможности",
    steps: "Как это работает",
    community: "Сообщество",
    createQuiz: "Создать Quiz",
    join: "Подключиться",
    menu: "Меню",
    signIn: "Войти",
  },
  auth: {
    profile: "Профиль",
    myQuizzes: "Мои квизы",
    settings: "Настройки",
    signOut: "Выйти",
    signIn: "Войти",
    signUp: "Регистрация",
  },
  brand: {
    subtitle: "Создаём и развиваем EdTech-продукты",
  },
  landing: {
    navigation: landingNavigation,
    hero: landingHero,
    features: landingFeatures,
    steps: landingSteps,
    howItWorks: landingHowItWorks,
    community: landingCommunity,
    cta: landingCta,
    preview: landingPreview,
    socialProof: landingSocialProof,
    demo: landingDemo,
    subjects: landingSubjects,
    testimonials: landingTestimonials,
    pricing: landingPricing,
    faq: landingFaq,
    finalCta: landingFinalCta,
  },
  steps: landingSteps,
  community: landingCommunity,
  cta: landingCta,
  preview: landingPreview,
  footer: {
    terms: "Пользовательское соглашение",
    rights: "Все права защищены.",
  },
  testSupabase: {
    title: "Проверка подключения к Supabase",
    testingMessage: "Проверяем соединение с Supabase...",
    successTitle: "Соединение успешно!",
    successSubtitle: "Проверка завершена успешно.",
    messageTablesFound: "Подключение активно, таблицы доступны.",
    messageNoTables:
      "Соединение установлено! Таблицы пока не созданы — всё готово к добавлению данных.",
    noteNoTables:
      "Создайте таблицы в панели Supabase, чтобы начать работу с данными.",
    connectionDetails: "Детали подключения",
    statusLabel: "Статус",
    statusConnected: "Подключено",
    urlLabel: "URL",
    authLabel: "Аутентификация",
    authenticated: "Да",
    anonymous: "Нет (анонимный доступ)",
    nextSteps: "Следующие шаги",
    openDashboard: "Открыть панель Supabase",
    errorTitle: "Не удалось подключиться",
    errorDetails: "Подробности ошибки",
    troubleshootingTitle: "Что проверить",
    troubleshooting: [
      "Убедитесь, что файл .env.local содержит корректные ключи",
      "Проверьте, что URL и ключ Supabase совпадают с настройками проекта",
      "Установите пакет @supabase/supabase-js командой npm install @supabase/supabase-js",
      "Перезапустите dev-сервер после обновления переменных окружения",
    ],
    backHome: "Вернуться на главную",
  },
  dashboard: {
    title: "Мои квизы",
    description: "Управляйте своими квизами и отслеживайте прогресс",
    stats: {
      totalQuizzes: "Всего квизов",
      completed: "Пройдено",
      averageScore: "Средний балл",
      currentStreak: "Текущий streak",
      days: "дней",
    },
    filters: {
      subject: "Предмет",
      allSubjects: "Все предметы",
      difficulty: "Сложность",
      all: "Все",
      difficulties: {
        easy: "Легкий",
        medium: "Средний",
        hard: "Сложный",
      },
      status: "Статус",
      statuses: {
        all: "Все квизы",
        completed: "Пройденные",
        notCompleted: "Не пройденные",
        excellent: "С отличным результатом",
      },
      sortBy: "Сортировка",
      sorting: {
        dateDesc: "Новые сначала",
        dateAsc: "Старые сначала",
        title: "По названию (А-Я)",
        score: "По результату (лучшие сначала)",
        attempts: "Чаще всего проходил",
      },
      resetFilters: "Сбросить фильтры",
    },
    card: {
      questions: "вопросов",
      created: "Создан",
      lastAttempt: "Последняя попытка",
      correct: "правильных",
      attempts: "попыток",
      notCompleted: "Квиз еще не пройден",
      retake: "Пройти снова",
      start: "Начать",
      viewResults: "Посмотреть результаты",
      menu: "Меню",
      history: "История попыток",
      share: "Поделиться",
      delete: "Удалить",
    },
    pagination: {
      previous: "Предыдущая",
      next: "Следующая",
    },
    empty: {
      noQuizzes: {
        title: "У вас пока нет квизов",
        description: "Создайте первый квиз из PDF и начните подготовку к ЦТ",
        action: "Создать квиз",
      },
      noResults: {
        title: "Квизы не найдены",
        description: "Попробуйте изменить фильтры",
        action: "Сбросить фильтры",
      },
    },
    deleteModal: {
      title: "Удалить квиз?",
      description: "Вы уверены что хотите удалить квиз \"{title}\"?",
      willBeDeleted: "Будут удалены",
      allQuestions: "Все вопросы",
      attemptHistory: "История попыток",
      uploadedFile: "Загруженный PDF файл",
      cannotUndo: "Это действие нельзя отменить.",
      cancel: "Отмена",
      deleteQuiz: "Удалить квиз",
      deleting: "Удаление...",
    },
  },
};
