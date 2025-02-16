export const APP_CONSTANTS = {
  appName: "Marketplace",
  defaultLocale: "en",
  supportedLocales: ["en", "es", "fr"],
  userTypes: {
    BUYER: "buyer",
    SELLER: "seller",
  } as const,
  validation: {
    password: {
      minLength: 8,
      maxLength: 50,
    },
    name: {
      minLength: 2,
      maxLength: 50,
    },
  },
};
