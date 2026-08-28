'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SiteLink as Link, withoutSiteBasePath } from './SiteLink';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
];

const tickerCopy = {
  home: 'Welcome to the portfolio',
  work: 'Selected work',
  writing: 'Field notes',
  about: 'About Charlotte Stone',
};

function getSection(pathname: string): keyof typeof tickerCopy {
  if (pathname.startsWith('/work')) return 'work';
  if (pathname.startsWith('/writing')) return 'writing';
  if (pathname.startsWith('/about')) return 'about';
  return 'home';
}

function getPageLabel(pathname: string) {
  if (pathname === '/') return 'Home';
  const segment = pathname.split('/').filter(Boolean).at(-1) ?? 'Home';
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getTickerMessage(pathname: string) {
  const section = getSection(pathname);

  if (pathname === '/' || pathname === `/${section}`) {
    return tickerCopy[section];
  }

  const pageLabel = getPageLabel(pathname);

  if (section === 'work') {
    return `Case study: ${pageLabel}`;
  }

  if (section === 'writing') {
    return `Field note: ${pageLabel}`;
  }

  return `Now viewing: ${pageLabel}`;
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = withoutSiteBasePath(usePathname());
  const section = getSection(pathname);
  const tickerMessage = getTickerMessage(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`site-shell site-shell--${section}`}>
      <header className="site-nav">
        <Link className="site-nav__brand" href="/" aria-label="Charlotte Stone, home" onClick={() => setMenuOpen(false)}>
          <span>
            <span className="site-nav__name">Charlotte Stone</span>
            <span className="site-nav__strapline">Product · UX · Software</span>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="menu-toggle__icon" aria-hidden="true"><i /><i /><i /></span>
        </button>

        <nav id="primary-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Primary navigation">
          <ul>
            {navItems.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link className={active ? 'is-active' : ''} href={item.href} aria-current={active ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="site-nav__footer">
          <a href="https://github.com/Terafora" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/charlotte-stone-web/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="mailto:Charlotte.Stone.Dev@Proton.Me">Email ↗</a>
          <p>Staffordshire, UK</p>
        </div>

        <div className="nav-teeth" aria-hidden="true">
          <div className="nav-teeth__track nav-teeth__track--shadow">
            {Array.from({ length: 64 }, (_, index) => <i key={index} />)}
          </div>
          <div className="nav-teeth__track nav-teeth__track--face">
            {Array.from({ length: 64 }, (_, index) => <i key={index} />)}
          </div>
        </div>
      </header>

      <main className="site-main">{children}</main>

      <div className="ticker" aria-label={tickerMessage} aria-live="polite">
        <div className="ticker__window">
          <div className="ticker__track" key={pathname}>
            <span>{tickerMessage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
