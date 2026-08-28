import type { Metadata } from 'next';
import { ContentIndex } from '@/app/components/ContentIndex';
import { getContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Product case studies, released tools and independent experiments by Charlotte Stone.',
};

export default function WorkPage() {
  return <ContentIndex kind="work" items={getContent('work')} />;
}
