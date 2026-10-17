export default function BrideGroomDivider() {
  return (
    <div className="bride-groom-divider" aria-hidden="true">
      <div className="divider-flourish left">
        <svg viewBox="0 0 100 24" fill="none" className="flourish-svg">
          <path d="M 0 12 Q 50 12 70 20 Q 90 28 100 12" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="70" cy="20" r="2.5" fill="#2563eb" />
          <circle cx="40" cy="12" r="2" fill="#60a5fa" />
        </svg>
      </div>

      <div className="divider-amp-circle">
        <span className="ampersand-char">&amp;</span>
      </div>

      <div className="divider-flourish right">
        <svg viewBox="0 0 100 24" fill="none" className="flourish-svg flourish-reversed">
          <path d="M 0 12 Q 50 12 70 20 Q 90 28 100 12" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="70" cy="20" r="2.5" fill="#2563eb" />
          <circle cx="40" cy="12" r="2" fill="#60a5fa" />
        </svg>
      </div>
    </div>
  )
}
