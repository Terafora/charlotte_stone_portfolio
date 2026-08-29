'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SiteLink as Link, withoutSiteBasePath } from './SiteLink';
import { WaveBackground } from './WaveBackground';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
  { href: 'mailto:Charlotte.Stone.Dev@Proton.Me', label: 'Contact' },
];

function getSection(pathname: string): 'home' | 'work' | 'writing' | 'about' {
  if (pathname.startsWith('/work')) return 'work';
  if (pathname.startsWith('/writing')) return 'writing';
  if (pathname.startsWith('/about')) return 'about';
  return 'home';
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = withoutSiteBasePath(usePathname());
  const section = getSection(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === '/') {
    return <main className="xmb-root">{children}</main>;
  }

  return (
    <div className={`site-shell xmb-interior xmb-interior--${section}`}>
      <WaveBackground quiet />
      <header className="site-nav interior-nav">
        <Link className="site-nav__brand" href="/" aria-label="Charlotte Stone, home" onClick={() => setMenuOpen(false)}>
          <span>
            <span className="site-nav__name">Charlotte Stone</span>
            <span className="site-nav__strapline">Software engineer &amp; product maker</span>
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
              const active = item.href === '/' ? pathname === '/' : item.href.startsWith('/') && pathname.startsWith(item.href);
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

        <div className="interior-nav__links">
          <a href="https://github.com/Terafora" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/charlotte-stone-web/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </header>

      <main className="site-main">{children}</main>
    </div>
  );
}
