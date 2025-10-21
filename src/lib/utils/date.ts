/**
 * Format a date to relative time (e.g., "2 дня назад")
 */
export function formatRelativeTime(date: string | Date, locale: string = 'ru'): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return locale === 'ru' ? 'только что' : 'толькі што';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return locale === 'ru'
      ? `${diffInMinutes} ${pluralize(diffInMinutes, 'минуту', 'минуты', 'минут')} назад`
      : `${diffInMinutes} ${pluralizeBe(diffInMinutes, 'хвіліну', 'хвіліны', 'хвілін')} таму`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return locale === 'ru'
      ? `${diffInHours} ${pluralize(diffInHours, 'час', 'часа', 'часов')} назад`
      : `${diffInHours} ${pluralizeBe(diffInHours, 'гадзіну', 'гадзіны', 'гадзін')} таму`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return locale === 'ru'
      ? `${diffInDays} ${pluralize(diffInDays, 'день', 'дня', 'дней')} назад`
      : `${diffInDays} ${pluralizeBe(diffInDays, 'дзень', 'дні', 'дзён')} таму`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return locale === 'ru'
      ? `${diffInMonths} ${pluralize(diffInMonths, 'месяц', 'месяца', 'месяцев')} назад`
      : `${diffInMonths} ${pluralizeBe(diffInMonths, 'месяц', 'месяцы', 'месяцаў')} таму`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return locale === 'ru'
    ? `${diffInYears} ${pluralize(diffInYears, 'год', 'года', 'лет')} назад`
    : `${diffInYears} ${pluralizeBe(diffInYears, 'год', 'гады', 'гадоў')} таму`;
}

/**
 * Russian pluralization
 */
function pluralize(count: number, one: string, few: string, many: string): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return few;
  }
  return many;
}

/**
 * Belarusian pluralization
 */
function pluralizeBe(count: number, one: string, few: string, many: string): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return few;
  }
  return many;
}
