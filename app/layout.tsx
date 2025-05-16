import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppHeader from '@/components/layout/app-header';
import AuthProviderWrapper from '@/components/providers/auth-provider-wrapper';
import PageFooter from '@/components/layout/page-footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: '$MKS',
  description: '$MKS - Digital marketing project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} antialiased`}>
        <AuthProviderWrapper>
          <div className="relative flex min-h-screen flex-col">
            <AppHeader />
            {children}
          </div>
          <PageFooter />
        </AuthProviderWrapper>
      </body>
    </html>
  );
} 
