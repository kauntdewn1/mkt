export const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://flwff.io',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.flwff.io',
  environment: process.env.NODE_ENV || 'development'
} as const; 