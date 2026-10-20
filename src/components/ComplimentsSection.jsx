import { weddingData } from '../data/weddingData'
import './ComplimentsSection.css'

export default function ComplimentsSection() {
  const { compliments } = weddingData

  return (
    <section className="invitation-section compliments-section" id="compliments-section">
      <div className="wedding-card compliments-card">
        {/* Top Ornament */}
        <div className="comp-ornament" aria-hidden="true">
          ✦ ✦ ✦
        </div>

        {/* Heading */}
        <div className="compliments-header">
          <span className="comp-line" />
          <h2 className="comp-label">{compliments.heading}</h2>
          <span className="comp-line" />
        </div>

        {/* Family & Relative Names List */}
        <div className="comp-family-list">
          {compliments.members.map((member, index) => (
            <div key={index} className="comp-member">
              <h2 className="comp-name">{member.name}</h2>
              {member.detail && <p className="comp-role">{member.detail}</p>}
              {index < compliments.members.length - 1 && <div className="comp-divider" />}
            </div>
          ))}
        </div>

        {/* Near & Dear Tagline */}
        <div className="near-dear-banner">
          <p className="comp-stars">✦ ✦ ✦</p>
          <span className="near-dear-text">{compliments.nearAndDear}</span>
        </div>
      </div>
    </section>
  )
}
