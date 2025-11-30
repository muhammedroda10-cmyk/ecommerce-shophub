import type { Metadata } from 'next';
import { jakarta, inter, jetbrainsMono } from '@/lib/fonts';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ShopHub - Modern E-Commerce Marketplace',
  description:
    'Discover amazing products from sellers around the world. Shop electronics, fashion, home goods and more on ShopHub.',
  keywords: ['ecommerce', 'marketplace', 'shopping', 'online store', 'products'],
  authors: [{ name: 'ShopHub Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shophub.com',
    title: 'ShopHub - Modern E-Commerce Marketplace',
    description: 'Discover amazing products from sellers around the world',
    siteName: 'ShopHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShopHub - Modern E-Commerce Marketplace',
    description: 'Discover amazing products from sellers around the world',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
