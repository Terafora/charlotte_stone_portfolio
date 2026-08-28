import { SiteLink as Link } from './components/SiteLink';

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="eyebrow">404 · Drifted off course</p>
      <h1>This page isn’t here.</h1>
      <p>The link may be old, or the idea may have moved somewhere new.</p>
      <Link className="button button--dark" href="/">Back to the homepage →</Link>
    </div>
  );
}
