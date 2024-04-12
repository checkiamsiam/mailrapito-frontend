import { AnalyticsScript } from "@analytics";
import { Toaster } from "@ui/components/toaster";
import { cn } from "@ui/lib";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { Inter } from "next/font/google";
// import localFont from "next/font/local";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { getMessagesForLocale } from "../../i18n";

import AOSProvider from "@shared/components/AOSProvider";
import { ApiClientProvider } from "@shared/components/ApiClientProvider";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import "./globals.css";

//const preospe = localFont({ src: '../../public/fonts/Preospe.otf', display: 'swap' })

// const vector = localFont({
//   src: [
//     {
//       path: '../../public/fonts/vector_regular_otf-webfont.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/vector_italic_ttf-webfont.woff2',
//       weight: '400',
//       style: 'italic',
//     },
//     {
//       path: '../../public/fonts/vector_bold_ttf-webfont.woff2',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/vector_bold_italic_ttf-webfont.woff2',
//       weight: '700',
//       style: 'italic',
//     },
//   ],
// })

// const francy = localFont({
//   src: [
//     {
//       path: '../../public/fonts/Francy.woff',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/Francy.woff2',
//       weight: '400',
//       style: 'normal',
//     }
//   ],
// })

// const braked = localFont({
//   src: [
//     {
//       path: '../../public/fonts/BRAKED-Bold.woff',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/BRAKED-Semibold.woff',
//       weight: '550',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/BRAKED.woff',
//       weight: '400',
//       style: 'normal',
//     }
//   ],
// })

// const attack = localFont({
//   src: [
//     {
//       path: '../../public/fonts/ATTACK-Regular.woff',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/ATTACK-Bold.woff',
//       weight: '700',
//       style: 'normal',
//     }
//   ],
// })

// const archi = localFont({
//   src: [
//     {
//       path: '../../public/fonts/Archi-Italic.ttf',
//       weight: '400',
//       style: 'italic',
//     },
//     {
//       path: '../../public/fonts/Archi-Italic.woff',
//       weight: '400',
//       style: 'italic',
//     },
//     {
//       path: '../../public/fonts/Archi-Italic.woff2',
//       weight: '400',
//       style: 'italic',
//     },
//     {
//       path: '../../public/fonts/Archi-Reguler.ttf',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/Archi-Reguler.woff',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/Archi-Reguler.woff2',
//       weight: '700',
//       style: 'normal',
//     }
//   ],
// })

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

// const poppins = Inter({
//   subsets: ["latin"],
//   display: 'swap',
//   variable: "--font-poppins",
// });

const montserrat = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-montserrat",
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
          montserrat.className,
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
