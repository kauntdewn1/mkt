import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { FirebaseProvider } from '@/components/firebase-provider';
import { AuthProvider } from '@/contexts/auth-context'; // Import AuthProvider
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

export const metadata: Metadata = {
  title: 'FLWFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased font-sans`}>
        <FirebaseProvider>
          <AuthProvider> {/* Wrap with AuthProvider */}
            {children}
            <Footer />
          </AuthProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
