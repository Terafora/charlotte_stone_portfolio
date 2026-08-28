import type { ContentItem } from '@/lib/content';
import { ContentIcon } from './ContentIcon';
import { SiteLink as Link } from './SiteLink';

export function ContentIndex({
  kind,
  items,
}: {
  kind: 'work' | 'writing';
  items: ContentItem[];
}) {
  const isWork = kind === 'work';

  return (
    <div className={`index-page index-page--${kind}`}>
      <header className="page-intro">
        <p className="eyebrow">{isWork ? 'Selected projects & experiments' : 'Notes from the workbench'}</p>
        <h1>{isWork ? 'Work' : 'Writing'}</h1>
        <p>
          {isWork
            ? 'Product work, released tools and independent experiments—shown through the problems, decisions and lessons behind them.'
            : 'Field notes about humane technology, learning by making, product decisions and ideas that are still taking shape.'}
        </p>
      </header>

      <div className="content-list">
        {items.map((item, index) => (
          <article className={`content-row content-row--${item.accent}`} key={item.slug}>
            <Link href={`/${kind}/${item.slug}`}>
              <div className="content-row__number">
                <span>{String(index + 1).padStart(2, '0')}</span>
                {isWork && item.icon && (
                  <ContentIcon className="content-row__icon" fallback="↗" item={item} />
                )}
              </div>
              <div className="content-row__main">
                <p className="eyebrow">{item.eyebrow}</p>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <ul aria-label="Topics">
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
              <div className="content-row__meta">
                <span>{item.status ?? item.readTime}</span>
                <span>{item.displayDate}</span>
                <b aria-hidden="true">↗</b>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <aside className="content-note">
        <p className="eyebrow">A living archive</p>
        <p>
          This collection will grow as the work does. Some entries are polished
          releases; others are honest snapshots of an idea in motion.
        </p>
      </aside>
    </div>
  );
}
