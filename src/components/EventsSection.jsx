import { weddingData } from '../data/weddingData'
import './EventsSection.css'

export default function EventsSection() {
  const { events } = weddingData
  const { walima } = events

  return (
    <section className="invitation-section events-section" id="events-section">
      {/* Program Details Header */}
      <div className="events-main-header">
        <p className="events-eyebrow">
          <span className="eyebrow-line" />
          <span>PROGRAM DETAILS</span>
          <span className="eyebrow-line" />
        </p>
        <h2 className="events-title">Event &amp; Venue</h2>
        <div className="events-divider" aria-hidden="true">
          <span className="divider-flourish-char">❧</span>
          <span className="divider-dot" />
          <span className="divider-flourish-char">❦</span>
        </div>
      </div>

      <div className="event-cards-container">
        {/* Walima Ceremony */}
        <div className="wedding-card event-card event-walima">
          <div className="event-badge">
            <span className="badge-star">✦</span>
            <h3 className="event-heading">WALIMA CEREMONY</h3>
            <span className="badge-star">✦</span>
          </div>

          {/* Gazebo Reception Illustration from reference */}
          <div className="event-illustration gazebo-illustration-wrap" aria-hidden="true">
            <img
              src="/images/male-D8bPYhaI.png"
              alt="Reception Gazebo"
              className="venue-image"
            />
          </div>

          <div className="event-info-list">
            <div className="event-info-item">
              <span className="info-icon" aria-hidden="true">
                <CalendarIcon />
              </span>
              <div className="info-text-group">
                <span className="info-label">DATE</span>
                <span className="info-val">{walima.date}</span>
              </div>
            </div>

            <div className="event-info-item">
              <span className="info-icon" aria-hidden="true">
                <ClockIcon />
              </span>
              <div className="info-text-group">
                <span className="info-label">TIME</span>
                <span className="info-val time-val">{walima.time}</span>
              </div>
            </div>

            <div className="event-info-item">
              <span className="info-icon" aria-hidden="true">
                <PinIcon />
              </span>
              <div className="info-text-group">
                <span className="info-label">VENUE</span>
                <span className="info-val venue-val">{walima.venue}</span>
                <span className="info-subval">{walima.address}</span>
              </div>
            </div>
          </div>

          <a
            href={walima.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="map-btn"
            id="map-btn-walima"
            aria-label="View Walima location on Google Maps"
          >
            <LocationPinMiniIcon />
            <span>View Location on Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="svg-icon">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="svg-icon">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="svg-icon">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function LocationPinMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="mini-pin-svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )
}