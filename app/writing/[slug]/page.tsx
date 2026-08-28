import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentDetail } from '@/app/components/ContentDetail';
import { getContent, getContentItem } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getContent('writing').map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentItem('writing', slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    openGraph: { title: item.title, description: item.summary, images: [] },
    twitter: { card: 'summary', title: item.title, description: item.summary, images: [] },
  };
}

export default async function WritingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getContentItem('writing', slug);
  if (!item) notFound();
  return <ContentDetail item={item} />;
}
