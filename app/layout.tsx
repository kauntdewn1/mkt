import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProviderWrapper from '@/components/providers/auth-provider-wrapper';
import AppHeader from '@/components/layout/app-header';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProviderWrapper>
          <AppHeader />
          {children}
        </AuthProviderWrapper>
      </body>
    </html>
  );
} 
