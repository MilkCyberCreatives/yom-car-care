import type { Metadata } from "next";

import LocaleHomePage, { generateMetadata as generateLocaleMetadata } from "../[locale]/page";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocaleMetadata({ params: { locale: "fr" } });
}

export default function FRHomePage() {
  return <LocaleHomePage params={{ locale: "fr" }} />;
}
