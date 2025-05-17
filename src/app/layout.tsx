import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { FirebaseProvider } from '@/components/firebase-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import Footer from '@/components/layout/page-footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '700'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
};

export const metadata: Metadata = {
  title: {
    template: '%s | FLWFF',
    default: 'FLWFF - Token Oficial',
  },
  description: 'Token oficial da FLWFF, construindo o futuro da web3.',
  keywords: ['FLWFF', 'token', 'web3', 'blockchain', 'cryptocurrency'],
  authors: [{ name: 'FLWFF Team' }],
  creator: 'FLWFF',
  publisher: 'FLWFF',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://flwff.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://flwff.com',
    title: 'FLWFF - Token Oficial',
    description: 'Token oficial da FLWFF, construindo o futuro da web3.',
    siteName: 'FLWFF',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FLWFF - Token Oficial',
    description: 'Token oficial da FLWFF, construindo o futuro da web3.',
    creator: '@flwff',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content={viewport.toString()} />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased font-sans bg-black text-white`} suppressHydrationWarning>
        <FirebaseProvider>
          <AuthProvider>
            <main className="flex flex-col min-h-screen">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
