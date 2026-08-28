import type { Metadata } from 'next';
import { ContentIndex } from '@/app/components/ContentIndex';
import { getContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Field notes on humane technology, learning by making and product decisions by Charlotte Stone.',
};

export default function WritingPage() {
  return <ContentIndex kind="writing" items={getContent('writing')} />;
}
