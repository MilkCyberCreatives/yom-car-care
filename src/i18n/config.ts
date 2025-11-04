export const locales = ["en", "fr"] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = "en";

export function isLocale(v: string | undefined): v is Locale {
  return !!v && (locales as readonly string[]).includes(v);
}
