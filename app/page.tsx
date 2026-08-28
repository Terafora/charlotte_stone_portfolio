import { getFeaturedContent } from '@/lib/content';
import { ContentIcon } from './components/ContentIcon';
import { SiteLink as Link } from './components/SiteLink';

export default function Home() {
  const featured = getFeaturedContent().slice(0, 3);

  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__dot hero__dot--pink" aria-hidden="true" />
        <div className="hero__dot hero__dot--blue" aria-hidden="true" />
        <div className="hero__dot hero__dot--yellow" aria-hidden="true" />
        <div className="hero__copy">
          <p className="eyebrow">Product · UX · Software · Learning · Play</p>
          <h1 id="hero-title">
            <span>Charlotte</span>
            <span>Stone</span>
          </h1>
          <p className="hero__intro">
            Product person and software maker turning complicated systems into
            useful, understandable and occasionally playful experiences.
          </p>
          <div className="hero__actions">
            <Link className="button button--dark" href="/work">
              See selected work <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/about">
              More about me <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

      </section>

      <section className="selected-work" aria-labelledby="selected-title">
        <header className="section-heading">
          <div>
            <p className="eyebrow">A few things I’ve made</p>
            <h2 id="selected-title">Selected work & notes</h2>
          </div>
          <Link className="text-link" href="/work">
            View everything <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className="feature-grid">
          {featured.map((item, index) => (
            <article className={`feature-card feature-card--${item.accent}`} key={item.title}>
              <Link href={`/${item.kind}/${item.slug}`} aria-label={`Read ${item.title}`}>
                <div className="feature-card__topline">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{item.status ?? item.readTime}</span>
                </div>
                <ContentIcon
                  className="feature-card__icon"
                  fallback={item.title.slice(0, 1)}
                  item={item}
                />
                <div className="feature-card__body">
                  <p className="eyebrow">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
                <div className="feature-card__cta">
                  <span>{item.kind === 'work' ? 'Open case study' : 'Read the note'}</span>
                  <b aria-hidden="true">→</b>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-note">
        <p className="eyebrow">Currently</p>
        <p>
          Building privacy-respecting tools, learning game development in
          Godot, and looking for the useful idea hiding inside the messy one.
        </p>
      </section>
    </div>
  );
}
