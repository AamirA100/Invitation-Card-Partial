import { useEffect, useRef, useState } from 'react'
import { weddingData } from '../data/weddingData'
import './ThankYouEnvelope.css'

export default function ThankYouEnvelope() {
  const { thankYou } = weddingData
  const [isRevealed, setIsRevealed] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="invitation-section thankyou-section" id="thank-you-section">
      <div className="thankyou-container">
        {/* Main Swans Floral Wreath Frame from Reference */}
        <div
          ref={wrapperRef}
          className={`thankyou-card-wrapper ${isRevealed ? 'zoom-out-active' : ''}`}
        >
          <img
            src="/images/tq-BPJkzWWI.png"
            alt="Floral Swan Thank You Frame"
            className={`thankyou-img ${isRevealed ? 'is-zoomed-out' : ''}`}
          />

          {/* Centered Typography Inside Wreath */}
          <div className="thankyou-card-text">
            <h2 className="ty-main">{thankYou.title}</h2>
            <p className="ty-sub">For your <br /> blessings & love</p>
            {/* <p className="ty-sub">{thankYou.message}</p> */}
            <p className="ty-names">
            <br />
              {weddingData.groom.name.split(' ')[0]} &amp; {weddingData.bride.name.split(' ')[0]}
            </p>
          </div>
        </div>

        {/* Dedicated Modern Wedding Footer matching User Reference */}
        <footer className="wedding-footer">
          <div className="footer-pill-card">
            {/* Instagram Profile Row */}
            <a
              href="https://www.instagram.com/mazhar.x64?stkn=MTV1dWQ0c3Voc2M3dA=="
              target="_blank"
              rel="noopener noreferrer"
              className="footer-insta-link"
              aria-label="Instagram Profile: @mazhar.x64"
            >
              <InstagramCameraIcon />
              <span className="footer-insta-handle">@mazhar.x64</span>
            </a>

            {/* Built With Attribution */}
            <p className="footer-built-with">
              <span>BUILT WITH</span>
              <span className="footer-red-heart" aria-hidden="true">❤️</span>
              <span>BY MAZHAR ANSARI</span>
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}

function InstagramCameraIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="footer-insta-svg"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}
