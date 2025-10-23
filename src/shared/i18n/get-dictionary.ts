import type { Locale } from "./config";

export type Dictionary = typeof import("./dictionaries/ru").dictionary;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "ru": {
      const module = await import("./dictionaries/ru");
      return module.dictionary;
    }
    case "be": {
      const module = await import("./dictionaries/be");
      return module.dictionary;
    }
    default: {
      const module = await import("./dictionaries/ru");
      return module.dictionary;
    }
  }
}
