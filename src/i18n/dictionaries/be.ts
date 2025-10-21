const landingHero = {
  badge: "Падрыхтоўка да ЦТ 2025",
  title: "Стварайце персанальныя квізы з PDF за 30 секунд",
  description:
    "Загружайце варыянты ЦТ, атрымлівайце гатовыя квізы і адсочвайце прагрэс вучняў у адзінай панэлі. Эканомце час і павышайце бал ужо ў першы дзень.",
  primaryCta: "Стварыць квіз бясплатна",
  primaryHref: "/upload",
  secondaryCta: "Паглядзець дэма",
  secondaryHref: "#demo",
  stats: [
    { value: "12 500+", label: "рашаных заданняў у месяц" },
    { value: "4.9/5", label: "сярэдняя ацэнка вучняў" },
    { value: "30+", label: "школ і цэнтраў падрыхтоўкі" },
  ],
};

const landingFaq = {
  tag: "FAQ",
  title: "Часта задаваныя пытанні",
  description:
    "Зарадзілі найбольш папулярныя пытанні ад вучняў, бацькоў і настаўнікаў. Наша падтрымка адказвае на працягу аднаго працоўнага дня.",
  items: [
    {
      question: "Ці можна загрузіць некалькі PDF адразу?",
      answer: "Так, выберыце да 5 файлаў за адзін раз — мы распазнаем іх паралельна і паведамім, калі квізы будуць гатовыя.",
    },
    {
      question: "Ці патрэбна ўсталёўка дадатковага ПЗ?",
      answer: "Не, LearningCraft працуе ў браўзеры на ноўтбуках, планшэтах і смартфонах.",
    },
    {
      question: "Як дзяліцца квізамі з вучнямі?",
      answer: "Стварыце групу або адправьце прамую спасылку. Можна абмежаваць час выканання і колькасць спроб.",
    },
    {
      question: "Ці ёсць зніжкі для школ і рэпетытарскіх цэнтраў?",
      answer: "Так, напішыце нам на partnerships@learningcraft.io — падрыхтуем індывідуальную прапанову.",
    },
  ],
};

const landingFinalCta = {
  tag: "Гатовыя да старту?",
  title: "Запусціце першы квіз сёння",
  description:
    "Паспрабуйце наглядны сцэнарый і пераканайцеся, як хутка вучні пераходзяць ад PDF да ўпэўненых вынікаў.",
  primaryCta: "Стварыць квіз бясплатна",
  primaryHref: "/upload",
  secondaryCta: "Звязацца з камандай",
  secondaryHref: "mailto:hello@learningcraft.io",
};

const landingSubjects = {
  tag: "Прадметы",
  title: "Адзін інструмент для ўсіх напрамкаў ЦТ",
  description:
    "Падтрымліваем ключавыя прадметы і рэгулярна дадаем новыя модулі. Кожны блок уключае заданні па ўзроўнях складанасці.",
  items: [
    {
      icon: "➗",
      title: "Матэматыка",
      description: "Формулы, геаметрыя і логіка з адаптыўнымі падказкамі і разбором рашэнняў.",
    },
    {
      icon: "🧪",
      title: "Хімія",
      description: "Аўтаматычная праверка ўраўненняў, трэнажор па разліковых задачах і перыядычным законе.",
    },
    {
      icon: "📚",
      title: "Руская мова",
      description: "Арфаграфія, пунктуацыя і аналіз тэксту з імгненнай зваротнай сувяззю.",
    },
    {
      icon: "🌍",
      title: "Гісторыя і грамадства",
      description: "Тэматычныя падборкі і карткі дат, замацаванне ведаў у фармаце блиц-квізаў.",
    },
    {
      icon: "🧬",
      title: "Біялогія",
      description: "Табліцы, схемы і тэсты па фізіялогіі, генетыцы і экалогіі.",
    },
    {
      icon: "💡",
      title: "Фізіка",
      description: "Задачы з графікамі, генерацыя варыянтаў і праверка формул.",
    },
  ],
};

const landingTestimonials = {
  tag: "Водгукі",
  title: "Нас раяць настаўнікі і вучні",
  description:
    "Слухаем карыстальнікаў і развіваем прадукт разам з імі. Вось некалькі гісторый поспеху першых кагортаў.",
  items: [
    {
      name: "Наталля Сапега",
      role: "Настаўніца па матэматыцы, Мінск",
      quote:
        "Перанесла ўсе друкаваныя матэрыялы ў LearningCraft і вызваліла да 6 гадзін у тыдзень на індывідуальную працу з вучнямі.",
    },
    {
      name: "Даніла Раманаў",
      role: "Абітурыент, паступіў у БДУ",
      quote:
        "За два месяцы трэніровак па квізах падняў сярэдні бал з 58 да 82. Асабліва дапамаглі аналітыка памылак і чэленджы.",
    },
    {
      name: "Алена Баравік",
      role: "Куратар адукацыйнага цэнтра",
      quote:
        "Мы падключылі 4 групы і бачым прагрэс у рэальным часе. Каманда хутка рэагуе на зваротную сувязь.",
    },
  ],
};

const landingPricing = {
  tag: "Тарыфы",
  title: "Выберыце прыдатны фармат",
  description:
    "Пачніце бясплатна і падключайце пашыраныя магчымасці па меры росту каманды або колькасці вучняў.",
  plans: [
    {
      name: "Starter",
      price: "0 BYN",
      period: "у месяц",
      description: "Для самастойнай падрыхтоўкі або першых груп",
      features: [
        "1 настаўнік",
        "Да 3 квізаў у месяц",
        "Базавая аналітыка",
      ],
      ctaLabel: "Паспрабаваць",
      ctaHref: "/upload",
      mostPopular: false,
    },
    {
      name: "Team",
      price: "49 BYN",
      period: "у месяц",
      description: "Для рэпетытараў і навучальных цэнтраў",
      features: [
        "Да 10 настаўнікаў",
        "Неабмежаваныя квізы",
        "Пашыраная аналітыка і справаздачы",
        "Чэленджы і рэйтынгі",
      ],
      ctaLabel: "Аформіць",
      ctaHref: "mailto:hello@learningcraft.io",
      mostPopular: true,
    },
    {
      name: "Enterprise",
      price: "Па запыце",
      period: "",
      description: "Для сетак школ і EdTech-праектаў",
      features: [
        "SLA і выдзеленая падтрымка",
        "Інтэграцыя з LMS",
        "Навучанне каманды",
        "Доступ да roadmap",
      ],
      ctaLabel: "Запытаць дэма",
      ctaHref: "mailto:partnerships@learningcraft.io",
      mostPopular: false,
    },
  ],
};

const landingNavigation = {
  brand: {
    name: "LearningCraft",
    subtitle: "Платформа падрыхтоўкі да ЦТ і алімпіяд",
  },
  links: [
    { label: "Перавагі", href: "#features" },
    { label: "Вынікі", href: "#social-proof" },
    { label: "Як працуе", href: "#how-it-works" },
    { label: "Дэма", href: "#demo" },
    { label: "Прадметы", href: "#subjects" },
    { label: "Водгукі", href: "#testimonials" },
    { label: "Тарыфы", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  ctas: {
    primary: { label: "Стварыць квіз бясплатна", href: "/upload" },
    secondary: { label: "Увайсці", href: "/auth/signin" },
  },
  languageLabel: "Мова",
  mobileMenuLabel: "Меню",
};

const landingFeatures = {
  tag: "Магчымасці",
  title: "Поўны цыкл падрыхтоўкі да ЦТ",
  description:
    "LearningCraft аб'ядноўвае аўтаматызацыю задач, аналітыку вынікаў і падтрымку настаўнікаў, каб кожны вучань упэўнена падыходзіў да экзамену.",
  items: [
    {
      icon: "⚡️",
      title: "Аўтагенерацыя квізаў",
      description:
        "Загружайце PDF-варыянты і атрымлівайце гатовыя тэсты з разборам і таймерам за 30 секунд.",
    },
    {
      icon: "🎯",
      title: "Адаптыўныя планы",
      description:
        "Сістэма падстройвае заданні пад слабкія месцы вучня і прапануе шлях умацавання навыкаў.",
    },
    {
      icon: "📊",
      title: "Аналітыка ў рэальным часе",
      description:
        "Адсочвайце спробы, працэнт правільных адказаў і прагрэс груп на адным дашбордзе.",
    },
    {
      icon: "🤝",
      title: "Рэжым настаўніка",
      description:
        "Прызначайце дамашнія заданні, пакідайце каментары і сачыце за дынамікай усяй групы.",
    },
    {
      icon: "🧩",
      title: "Банк заданняў",
      description:
        "Доступ да правераных заданняў і аўтарскіх варыянтаў выкладчыкаў, падзеленых па прадметах і тэмах.",
    },
    {
      icon: "📣",
      title: "Матывацыйныя чэленджы",
      description:
        "Запускайце турніры з рэйтынгамі, каб утрымліваць цікавасць вучняў і павышаць уцягнутасць.",
    },
  ],
};

const landingSteps = {
  tag: "Хуткі старт",
  title: "Тры крокі да першага квіза",
  description:
    "Шлях ад PDF-файла да аналітыкі па класе займае менш за адну хвіліну.",
  items: [
    {
      title: "1. Загрузіце PDF",
      description: "Платформа распазнае структуру дакумента і створыць набор пытанняў аўтаматычна.",
    },
    {
      title: "2. Адпраўце вучням",
      description: "Падзяліцеся спасылкай або прызначце заданне групе, каб прайсці трэніроўку.",
    },
    {
      title: "3. Прааналізуйце вынікі",
      description: "Атрымайце справаздачу па кожным вучні і рэкамендацыі для наступнага занятку.",
    },
  ],
};

const landingHowItWorks = {
  tag: "Як гэта працуе",
  title: "Усё пад кантролем у настаўніка і вучня",
  description:
    "Мы сінхранізуем досвед педагога і матывацыю вучня: ад загрузкі матэрыялаў да замацавання ведаў і кантролю вынікаў.",
  steps: [
    {
      label: "Імпарт",
      title: "Загружаеце матэрыялы",
      description: "Платформа распазнае PDF, структуруе заданні і дзеліць іх на блокі складанасці.",
      duration: "10 с",
      result: "Гатовы квіз з настройкамі таймера",
    },
    {
      label: "Практыка",
      title: "Прызначаеце трэніроўкі",
      description: "Вучні праходзяць тэст у браўзеры, атрымліваюць імгненную зваротную сувязь і падказкі па тэмах.",
      duration: "15-20 хв",
      result: "Рэальныя балы за кожную спробу",
    },
    {
      label: "Аналітыка",
      title: "Сачыце за прагрэсам",
      description: "Дашборд паказвае, дзе вучню патрэбна дапамога і якія тэмы варта паўтарыць.",
      duration: "15 с",
      result: "Рэкамендацыі для наступнага занятку",
    },
  ],
  cta: {
    label: "Паспрабаваць сцэнарый",
    href: "/upload",
  },
};

const landingCommunity = {
  tag: "Супольнасць",
  title: "Досвед настаўнікаў і каманды падтрымкі",
  description:
    "Мы дапамагаем будаваць гнуткія каманды, абменьвацца вопытам і атрымліваць зваротную сувязь ад лідэраў галіны.",
  quote:
    "LearningCraft — прастора, дзе адукацыйныя прадукты ствараюцца як стартапы: хутка, усвядомлена і з падтрымкай на кожным этапе.",
  quoteAuthor: "Каманда LearningCraft Labs",
  testimonials: [
    {
      name: "Марыя Іванава",
      role: "Product Designer, SkillForge",
      quote:
        "LearningCraft дапамог структуравалі веды і атрымаць першых вучняў ужо праз месяц.",
    },
    {
      name: "Аляксей Пятроў",
      role: "Head of Learning, FutureLab",
      quote:
        "Платформа эканоміць дзясяткі гадзін на запуск адукацыйных праграм і падтрымлівае каманду ў тоне.",
    },
  ],
};

const landingCta = {
  tag: "Гатовыя пачаць?",
  title: "Далучайцеся да першага кагорту LearningCraft",
  description:
    "Атрымайце доступ да жывых сесій, практычных спрынтаў і супольнасці, якая падтрымае на шляху да рэлізу.",
  primaryCta: "Запытаць дэма",
  secondaryCta: "Напісаць камандзе",
};

const landingPreview = {
  label: "Прыклад квіза",
  sprintTag: "Новы набор",
  sprintTitle: "ЦТ. Матэматыка · Модуль 3",
  sprintDescription:
    "PDF ператвораны ў інтэрактыўны квіз. Настаўнік сочыць за дынамікай, вучні атрымліваюць імгненную зваротную сувязь.",
  progressPercent: 72,
  progressLabel: "72%",
  teamLabel: "Група падрыхтоўкі",
  activityLabel: "Статус",
  members: [
    { name: "Палiна", status: "Стварае заданні" },
    { name: "Андрэй", status: "Праходзіць трэніроўку" },
    { name: "LC Team", status: "Аналізуе вынікі" },
  ],
};

const landingSocialProof = {
  tag: "Нам давяраюць",
  title: "LearningCraft дапамагае выпускнікам і настаўнікам",
  description: "Лічбы і партнёры, якія пацвярджаюць эфектыўнасць платформы.",
  metrics: [
    { value: "30%", label: "канверсія наведвальнікаў у стварэнне квіза" },
    { value: "5 хв", label: "сярэдні час запуску першага квіза" },
    { value: "38%", label: "bounce rate на мэтавых старонках" },
  ],
  logos: [
    { name: "Акадэмія ЦТ", initials: "AC" },
    { name: "STEM Camp", initials: "SC" },
    { name: "Future Skills Lab", initials: "FSL" },
    { name: "Аснова Education", initials: "AE" },
  ],
  press: [
    {
      quote:
        "LearningCraft пераносіць падрыхтоўку да ЦТ у лічбавы фармат і робіць яе даступнай кожнай школе.",
      source: "EdTech Review",
      href: "https://example.com/edtech-review",
    },
    {
      quote:
        "Платформа паскарае працу педагогаў у некалькі разоў і дапамагае адсочваць прагрэс вучняў.",
      source: "BelEdTech",
      href: "https://example.com/beledtech",
    },
  ],
};

const landingDemo = {
  tag: "Дэма-сцэнарый",
  title: "Як ствараецца квіз і як яго бачыць вучань",
  description:
    "Смадэлюйце шлях за 30 секунд: ад загрузкі варыянта да аналітыкі вынікаў. Ніякіх усталёвак, усё ў браўзеры.",
  stats: [
    { value: "30 с", label: "да першага пытання" },
    { value: "25+", label: "аўтаматычна створаных заданняў" },
    { value: "3 рэжымы", label: "вучань · настаўнік · каманда" },
  ],
  highlights: [
    {
      title: "Загрузка PDF",
      description: "Перацягніце файл або ўстаўце спасылку — сістэма распазнае тэкст і ілюстрацыі.",
    },
    {
      title: "Рэдактар",
      description: "Пры неабходнасці выправіце варыянты адказаў, расстаўце тэгі і ўзровень складанасці.",
    },
    {
      title: "Рэжым вучня",
      description: "Запускайце трэніроўку, сачыце за таймерам і атрымлівайце падказкі па памылках.",
    },
    {
      title: "Аналітыка",
      description: "Праглядайце справаздачу па кожным вучні і адпраўляйце рэкамендацыі ў адзін клік.",
    },
  ],
  cta: {
    label: "Паглядзець прыклад квіза",
    href: "#cta",
  },
};

export const dictionary = {
  nav: {
    features: "Магчымасці",
    steps: "Як гэта працуе",
    community: "Супольнасць",
    createQuiz: "Стварыць Quiz",
    join: "Далучыцца",
    menu: "Меню",
    signIn: "Увайсці",
  },
  auth: {
    profile: "Профіль",
    myQuizzes: "Мае квізы",
    settings: "Налады",
    signOut: "Выйсці",
    signIn: "Увайсці",
    signUp: "Рэгістрацыя",
  },
  brand: {
    subtitle: "Ствараем і развіваем EdTech-прадукты",
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
  hero: landingHero,
  features: landingFeatures,
  steps: landingSteps,
  community: landingCommunity,
  cta: landingCta,
  preview: landingPreview,
  footer: {
    support: "Падтрымка",
    privacy: "Палітыка канфідэнцыйнасці",
    terms: "Карыстальніцкае пагадненне",
    rights: "Усе правы абаронены.",
  },
  testSupabase: {
    title: "Праверка падключэння да Supabase",
    testingMessage: "Правяраем злучэнне з Supabase...",
    successTitle: "Злучэнне паспяховае!",
    successSubtitle: "Праверка завершана.",
    messageTablesFound: "Падключэнне актыўнае, табліцы даступныя.",
    messageNoTables:
      "Злучэнне ўсталявана! Табліцы яшчэ не створаныя — усё гатова да дабаўлення даных.",
    noteNoTables:
      "Стварыце табліцы ў панэлі Supabase, каб пачаць працу з данымі.",
    connectionDetails: "Дэталі падключэння",
    statusLabel: "Статус",
    statusConnected: "Падключана",
    urlLabel: "URL",
    authLabel: "Аўтэнтыфікацыя",
    authenticated: "Так",
    anonymous: "Не (ананімны доступ)",
    nextSteps: "Наступныя крокі",
    openDashboard: "Адкрыць панэль Supabase",
    errorTitle: "Не атрымалася падключыцца",
    errorDetails: "Падрабязнасці памылкі",
    troubleshootingTitle: "Што праверыць",
    troubleshooting: [
      "Упэўніцеся, што файл .env.local змяшчае карэктныя ключы",
      "Праверце, што URL і ключ Supabase супадаюць з наладамі праекта",
      "Усталюйце пакет @supabase/supabase-js камандай npm install @supabase/supabase-js",
      "Перазапусціце dev-сервер пасля абнаўлення зменных асяроддзя",
    ],
    backHome: "Вярнуцца на галоўную",
  },
  dashboard: {
    title: "Мае квізы",
    description: "Кіруйце сваімі квізамі і адсочвайце прагрэс",
    stats: {
      totalQuizzes: "Усяго квізаў",
      completed: "Пройдзена",
      averageScore: "Сярэдні бал",
      currentStreak: "Бягучы streak",
      days: "дзён",
    },
    filters: {
      subject: "Прадмет",
      allSubjects: "Усе прадметы",
      difficulty: "Складанасць",
      all: "Усе",
      difficulties: {
        easy: "Лёгкі",
        medium: "Сярэдні",
        hard: "Складаны",
      },
      status: "Статус",
      statuses: {
        all: "Усе квізы",
        completed: "Пройдзеныя",
        notCompleted: "Не пройдзеныя",
        excellent: "З выдатным вынікам",
      },
      sortBy: "Сартаванне",
      sorting: {
        dateDesc: "Новыя спачатку",
        dateAsc: "Старыя спачатку",
        title: "Па назве (А-Я)",
        score: "Па выніку (лепшыя спачатку)",
        attempts: "Часцей за ўсё праходзіў",
      },
      resetFilters: "Скінуць фільтры",
    },
    card: {
      questions: "пытанняў",
      created: "Створаны",
      lastAttempt: "Апошняя спроба",
      correct: "правільных",
      attempts: "спроб",
      notCompleted: "Квіз яшчэ не пройдзены",
      retake: "Прайсці зноў",
      start: "Пачаць",
      viewResults: "Паглядзець вынікі",
      menu: "Меню",
      history: "Гісторыя спроб",
      share: "Падзяліцца",
      delete: "Выдаліць",
    },
    pagination: {
      previous: "Папярэдняя",
      next: "Наступная",
    },
    empty: {
      noQuizzes: {
        title: "У вас пакуль няма квізаў",
        description: "Стварыце першы квіз з PDF і пачніце падрыхтоўку да ЦТ",
        action: "Стварыць квіз",
      },
      noResults: {
        title: "Квізы не знойдзены",
        description: "Паспрабуйце змяніць фільтры",
        action: "Скінуць фільтры",
      },
    },
    deleteModal: {
      title: "Выдаліць квіз?",
      description: "Вы ўпэўнены што хочаце выдаліць квіз \"{title}\"?",
      willBeDeleted: "Будуць выдалены",
      allQuestions: "Усе пытанні",
      attemptHistory: "Гісторыя спроб",
      uploadedFile: "Загружаны PDF файл",
      cannotUndo: "Гэта дзеянне нельга адмяніць.",
      cancel: "Адмена",
      deleteQuiz: "Выдаліць квіз",
      deleting: "Выдаленне...",
    },
  },
};
