import { getContent } from '@/lib/content';
import { XmbHome, type XmbItem } from './components/XmbHome';

export default function Home() {
  const projects: XmbItem[] = getContent('work').map((item) => ({
    title: item.title,
    subtitle: item.eyebrow.replace(/^[^·]+·\s*/, ''),
    summary: item.summary,
    href: `/work/${item.slug}`,
    icon: item.icon,
  }));
  const writing: XmbItem[] = getContent('writing').map((item) => ({
    title: item.title,
    subtitle: item.readTime ?? 'Field note',
    summary: item.summary,
    href: `/writing/${item.slug}`,
  }));

  return <XmbHome projects={projects} writing={writing} />;
}
