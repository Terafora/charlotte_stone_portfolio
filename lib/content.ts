/// <reference types="vite/client" />

export type ContentKind = 'work' | 'writing';

export type ContentItem = {
  slug: string;
  kind: ContentKind;
  title: string;
  summary: string;
  eyebrow: string;
  date: string;
  displayDate: string;
  accent: 'aqua' | 'lilac' | 'yellow' | 'coral' | 'pink';
  tags: string[];
  status?: string;
  readTime?: string;
  externalUrl?: string;
  icon?: string;
  featured: boolean;
  draft: boolean;
  order: number;
  body: string;
};

const modules = import.meta.glob('../content/{work,writing}/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function valueOf(frontmatter: Record<string, string>, key: string, fallback = '') {
  return frontmatter[key]?.trim() || fallback;
}

function parseFile(path: string, raw: string): ContentItem | null {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;

  const frontmatter = match[1].split(/\r?\n/).reduce<Record<string, string>>((values, line) => {
    const separator = line.indexOf(':');
    if (separator < 0) return values;
    values[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
    return values;
  }, {});

  const parts = path.replace(/\\/g, '/').split('/');
  const filename = parts.at(-1) ?? '';
  const folder = parts.at(-2);
  if ((folder !== 'work' && folder !== 'writing') || filename.startsWith('_')) return null;

  const date = valueOf(frontmatter, 'date', '2026-01-01');

  return {
    slug: filename.replace(/\.md$/, ''),
    kind: folder,
    title: valueOf(frontmatter, 'title', 'Untitled'),
    summary: valueOf(frontmatter, 'summary'),
    eyebrow: valueOf(frontmatter, 'eyebrow', folder === 'work' ? 'Case study' : 'Field note'),
    date,
    displayDate: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`)),
    accent: (valueOf(frontmatter, 'accent', 'aqua') as ContentItem['accent']),
    tags: valueOf(frontmatter, 'tags').split(',').map((tag) => tag.trim()).filter(Boolean),
    status: valueOf(frontmatter, 'status') || undefined,
    readTime: valueOf(frontmatter, 'readTime') || undefined,
    externalUrl: valueOf(frontmatter, 'externalUrl') || undefined,
    icon: valueOf(frontmatter, 'icon') || undefined,
    featured: valueOf(frontmatter, 'featured') === 'true',
    draft: valueOf(frontmatter, 'draft') === 'true',
    order: Number(valueOf(frontmatter, 'order', '99')),
    body: match[2].trim(),
  };
}

const allContent = Object.entries(modules)
  .map(([path, raw]) => parseFile(path, raw))
  .filter((item): item is ContentItem => Boolean(item && !item.draft));

export function getContent(kind: ContentKind) {
  return allContent
    .filter((item) => item.kind === kind)
    .sort((a, b) => kind === 'work' ? a.order - b.order : b.date.localeCompare(a.date));
}

export function getContentItem(kind: ContentKind, slug: string) {
  return allContent.find((item) => item.kind === kind && item.slug === slug);
}

export function getFeaturedContent() {
  return allContent.filter((item) => item.featured).sort((a, b) => a.order - b.order);
}
