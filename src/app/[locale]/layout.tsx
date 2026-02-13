import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Inter, Noto_Kufi_Arabic } from "next/font/google"; // 1. Import Noto
import { locales } from "@/lib/i18n";
import { ClientProviders } from "@/components/ClientProviders";
import "../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

// 2. Configure Noto Kufi Arabic
const noto = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "AmanTrack | HSE Safety Management Platform",
    ar: "AmanTrack | منصة إدارة السلامة والصحة المهنية",
    fr: "AmanTrack | Plateforme de gestion de la sécurité HSE",
  };

  const descriptions: Record<string, string> = {
    en: "Professional safety equipment tracking and compliance management",
    ar: "نظام احترافي لتتبع معدات السلامة وإدارة الامتثال",
    fr: "Suivi professionnel des équipements de sécurité et gestion de la conformité",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) notFound();

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.warn(
      `Messages for locale "${locale}" not found, falling back to English`,
    );
    messages = (await import(`@/messages/en.json`)).default;
  }

  // 3. Determine the correct font class based on locale
  const fontClass = locale === "ar" ? noto.className : inter.className;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      {/* 4. Apply the dynamic font class */}
      <body className={fontClass}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
