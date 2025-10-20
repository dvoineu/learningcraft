interface FeaturesProps {
  dictionary: {
    features: {
      tag: string;
      title: string;
      description: string;
      items: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
  };
}

export function Features({ dictionary }: FeaturesProps) {
  return (
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
  );
}
