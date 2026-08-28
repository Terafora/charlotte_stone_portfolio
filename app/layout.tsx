import type { Metadata } from 'next';
import { Limelight, Space_Grotesk } from 'next/font/google';
import { SiteChrome } from './components/SiteChrome';
import './globals.css';

const bodyFont = Space_Grotesk({ variable: '--font-body', subsets: ['latin'] });
const headingFont = Limelight({ variable: '--font-heading', weight: '400', subsets: ['latin'] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const ogImage = `${basePath}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Charlotte Stone — Product, UX & Software',
    template: '%s — Charlotte Stone',
  },
  description: 'Human-centred products, playful software and field notes by Charlotte Stone.',
  alternates: { canonical: `${basePath}/` },
  openGraph: {
    type: 'website',
    title: 'Charlotte Stone — Product, UX & Software',
    description: 'Human-centred products, playful software and field notes by Charlotte Stone.',
    url: `${basePath}/`,
    images: [{ url: ogImage, width: 1729, height: 910, alt: 'Charlotte Stone — Product, UX, Software, Learning, Play' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlotte Stone — Product, UX & Software',
    description: 'Human-centred products, playful software and field notes by Charlotte Stone.',
    images: [ogImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
