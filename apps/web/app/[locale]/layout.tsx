import { AnalyticsScript } from "@analytics";
import { Toaster } from "@ui/components/toaster";
import { cn } from "@ui/lib";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { getMessagesForLocale } from "../../i18n";

import AOSProvider from "@shared/components/AOSProvider";
import { ApiClientProvider } from "@shared/components/ApiClientProvider";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: {
      absolute: t("seo.title"),
      default: t("seo.title"),
      template: `%s | ${t("seo.title")}`,
    },
    description: t("seo.desc"),
    keywords: t("seo.keywords"),
    openGraph: {
      title: t("seo.title"),
      description: t("seo.desc"),
      siteName: t("seo.siteName"),
      type: "website",
      url: t("seo.url"),
      images: [t("seo.icon")],
    },
    appleWebApp: true,
    viewport: "width=device-width, initial-scale=1",
  };
}

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }

  const messages = await getMessagesForLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={cn(
          "bg-background text-foreground min-h-screen font-sans antialiased",
          sansFont.variable,
        )}
      >
        <NextTopLoader color={"var(--colors-primary)"} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class">
            <AOSProvider>
              <ApiClientProvider>{children}</ApiClientProvider>
            </AOSProvider>
          </ThemeProvider>
          <Toaster />
        </NextIntlClientProvider>
        <AnalyticsScript />
      </body>
    </html>
  );
}
