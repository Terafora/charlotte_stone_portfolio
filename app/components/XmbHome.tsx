'use client';

import { useEffect, useMemo, useState } from 'react';
import { SiteLink, withSiteBasePath } from './SiteLink';
import { WaveBackground } from './WaveBackground';

export type XmbItem = {
  title: string;
  subtitle: string;
  href: string;
  summary: string;
  icon?: string;
};

type Category = {
  id: 'about' | 'work' | 'projects' | 'writing' | 'contact';
  label: string;
  href: string;
  summary: string;
  items?: XmbItem[];
};

function isEditable(target: EventTarget | null) {
  return target instanceof HTMLElement
    && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

function SystemClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!now) return <span className="xmb-clock" aria-hidden="true">--:--</span>;

  return (
    <div className="xmb-clock" aria-label={`Local time ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`}>
      <strong>{now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</strong>
      <span>{now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
    </div>
  );
}

export function XmbHome({ projects, writing }: { projects: XmbItem[]; writing: XmbItem[] }) {
  const categories = useMemo<Category[]>(() => [
    {
      id: 'about',
      label: 'About',
      href: '/about',
      summary: 'Product thinker, software maker and lifelong learner.',
    },
    {
      id: 'work',
      label: 'Work',
      href: '/work',
      summary: 'Case studies, released tools and experiments in motion.',
    },
    {
      id: 'projects',
      label: 'Projects',
      href: projects[0]?.href ?? '/work',
      summary: 'Things I have designed, built and learned from.',
      items: projects,
    },
    {
      id: 'writing',
      label: 'Writing',
      href: writing[0]?.href ?? '/writing',
      summary: 'Field notes about humane technology and learning by making.',
      items: writing,
    },
    {
      id: 'contact',
      label: 'Contact',
      href: 'mailto:Charlotte.Stone.Dev@Proton.Me',
      summary: 'Have an interesting problem? Let’s compare notes.',
    },
  ], [projects, writing]);

  const [categoryIndex, setCategoryIndex] = useState(2);
  const [itemIndexes, setItemIndexes] = useState<Record<string, number>>({ projects: 0, writing: 0 });
  const category = categories[categoryIndex];
  const itemIndex = itemIndexes[category.id] ?? 0;
  const selectedItem = category.items?.[itemIndex];
  const activeHref = selectedItem?.href ?? category.href;
  const activeTitle = selectedItem?.title ?? category.label;
  const activeSubtitle = selectedItem?.subtitle ?? category.summary;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditable(event.target) || event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        setCategoryIndex((current) => (current + direction + categories.length) % categories.length);
      }

      if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && category.items?.length) {
        event.preventDefault();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        setItemIndexes((current) => ({
          ...current,
          [category.id]: ((current[category.id] ?? 0) + direction + category.items!.length) % category.items!.length,
        }));
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        window.location.assign(activeHref.startsWith('/') ? withSiteBasePath(activeHref) : activeHref);
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        if (category.items?.length && itemIndex !== 0) {
          setItemIndexes((current) => ({ ...current, [category.id]: 0 }));
        } else {
          setCategoryIndex(2);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeHref, categories.length, category, itemIndex]);

  return (
    <div className="xmb-home">
      <WaveBackground />

      <header className="xmb-status">
        <SystemClock />
        <div
          className="xmb-status-ticker"
          aria-label="Current status: Currently working on fun, small projects to share."
        >
          <div className="xmb-status-ticker__track">
            <span>Currently working on fun, small projects to share.</span>
          </div>
        </div>
      </header>

      <section className="xmb-home__stage" aria-labelledby="xmb-title">
        <div className="xmb-identity">
          <p className="xmb-kicker">Welcome to my digital space</p>
          <h1 id="xmb-title">Charlotte Stone</h1>
          <p>Software engineer &amp; product maker</p>
        </div>

        <nav className="xmb-nav" aria-label="Portfolio sections">
          {categories.map((entry, index) => (
            <button
              className={`xmb-nav__item xmb-nav__item--${entry.id}${index === categoryIndex ? ' is-selected' : ''}`}
              type="button"
              aria-current={index === categoryIndex ? 'page' : undefined}
              aria-label={`${entry.label}${index === categoryIndex ? ', selected' : ''}`}
              onClick={() => setCategoryIndex(index)}
              key={entry.id}
            >
              <span className="xmb-nav__glass" aria-hidden="true"><i /><i /><i /><i /></span>
              <span className="xmb-nav__label">{entry.label}</span>
            </button>
          ))}
        </nav>

        <div className="xmb-selection" aria-live="polite">
          {category.items && category.items.length > 1 && (
            <div className="xmb-selection__list" aria-label={`${category.label} items`}>
              {category.items.map((item, index) => (
                <button
                  type="button"
                  className={index === itemIndex ? 'is-selected' : ''}
                  aria-current={index === itemIndex ? 'true' : undefined}
                  onClick={() => setItemIndexes((current) => ({ ...current, [category.id]: index }))}
                  key={item.href}
                >
                  <span aria-hidden="true" />
                  <span><strong>{item.title}</strong><small>{item.subtitle}</small></span>
                </button>
              ))}
            </div>
          )}

          <div className="xmb-selection__preview">
            {selectedItem?.icon && (
              // These local product icons are tiny decorative assets and do not benefit from image optimisation.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={withSiteBasePath(selectedItem.icon)} alt="" />
            )}
            <div>
              <span className="xmb-selection__count">{category.items ? `${itemIndex + 1} / ${category.items.length}` : category.label}</span>
              <h2>{activeTitle}</h2>
              <p>{activeSubtitle}</p>
              <SiteLink href={activeHref} className="xmb-open-link">
                {category.id === 'contact' ? 'Send an email' : selectedItem ? 'View project' : `Open ${category.label}`}
                <span aria-hidden="true">→</span>
              </SiteLink>
            </div>
          </div>
        </div>
      </section>

      <footer className="xmb-ambient">
        <p><span>Currently building</span><strong>Fun, small projects to share</strong></p>
        <p><span>Currently learning</span><strong>Godot · C / C++</strong></p>
        <div className="xmb-controls" aria-hidden="true">← → Category &nbsp; ↑ ↓ Item &nbsp; Enter Open &nbsp; Esc Back</div>
      </footer>
    </div>
  );
}
