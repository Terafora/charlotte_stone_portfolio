import type { ContentItem } from '@/lib/content';
import { MarkdownBody } from './MarkdownBody';
import { ContentIcon } from './ContentIcon';
import { SiteLink as Link } from './SiteLink';

export function ContentDetail({ item }: { item: ContentItem }) {
  return (
    <article className={`detail-page detail-page--${item.accent}`}>
      <header className="detail-hero">
        <Link className="back-link" href={`/${item.kind}`}>← Back to {item.kind}</Link>
        <p className="eyebrow">{item.eyebrow}</p>
        <h1>{item.title}</h1>
        <p className="detail-hero__summary">{item.summary}</p>

        <div className="detail-meta">
          <div><span>Published</span><strong>{item.displayDate}</strong></div>
          <div><span>{item.kind === 'work' ? 'Status' : 'Length'}</span><strong>{item.status ?? item.readTime}</strong></div>
          <div><span>Topics</span><strong>{item.tags.join(' · ')}</strong></div>
        </div>
      </header>

      <div className="detail-layout">
        <aside className="detail-aside">
          <ContentIcon
            className="detail-aside__shape"
            fallback={item.kind === 'work' ? '↗' : '✦'}
            item={item}
          />
          <p>{item.kind === 'work' ? 'A closer look at the thinking behind the thing.' : 'An idea written down before it could disappear.'}</p>
          {item.externalUrl && (
            <a className="button button--dark" href={item.externalUrl} target="_blank" rel="noreferrer">
              Visit project <span aria-hidden="true">↗</span>
            </a>
          )}
        </aside>
        <MarkdownBody body={item.body} />
      </div>

      <footer className="detail-footer">
        <p className="eyebrow">Keep exploring</p>
        <Link href={`/${item.kind}`}>See all {item.kind} <span aria-hidden="true">→</span></Link>
      </footer>
    </article>
  );
}
