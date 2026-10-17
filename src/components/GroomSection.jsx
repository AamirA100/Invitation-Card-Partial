import { weddingData } from '../data/weddingData'
import './GroomSection.css'

export default function GroomSection() {
  const { groom } = weddingData

  return (
    <section className="invitation-section groom-section" id="groom-section">
      <div className="wedding-card groom-card">
        {/* Ornate Top Blue Floral Garland */}
        <div className="card-floral-header" aria-hidden="true">
          <svg viewBox="0 0 200 45" className="floral-header-svg">
            <path d="M 10 25 Q 60 5 100 25 Q 140 5 190 25" stroke="#93c5fd" strokeWidth="1.2" fill="none" />
            <circle cx="100" cy="25" r="7" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
            <circle cx="100" cy="25" r="3" fill="#1e40af" />
            <circle cx="50" cy="18" r="5" fill="#eff6ff" stroke="#93c5fd" strokeWidth="0.8" />
            <circle cx="150" cy="18" r="5" fill="#eff6ff" stroke="#93c5fd" strokeWidth="0.8" />
            <path d="M 40 18 Q 30 10 25 20" stroke="#7ba185" strokeWidth="1" fill="none" />
            <path d="M 160 18 Q 170 10 175 20" stroke="#7ba185" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Section Heading */}
        <div className="section-label-container">
          <span className="label-diamond">✦</span>
          <h2 className="section-label">THE GROOM</h2>
          <span className="label-diamond">✦</span>
        </div>

        {/* Groom Main Name */}
        <h3 className="person-name groom-display-name">{groom.name}</h3>

        {/* Qualification */}
        <div className="person-qualification">
          <span className="qualification-badge">{groom.qualification}</span>
          <p className="person-education">{groom.education}</p>
          <p className="person-designation">{groom.profession}</p>
        </div>

        <div className="parent-relation-divider">
          <span className="divider-line" />
          <span className="relation-text">SON OF</span>
          <span className="divider-line" />
        </div>

        {/* Parents Details */}
        <div className="parents-block">
          <h4 className="parents-name">{groom.parents}</h4>
        </div>

        {/* Decorative Bottom Corner Blossoms */}
        <div className="card-corner corner-bl" aria-hidden="true">
          <CornerOrnament />
        </div>
        <div className="card-corner corner-br" aria-hidden="true">
          <CornerOrnament mirrored />
        </div>
      </div>
    </section>
  )
}

function CornerOrnament({ mirrored = false }) {
  return (
    <svg
      viewBox="0 0 45 45"
      fill="none"
      className={`corner-ornament-svg ${mirrored ? 'is-mirrored' : ''}`}
    >
      <path d="M 5 40 Q 5 15 35 15" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 5 40 Q 5 28 20 28" stroke="#93c5fd" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="35" cy="15" r="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8" />
      <circle cx="20" cy="28" r="3" fill="#eff6ff" stroke="#3b82f6" strokeWidth="0.8" />
    </svg>
  )
}