import type { Metadata } from 'next';
import { SiteLink as Link } from '@/app/components/SiteLink';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Charlotte Stone: product person, software maker and lifelong learner based in Staffordshire, UK.',
};

const interests = [
  ['01', 'Human-centred products', 'Finding the real problem, making trade-offs visible and building with the people affected by the outcome.'],
  ['02', 'Learning & language', 'Tools that help people learn, communicate across cultures and stay connected to the thing they are curious about.'],
  ['03', 'Humane technology', 'Accessible, privacy-respecting software that makes complicated systems feel a little more manageable.'],
  ['04', 'Playful experiments', 'Games, spatial interfaces and side projects that turn unfamiliar disciplines into something I can learn by making.'],
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="page-intro page-intro--about">
        <p className="eyebrow">A product person who still likes to make things</p>
        <h1>About<br />Charlotte</h1>
        <p>
          I work between product thinking, user experience, communication and
          technical delivery—helping different people understand the same
          problem well enough to move it forward together.
        </p>
      </header>

      <section className="about-story">
        <div className="about-story__label">
          <span aria-hidden="true">CS</span>
          <p className="eyebrow">The short version</p>
        </div>
        <div className="about-story__copy">
          <p>
            I’m a Product Supervisor working in care-tech SaaS, with a
            background in full-stack development, software engineering,
            technical support, teaching and translation.
          </p>
          <p>
            My technical background helps me bridge the space between users,
            stakeholders, developers, QA, support, design and leadership. I’m
            especially interested in accessibility, education, emotional
            clarity, privacy and products that respect the people using them.
          </p>
          <p>
            Before moving into product, I spent three years teaching English in
            Yaita-shi, Japan. I also contribute English-to-Japanese translations
            to freeCodeCamp, helping make free technology education available
            to more people.
          </p>
        </div>
      </section>

      <section className="interest-section" aria-labelledby="interest-title">
        <header className="section-heading">
          <div>
            <p className="eyebrow">What pulls me in</p>
            <h2 id="interest-title">A few recurring themes</h2>
          </div>
        </header>
        <div className="interest-grid">
          {interests.map(([number, title, copy]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-details">
        <div>
          <p className="eyebrow">Languages</p>
          <p>English · Japanese · French · Spanish · Brazilian Portuguese</p>
          <small>Also learning German and Esperanto.</small>
        </div>
        <div>
          <p className="eyebrow">Based</p>
          <p>Staffordshire, UK</p>
          <small>Working across product, design and technology.</small>
        </div>
      </section>

      <section className="contact-panel">
        <p className="eyebrow">Have an interesting problem?</p>
        <h2>Let’s compare notes.</h2>
        <div>
          <a className="button button--dark" href="mailto:Charlotte.Stone.Dev@Proton.Me">Send me an email ↗</a>
          <Link className="text-link" href="/writing">Read the field notes →</Link>
        </div>
      </section>
    </div>
  );
}
