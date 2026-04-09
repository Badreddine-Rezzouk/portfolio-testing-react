export function getLocalizedField<T>(field: T | Record<string, T> | undefined, locale: string, defaultLocale: string = 'en'): T | undefined {
  if (field === undefined) return undefined;
  if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
    const localized = (field as Record<string, T>)[locale];
    if (localized !== undefined) return localized;
    return (field as Record<string, T>)[defaultLocale];
  }
  return field as T;
}
