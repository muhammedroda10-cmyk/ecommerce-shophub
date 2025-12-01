import type { Metadata } from 'next';
import { jakarta, inter, jetbrainsMono } from '@/lib/fonts';
import '@/styles/globals.css';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';
import { AuthProvider } from '@/components/features/AuthProvider';

export const metadata: Metadata = {
  title: 'ShopHub - Modern E-Commerce Marketplace',
  description: 'Discover amazing products from trusted sellers worldwide',
  keywords: 'ecommerce, marketplace, shopping, online store',
  authors: [{ name: 'ShopHub' }],
  openGraph: {
    title: 'ShopHub - Modern E-Commerce Marketplace',
    description: 'Discover amazing products from trusted sellers worldwide',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased">
        <AuthProvider>
          <Navigation />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
