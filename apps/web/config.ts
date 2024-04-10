export const appConfig = {
  i18n: {
    locales: ["en", "fr"] as const,
    defaultLocale: "en" as const,
    localeLabels: {
      en: "English",
      fr: "France",
      // es: "Español",
      // de: "Deutsch",
    },
    localeCurrencies: {
      /* This only works with Stripe for now. For LemonSqueezy, we need to set the currency in the LemonSqueezy dashboard and there can only be one. */
      en: "USD",
      fr: "USD",
      // de: "USD",
      // es: "USD",
    },
    localeFlags: {
      en: "/images/lang/en.png",
      fr: "/images/lang/france.png",
    },
  },
  auth: {
    oAuthProviders: ["google", "github"],
  },
  marketing: {
    menu: [
      {
        translationKey: "howItWork",
        href: "/work-process",
      },
      {
        translationKey: "pricing",
        href: "/pricing",
      },
      {
        translationKey: "blog",
        href: "/Blog",
      },
    ],
  },
  teams: {
    avatarColors: ["#7976d2", "#9dbee5", "#8e7db7", "#d29776"],
  },
  api: "https://api.mailrapido.com/api",
};
