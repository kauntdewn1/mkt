export const assets = {
  images: {
    favicon: '/favicon.ico',
    logo: {
      light: '/img/logo-light.png',
      dark: '/img/logo-dark.png',
    },
    icons: {
      apple: '/apple-touch-icon.png',
      pwa: {
        small: '/icon-192.png',
        large: '/icon-512.png',
      },
    },
  },
  manifest: '/site.webmanifest',
  robots: '/robots.txt',
} as const; 