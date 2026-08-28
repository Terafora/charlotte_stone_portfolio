export function WaveBackground({ quiet = false }: { quiet?: boolean }) {
  return (
    <div className={`wave-scene${quiet ? ' wave-scene--quiet' : ''}`} aria-hidden="true">
      <div className="wave-scene__glow" />
      <div className="wave-scene__stars" />
      <div className="wave-scene__orb wave-scene__orb--one" />
      <div className="wave-scene__orb wave-scene__orb--two" />
      <div className="wave-ribbon wave-ribbon--one" />
      <div className="wave-ribbon wave-ribbon--two" />
      <div className="wave-ribbon wave-ribbon--three" />
      <div className="wave-ribbon wave-ribbon--four" />
    </div>
  );
}
