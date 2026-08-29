import type { Metadata } from 'next';
import { Limelight, Space_Grotesk } from 'next/font/google';
import { SiteChrome } from './components/SiteChrome';
import './globals.css';
import './xmb.css';

const bodyFont = Space_Grotesk({ variable: '--font-body', subsets: ['latin'] });
const headingFont = Limelight({ variable: '--font-heading', weight: '400', subsets: ['latin'] });
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (vercelProductionHost
    ? `https://${vercelProductionHost}`
    : 'https://charlotte-stone-portfolio.charlie-stone649.chatgpt.site');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const canonicalUrl = new URL(`${basePath}/`, siteUrl).toString();
const ogImage = new URL(`${basePath}/og.png`, siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Charlotte Stone — Software Engineer & Product Maker',
    template: '%s — Charlotte Stone',
  },
  description: 'Human-centred products, privacy-respecting software and field notes by Charlotte Stone.',
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: 'website',
    title: 'Charlotte Stone — Software Engineer & Product Maker',
    description: 'Human-centred products, privacy-respecting software and field notes by Charlotte Stone.',
    url: canonicalUrl,
    siteName: 'Charlotte Stone',
    images: [{
      url: ogImage,
      width: 1200,
      height: 630,
      alt: 'Charlotte Stone — Software Engineer & Product Maker',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlotte Stone — Software Engineer & Product Maker',
    description: 'Human-centred products, privacy-respecting software and field notes by Charlotte Stone.',
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
